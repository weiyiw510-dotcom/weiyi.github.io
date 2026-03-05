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
