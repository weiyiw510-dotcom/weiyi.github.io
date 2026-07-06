#include "stm32f10x.h"
#include "FreeRTOS.h"
#include "task.h"
#include "queue.h"
#include "semphr.h"
#include "OLED.h"
#include "menu.h"
#include "Key.h"
#include "dino.h"
#include "app_tasks.h"

#define UI_TASK_STACK_SIZE       512
#define TICK_TASK_STACK_SIZE     128
#define BAT_TASK_STACK_SIZE      128
#define KEY_QUEUE_LENGTH         8

#define UI_TASK_PRIORITY         ( tskIDLE_PRIORITY + 2 )
#define TICK_TASK_PRIORITY       ( tskIDLE_PRIORITY + 3 )
#define BAT_TASK_PRIORITY        ( tskIDLE_PRIORITY + 1 )

static void App_UITask(void *param);
static void App_1msTickTask(void *param);
static void App_BatteryTask(void *param);

xQueueHandle App_KeyQueue = 0;
xSemaphoreHandle App_BatteryMutex = 0;

void AppTasks_Create(void)
{
	App_KeyQueue = xQueueCreate(KEY_QUEUE_LENGTH, sizeof(uint8_t));
	App_BatteryMutex = xSemaphoreCreateMutex();

	xTaskCreate(App_UITask, (const signed char *)"ui", UI_TASK_STACK_SIZE, 0, UI_TASK_PRIORITY, 0);
	xTaskCreate(App_1msTickTask, (const signed char *)"tick1ms", TICK_TASK_STACK_SIZE, 0, TICK_TASK_PRIORITY, 0);
	xTaskCreate(App_BatteryTask, (const signed char *)"battery", BAT_TASK_STACK_SIZE, 0, BAT_TASK_PRIORITY, 0);
}

static void App_UITask(void *param)
{
	int page_result;
	uint8_t first_entry = 1;

	(void)param;

	for (;;)
	{
		page_result = First_Page_Clock();
		if (first_entry)
		{
			page_result = 0;
			first_entry = 0;
		}

		if (page_result == 1)
		{
			Menu();
		}
		else if (page_result == 2)
		{
			SettingPage();
		}

		vTaskDelay(5 / portTICK_RATE_MS);
	}
}

static void App_1msTickTask(void *param)
{
	portTickType last_wake_time;

	(void)param;
	last_wake_time = xTaskGetTickCount();

	for (;;)
	{
		Key3_Tick();
		Key_Tick();
		StopWatch_Tick();
		Dino_Tick();
		vTaskDelayUntil(&last_wake_time, 1);
	}
}

static void App_BatteryTask(void *param)
{
	(void)param;

	for (;;)
	{
		Battery_Update();
		vTaskDelay(1000 / portTICK_RATE_MS);
	}
}

void vApplicationMallocFailedHook(void)
{
	taskDISABLE_INTERRUPTS();
	for (;;)
	{
	}
}

void vApplicationStackOverflowHook(xTaskHandle *task, signed char *name)
{
	(void)task;
	(void)name;
	taskDISABLE_INTERRUPTS();
	for (;;)
	{
	}
}
