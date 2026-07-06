#ifndef __APP_TASKS_H
#define __APP_TASKS_H

#include "FreeRTOS.h"
#include "queue.h"
#include "semphr.h"

extern xQueueHandle App_KeyQueue;
extern xSemaphoreHandle App_BatteryMutex;

void AppTasks_Create(void);

#endif
