#include "dac_driver.h"

#include <string.h>

/*
 * Conservative DMA 128-channel AD5328 frame generator.
 *
 * TIM2 update event -> DMA1 Channel2 -> GPIOA->ODR.
 *
 * TIM2 runs at 200 kHz, so each DMA sample is 5 us.
 * Each channel uses 36 samples:
 *    2 samples: chip-select setup time before the first SCLK edge.
 *   32 samples: 16 serial bits, two samples per SCLK cycle.
 *    2 samples: SYNC# release/restore interval through Bit2.
 *
 * 128 channels * 36 samples = 4608 samples.
 * 4608 * 5 us = 23.04 ms per complete 128-channel frame.
 * Frame rate is about 43.4 Hz.
 *
 * GPIOA mapping:
 *   PA0 MOSI
 *   PA1 SCLK
 *   PA2 Bit1
 *   PA3 Bit2
 *   PA4 Bit3
 *   PA5 Bit4
 *   PA6 LDAC#  (kept low)
 *   PA7 FRAME_MARK pulse at the start of each repeated 128-channel frame
 */

#define DAC_DEFAULT_VALUE             3000U
#define DAC_BITS_PER_CHANNEL          16U
#define DAC_SAMPLES_PER_BIT           2U
#define DAC_CHIP_SETUP_SAMPLES        2U
#define DAC_SYNC_GAP_SAMPLES          2U
#define DAC_SAMPLES_PER_CHANNEL       (DAC_CHIP_SETUP_SAMPLES + \
                                       (DAC_BITS_PER_CHANNEL * DAC_SAMPLES_PER_BIT) + \
                                       DAC_SYNC_GAP_SAMPLES)
#define DAC_FAST_FRAME_SAMPLES        (DAC_CHANNEL_COUNT * DAC_SAMPLES_PER_CHANNEL)
#define DAC_FRAME_MARK_SAMPLES        16U

#define PIN_TO_ODR(pin)               ((uint16_t)(pin))

static uint16_t dac_data[DAC_CHANNEL_COUNT];
static uint16_t dma_wave_table[DAC_FAST_FRAME_SAMPLES];

static uint16_t DAC_MakeOdrState(uint16_t channel_index,
                                 uint8_t sclk_high,
                                 uint8_t mosi_high,
                                 uint8_t release_sync,
                                 uint8_t frame_mark_high)
{
  uint16_t state = 0U;
  uint16_t chip_index = (uint16_t)(channel_index >> 3);

  if (mosi_high)
  {
    state |= PIN_TO_ODR(DIN_Pin);
  }

  if (sclk_high)
  {
    state |= PIN_TO_ODR(SCLK_Pin);
  }

  /*
   * The AD board decodes Bit1/Bit2 first, then Bit3/Bit4.
   * Sequential SYNC1..SYNC16 mapping:
   *   Bit3 = chip bit 0
   *   Bit4 = chip bit 1
   *   Bit1 = chip bit 2
   *   Bit2 = chip bit 3
   */
  if (chip_index & 0x04U)
  {
    state |= PIN_TO_ODR(P1_Pin);
  }

  if (((chip_index & 0x08U) != 0U) ^ (release_sync != 0U))
  {
    state |= PIN_TO_ODR(P2_Pin);
  }

  if (chip_index & 0x01U)
  {
    state |= PIN_TO_ODR(P3_Pin);
  }

  if (chip_index & 0x02U)
  {
    state |= PIN_TO_ODR(P4_Pin);
  }

  /* LDAC# intentionally remains low, matching the NI capture. */

  if (frame_mark_high)
  {
    state |= PIN_TO_ODR(FRAME_SYNC_Pin);
  }

  return state;
}

static uint16_t DAC_MakeFrameWord(uint16_t channel_index)
{
  uint16_t channel_in_chip = (uint16_t)(channel_index & 0x07U);
  uint16_t value = (uint16_t)(dac_data[channel_index] & 0x0FFFU);

  return (uint16_t)((channel_in_chip << 12) | value);
}

static void DAC_BuildFastFrameWave(void)
{
  uint16_t channel;
  uint32_t pos = 0U;

  for (channel = 0U; channel < DAC_CHANNEL_COUNT; channel++)
  {
    uint16_t word = DAC_MakeFrameWord(channel);
    uint8_t bit;
    uint8_t setup;
    uint8_t gap;

    for (setup = 0U; setup < DAC_CHIP_SETUP_SAMPLES; setup++)
    {
      dma_wave_table[pos++] = DAC_MakeOdrState(channel, 0U, 0U, 0U,
                                               (pos < DAC_FRAME_MARK_SAMPLES) ? 1U : 0U);
    }

    for (bit = 0U; bit < DAC_BITS_PER_CHANNEL; bit++)
    {
      uint16_t mask = (uint16_t)(1U << (15U - bit));
      uint8_t mosi_high = (word & mask) ? 1U : 0U;
      uint8_t frame_mark_high = (pos < DAC_FRAME_MARK_SAMPLES) ? 1U : 0U;

      /* MOSI is stable while SCLK is high, then AD5328 samples on falling edge. */
      dma_wave_table[pos++] = DAC_MakeOdrState(channel, 1U, mosi_high, 0U,
                                               frame_mark_high);
      frame_mark_high = (pos < DAC_FRAME_MARK_SAMPLES) ? 1U : 0U;
      dma_wave_table[pos++] = DAC_MakeOdrState(channel, 0U, mosi_high, 0U,
                                               frame_mark_high);
    }

    for (gap = 0U; gap < DAC_SYNC_GAP_SAMPLES; gap++)
    {
      dma_wave_table[pos++] = DAC_MakeOdrState(channel, 0U, 0U, 1U,
                                               (pos < DAC_FRAME_MARK_SAMPLES) ? 1U : 0U);
    }
  }
}

static void DAC_StartTim2DmaPlayback(void)
{
  __HAL_RCC_DMA1_CLK_ENABLE();

  TIM2->CR1 &= ~TIM_CR1_CEN;
  TIM2->DIER &= ~TIM_DIER_UIE;
  TIM2->DIER |= TIM_DIER_UDE;
  TIM2->CNT = 0U;

  DMA1_Channel2->CCR &= ~DMA_CCR_EN;
  DMA1->IFCR = DMA_IFCR_CGIF2 | DMA_IFCR_CTCIF2 | DMA_IFCR_CHTIF2 | DMA_IFCR_CTEIF2;
  DMA1_Channel2->CPAR = (uint32_t)&GPIOA->ODR;
  DMA1_Channel2->CMAR = (uint32_t)dma_wave_table;
  DMA1_Channel2->CNDTR = DAC_FAST_FRAME_SAMPLES;
  DMA1_Channel2->CCR = DMA_CCR_DIR     |
                       DMA_CCR_MINC    |
                       DMA_CCR_CIRC    |
                       DMA_CCR_PSIZE_0 |
                       DMA_CCR_MSIZE_0 |
                       DMA_CCR_PL_1;

  DMA1_Channel2->CCR |= DMA_CCR_EN;
  TIM2->CR1 |= TIM_CR1_CEN;
}

void DAC_Init(void)
{
  uint16_t i;

  for (i = 0U; i < DAC_CHANNEL_COUNT; i++)
  {
    dac_data[i] = DAC_DEFAULT_VALUE;
  }

  GPIOA->ODR = PIN_TO_ODR(P1_Pin);
  DAC_BuildFastFrameWave();
  DAC_StartTim2DmaPlayback();
}

void DAC_Tick(void)
{
  /* The fast path is driven by TIM2 DMA, not by the TIM2 ISR. */
}

void DAC_SetData(const uint16_t *src, uint16_t len)
{
  uint16_t count;

  if (src == NULL)
  {
    return;
  }

  count = (len > DAC_CHANNEL_COUNT) ? DAC_CHANNEL_COUNT : len;
  memcpy(dac_data, src, count * sizeof(uint16_t));

  if (count < DAC_CHANNEL_COUNT)
  {
    memset(&dac_data[count], 0, (DAC_CHANNEL_COUNT - count) * sizeof(uint16_t));
  }

  TIM2->CR1 &= ~TIM_CR1_CEN;
  DMA1_Channel2->CCR &= ~DMA_CCR_EN;
  DAC_BuildFastFrameWave();
  TIM2->CNT = 0U;
  DMA1_Channel2->CNDTR = DAC_FAST_FRAME_SAMPLES;
  DMA1_Channel2->CCR |= DMA_CCR_EN;
  TIM2->CR1 |= TIM_CR1_CEN;
}

uint16_t *DAC_GetBuffer(void)
{
  return dac_data;
}
