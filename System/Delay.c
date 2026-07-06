#include "stm32f10x.h"
#include "FreeRTOS.h"
#include "task.h"

/**
  * @brief  微秒级延�?
  * @param  xus 延时时长，范围：0~233015
  * @retval �?
  */
void Delay_us(uint32_t xus)
{
	volatile uint32_t count;

	while (xus--)
	{
		count = 8;
		while (count--)
		{
			__NOP();
		}
	}
}

/**
  * @brief  毫秒级延�?
  * @param  xms 延时时长，范围：0~4294967295
  * @retval �?
  */
void Delay_ms(uint32_t xms)
{
	if (xTaskGetSchedulerState() != taskSCHEDULER_NOT_STARTED)
	{
		if (xms == 0)
		{
			return;
		}
		vTaskDelay(xms / portTICK_RATE_MS);
		return;
	}

	while(xms--)
	{
		Delay_us(1000);
	}
}
 
/**
  * @brief  秒级延时
  * @param  xs 延时时长，范围：0~4294967295
  * @retval �?
  */
void Delay_s(uint32_t xs)
{
	while(xs--)
	{
		Delay_ms(1000);
	}
} 
