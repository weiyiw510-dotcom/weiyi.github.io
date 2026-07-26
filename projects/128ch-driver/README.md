# 128-Channel High-Speed Precision Control Module

This portfolio snapshot contains the selected embedded-driver source used to
validate the timing architecture of a 128-channel DAC control system.

## System direction

- Stage 1: one 128-channel module with a 1 kHz-class update-rate target.
- Stage 2: synchronized multi-module expansion to 1000+ channels.
- Hardware revision: STM32F407, 16 × AD5328, 4 × SN74AHCT244, four-layer PCB.

## Current verification status

The included STM32F103 timing prototype uses TIM2-triggered DMA playback to
write a precomputed waveform directly to GPIO ODR. It verifies:

- 16-bit AD5328 frame generation
- 128-channel addressing
- SCLK/MOSI/chip-select timing
- logic-analyzer framing through a dedicated FRAME_SYNC signal

The conservative prototype currently produces a complete 128-channel frame at
approximately 43.4 Hz. The STM32F407 hardware and firmware revision is the
performance path toward the 1 kHz-class target.

## Selected source

- [`code/dac_driver.c`](code/dac_driver.c)
- [`code/dac_driver.h`](code/dac_driver.h)

The full development workspace also contains generated HAL/CMSIS dependencies,
Keil build artifacts, hardware design files, and experimental data; only the
core driver is published here for focused portfolio review.
