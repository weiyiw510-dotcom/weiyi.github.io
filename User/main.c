#include "stm32f10x.h"                  // Device header
#include "OLED.h"
#include "menu.h"
#include "FreeRTOS.h"
#include "task.h"
#include "app_tasks.h"

/**
  * 坐标轴定义：
  * 左上角为(0, 0)点
  * 横向向右为X轴，取值范围：0~127
  * 纵向向下为Y轴，取值范围：0~63
  */
int main(void)
{
	NVIC_PriorityGroupConfig(NVIC_PriorityGroup_4);

	OLED_Init();
	OLED_Clear();
	Peripheral_Init();
	Battery_Update();

	AppTasks_Create();
	vTaskStartScheduler();

	while (1)
	{
	}
}