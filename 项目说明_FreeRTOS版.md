# STM32 可编程多功能手表 FreeRTOS 版项目说明

## 项目概述

本项目基于 STM32F103C8T6 实现一套可编程多功能手表系统，在原有裸机 UI、按键、RTC、电池采样、OLED 显示、小游戏等功能基础上，完成 FreeRTOS 移植与任务化改造。

项目目标不是简单把 FreeRTOS 文件加入工程，而是把原来集中在 `while(1)` 和定时器中断中的逻辑拆分为多个任务，并通过队列和互斥信号量完成任务间通信与资源同步，使工程更接近真实嵌入式软件开发中的多任务结构。

## 硬件与软件环境

- 主控芯片：STM32F103C8T6
- 开发环境：Keil MDK，ARMCC5 工具链
- 外设资源：GPIO、软件 I2C OLED、RTC、ADC、电池检测、按键、LED、MPU6050
- 实时系统：FreeRTOS，Cortex-M3 移植层
- 外设库：STM32F10x 标准外设库

## 已实现功能

- OLED 手表首页显示：日期、时间、电池电量、菜单入口、设置入口
- 按键输入：上一项、下一项、确认、长按关机控制
- RTC 时间读取与时间设置
- ADC 电池电压采样与电量百分比显示
- 菜单页面与功能入口管理
- 秒表、姿态检测、小游戏等原工程功能保留
- FreeRTOS 多任务调度
- 按键事件队列通信
- 电池数据互斥保护
- SysTick 由 FreeRTOS 接管，避免与原延时函数冲突

## FreeRTOS 任务划分

| 任务名 | 优先级 | 栈大小 | 职责 |
| --- | ---: | ---: | --- |
| `ui` | 2 | 512 | 运行首页、菜单、设置页面等 UI 逻辑，并负责 OLED 刷新 |
| `tick1ms` | 3 | 128 | 周期执行按键扫描、长按计时、秒表计时、小游戏节拍等原 1 ms 软件节拍逻辑 |
| `battery` | 1 | 128 | 周期读取 ADC，计算电池电压和电量百分比 |

## 任务通信与同步

| 对象 | 类型 | 生产者 | 消费者 | 作用 |
| --- | --- | --- | --- | --- |
| `App_KeyQueue` | FreeRTOS 队列 | `Key_Tick()` | `Key_GetNum()` / UI 任务 | 将按键释放事件从扫描任务传递给 UI 逻辑 |
| `App_BatteryMutex` | 互斥信号量 | 电池任务、UI 任务 | 电池任务、UI 任务 | 保护 `ADValue`、`VBAT`、`Battery_Capacity` 等共享数据 |

## 关键改造点

1. `main.c` 不再执行裸机死循环，而是完成外设初始化后创建任务并启动调度器。
2. 原 `TIM2_IRQHandler` 中的软件节拍逻辑迁移到 `App_1msTickTask()`。
3. `Key.c` 中按键事件由全局变量传递改为 FreeRTOS 队列传递。
4. `menu.c` 中电池采样从 UI 显示流程中拆出，由独立电池任务周期更新。
5. `menu.c` 中电池共享变量使用互斥信号量保护。
6. `Delay.c` 不再直接配置 SysTick，避免破坏 FreeRTOS 系统节拍。
7. `stm32f10x_it.c` 中空的 `SVC_Handler`、`PendSV_Handler`、`SysTick_Handler` 在 FreeRTOS 模式下屏蔽，由 FreeRTOS 移植层接管。

## 工程打开方式

使用 Keil 打开以下工程文件：

```text
完整代码_FreeRTOS版\Project.uvprojx
```

打开后应能看到以下新增分组：

- `App`：应用任务创建与调度入口
- `FreeRTOS`：内核源码、Cortex-M3 移植层、堆管理文件、配置文件

## 主要文件说明

| 文件 | 说明 |
| --- | --- |
| `User\main.c` | 系统入口，初始化外设、创建任务、启动 FreeRTOS |
| `User\FreeRTOSConfig.h` | FreeRTOS 配置文件 |
| `App\app_tasks.c` | UI、1 ms 节拍、电池采样任务的实现 |
| `App\app_tasks.h` | 任务创建接口、队列和互斥量声明 |
| `Hardware\Key.c` | 按键扫描与按键事件队列发送 |
| `Hardware\menu.c` | UI 显示、电池数据更新与互斥保护 |
| `System\Delay.c` | 兼容 FreeRTOS 的延时函数 |
| `User\stm32f10x_it.c` | 中断入口适配，避免与 FreeRTOS Handler 冲突 |

## 可展示亮点

- 将裸机工程改造成 FreeRTOS 多任务工程，体现嵌入式系统任务拆分能力。
- 使用队列解决按键扫描任务与 UI 任务之间的事件传递问题。
- 使用互斥信号量保护电池采样共享数据，体现资源同步意识。
- 处理 FreeRTOS SysTick 与传统延时函数、中断文件之间的冲突。
- 保留原有手表应用功能，改造范围集中且可解释。
