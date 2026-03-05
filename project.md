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
1.同步传输与异步传输
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
