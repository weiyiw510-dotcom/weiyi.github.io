---
layout: page
title: UART(串口)
permalink: /projects/UART/
---

## 目标
1.了解同步与异步传输

2.了解UART串口传输协议

3.了解stm32 UART串口硬件结构

4.会使用UART的查询、中断、DMA三种方式进行编程实现


## 原理
# 同步传输与异步传输
同步传输靠共同的时钟来对齐采样，什么时候读什么时候写，由时钟边沿决定。异步传输没有共同的时钟，靠起始位，停止位以及约定的波特率来对齐时间。差别在于有没有使用一种方法“实现约定好时间”。同步信号使用时钟信号通知对方要读取数据了，然后使用数据信号来传输数据。使用异步信号传输时双方遵守相同的约定（起始信号和怎么表示逻辑1和逻辑0）。简单来说就是同步用时钟线当时钟基准，对齐采样时间，而异步没有时钟线，用起始位建立起点，再按约定波特率在固定时刻采样，并用停止位结束，两者的差别在于时间基准的约定方式。
<table class="cmp">
  <thead>
    <tr>
      <th style="width: 18%;"></th>
      <th style="width: 41%;">同步传输</th>
      <th style="width: 41%;">异步传输</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>信号线</th>
      <td><b>多：</b>时钟信号、数据信号</td>
      <td><b>少：</b>只需要数据信号</td>
    </tr>
    <tr>
      <th>速率</th>
      <td>可变，提高时钟信号频率即可</td>
      <td>双方提前约定</td>
    </tr>
    <tr>
      <th>抗干扰能力</th>
      <td>强</td>
      <td>弱</td>
    </tr>
  </tbody>
</table>

<style>
  table.cmp{
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
  }
  table.cmp th, table.cmp td{
    border: 1.5px solid #000;
    padding: 10px 14px;
    vertical-align: middle;
    text-align: left;
  }
  table.cmp thead th{
    font-size: 22px;
    font-weight: 500;
    text-align: left;
  }
  table.cmp tbody th{
    font-weight: 500;
    white-space: nowrap;
  }
</style>

# UART协议
1.通用异步收发器简称UART，即“Universal Asynchronous Receiver Transmitter”，用来传输串行数据：发送数据时，CPU将并行数据写入UART，UART按照一定格式在一根电线上串行发送，接收数据时，UART检测另一根电线上的信号，将串行数据收集放在缓冲区，CPU即可读取UART获得这些数据。UART以全双工方式传输，，最精简的连线方法只有三根电线：TxD用于发送数据，RxD用于接收数据，GND 用于给双方提供参考电平。

![UART TX/RX 连接示意图](https://weiyiw510-dotcom.github.io/weiyi.github.io/assets/img/uart.png)

UART 使用标准的TTL/CMOS逻辑电平(0～5V、0～3.3V、0～2.5V或0～1.8V四种)来表示数据，高电平表示1，低电平表示0进行长距离传输时，为了增强数据的抗干扰能力、提高传输长度，通常将TTL/CMOS逻辑电平转换为RS-232逻辑电平，3～12V表示0，-3～12V 表示1。

TxD、RxD 数据线以“位”为最小单位传输数据。帧(frame)由具有完整意义的、不可分割的若干位组成，它包含开始位、数据位、较验位(需要的话)和停止位。发送数据之前，UART 之间要约定好数据的传输速率(即每位所占据的时间，其倒数称为波特率)、数据的传输格式(即有多少个数据位、是否使用较验位、是奇较验还是偶较验、有多少个停止位)。波特率表示1秒内传输信号的状态数，比特率表示一秒内传输数据的bit数

数据传输流程如下：
    （1）平时数据线处于”空闲“状态。
    （2）当要发送数据时，UART改变TxD数据线的状态并维持1位的时间，这样接收方检测到开始位后，再等待1.5位的时间就开始一位一位地检测数据线的状态得到所传输的数据。
    （3）UART一帧中可以有5、6、7、8位的数据，发送方一位一位地改变数据线的状态得到所传输的数据。
    （4）如果使用校验功能，UART在发送完数据位后，还要发送一个校验位，校验方式有两种：奇校验、偶校验——即数据位连同校验位中，1的数目是奇数还是偶数。
    （5）最后，发送停止位，数据线恢复到空闲状态，停止位的长度有三种：1位，1.5位，2位。
    
2.![UART TX/RX 连接示意图](https://weiyiw510-dotcom.github.io/weiyi.github.io/assets/img/uart_hardware.png) 
