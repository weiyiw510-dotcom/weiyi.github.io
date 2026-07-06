# STM32 可编程多功能手表 FreeRTOS 版

## 项目简介

本项目基于 STM32F103C8T6 实现一套可编程多功能手表系统，功能包括 OLED 时间显示、菜单交互、按键输入、RTC 时间管理、电池电量检测、秒表和小游戏等。

项目在原有裸机工程基础上完成 FreeRTOS 移植，将 UI 显示、按键扫描、周期节拍和电池采样等逻辑拆分为独立任务，并通过队列和互斥信号量实现任务间通信与共享数据保护。

## 技术栈

- 主控芯片：STM32F103C8T6
- 开发环境：Keil MDK
- 编译工具链：ARMCC5
- 外设库：STM32F10x 标准外设库
- 实时系统：FreeRTOS
- 主要外设：GPIO、ADC、RTC、OLED、按键、LED、MPU6050

## 已实现功能

- OLED 首页显示日期、时间、电池电量和菜单入口
- 按键菜单交互，支持上一项、下一项、确认和长按关机控制
- RTC 时间读取与时间设置
- ADC 电池电压采样与电量百分比显示
- 秒表、姿态检测、小游戏等原有功能保留
- FreeRTOS 多任务调度
- 使用队列传递按键事件
- 使用互斥信号量保护电池数据
- 处理 FreeRTOS 与 SysTick、中断入口、延时函数之间的兼容问题

## FreeRTOS 任务划分

| 任务名 | 职责 | 周期或触发方式 |
| --- | --- | --- |
| `ui` | 首页、菜单、设置页面和 OLED 刷新 | 循环运行，主动延时让出 CPU |
| `tick1ms` | 按键扫描、长按计时、秒表节拍、小游戏节拍 | 1 ms 周期 |
| `battery` | ADC 采样并计算电池电量 | 1000 ms 周期 |

## 任务通信与同步

| 对象 | 类型 | 作用 |
| --- | --- | --- |
| `App_KeyQueue` | 队列 | 按键扫描任务向 UI 逻辑传递按键事件 |
| `App_BatteryMutex` | 互斥信号量 | 保护电池电压、电量百分比等共享变量 |

## 工程打开方式

使用 Keil MDK 打开：

```text
Project.uvprojx
```

打开后重点查看以下分组：

- `App`：应用任务创建与调度入口
- `FreeRTOS`：内核源码、Cortex-M3 移植层、堆管理文件和配置文件
- `Hardware`：OLED、按键、ADC、菜单等应用外设代码
- `User`：主函数、中断适配、FreeRTOS 配置

## 关键代码位置

| 文件 | 说明 |
| --- | --- |
| `User/main.c` | 初始化外设、创建任务、启动 FreeRTOS 调度器 |
| `User/FreeRTOSConfig.h` | FreeRTOS 系统配置 |
| `App/app_tasks.c` | UI 任务、1 ms 节拍任务、电池采样任务 |
| `App/app_tasks.h` | 任务创建接口、队列和互斥量声明 |
| `Hardware/Key.c` | 按键扫描与队列发送 |
| `Hardware/menu.c` | UI 显示、电池更新与互斥保护 |
| `System/Delay.c` | 兼容 FreeRTOS 的延时函数 |
| `User/stm32f10x_it.c` | 中断入口与 FreeRTOS Handler 适配 |

## 文档说明

- `项目说明_FreeRTOS版.md`：完整项目说明
- `移植记录_代码对应关系.md`：从裸机到 FreeRTOS 的改造记录
- `简历项目说明.md`：适合放入简历或面试介绍的项目描述

## 说明

本仓库保留原始开源项目中的版权声明和代码注释。本版本主要完成 FreeRTOS 移植、任务拆分、队列通信、互斥同步和工程文档整理。
