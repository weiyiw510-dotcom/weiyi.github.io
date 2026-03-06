
layout: page

title: UART(串口)

permalink: /projects/UART/

---

## 目标
1.了解同步与异步传输

2.了解UART串口传输协议

3.了解stm32 UART串口硬件结构

4.会使用UART的查询、中断、DMA三种方式进行编程实现

# 原理
## 同步传输与异步传输
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

## UART协议
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

STM32的USART可以理解为“发送通道+接收通道+波特率发生器+控制/状态/中断”四大块。发送端这边，CPU或DMA把待发送的数据写入发送数据寄存器TDR，硬件再把数据搬到发送移位寄存器，按设定的波特率逐位移出，从Tx引脚输出。接收端相反：外部信号从Rx引脚进入后，先被接收移位寄存器按位采样组装成一个字节，随后放入接收数据寄存器RDR，cpu或DMA再从RDR读数据。USART的通信参数（使能、校验位、停止位）主要由CR1/CR2/CR3等控制寄存器配置；接收/发送完成、缓冲区空/非空以及从错误标志会反应在SR状态寄存器中，并可触发对应的中断或DMA请求。底层的时间基准由波特率发生器（USART_BRR）提供,它将外设时钟FPLCK分频得到波特率，用来驱动发送/接收采样节拍，从而保证串行数据按约定速率可靠传输。

## UART的驱动程序安装
1.UART的接线方式很简单，Rx接Tx，Tx接Rx，GND接GND，就完成了。
2.驱动程序安装，驱动程序为CH340_CH341,直接安装即可
![UART TX/RX 连接示意图](https://weiyiw510-dotcom.github.io/weiyi.github.io/assets/img/CH340_CH341.png)

在设备管理器中看到设备端口，证明驱动安装成功
![UART TX/RX 连接示意图](https://weiyiw510-dotcom.github.io/weiyi.github.io/assets/img/COM.png)

3.串口收发工具的安装
安装串口收发工具sscom，sscom具备串口和网络功能
![UART TX/RX 连接示意图](https://weiyiw510-dotcom.github.io/weiyi.github.io/assets/img/sscom.png)

#UART的代码实现方式
结合UART硬件结构，有三种编程方式：
（1） 查询方式：要发送数据时，先把数据写入TDR寄存器，然后判断TDR为空，继续写入或者返回。要读取数据时，先判断RDR为非空，再读取RDR得到数据。
（2） 中断方式：中断方式效率更高，并且可以在接收数据时避免数据丢失。要发送数据时，使能“TXE”中断（发送寄存器空）。在TXE中断处理函数里，从程序的发送buffer里取出一个数据，写入TDR。等TXE中断再次发生时，再从程序的发送buffer里取出下一个数据写入TDR.

对于接收数据，一开始就使能“RXNE”中断（接收寄存器非空）。这样，UART接收到一个数据就会触发中断，在中断程序里读RDR得到数据，存入程序的接收buffer。当程序想读取串口数据时，直接读取接收buffer即可。这种情况特别适合使用环形buffer。
（3）DMA方式：使用中断方式时，在传输、接收数据时，会发生中断，还需要cpu执行中断处理函数，而DMA方式可以直接在两个设备之间传递数据，无需CPU参与。DMA结构如下：
![UART TX/RX 连接示意图](https://weiyiw510-dotcom.github.io/weiyi.github.io/assets/img/DMA.png)

左侧为DMA控制器，下面为DMA的多个通道（Ch1/Ch2/Ch...）,DMA通过AHB总线与系统互联，可以直接在外设寄存器和SRAM之间传输数据，不需要CPU一次次读写搬运。图中USART1产生DMA请求，DMA会按照配置把外设的数据直接写入SRAM，或者从SRAM直接读出送到外设。CPU的主要作用变成配置DMA参数+等待完成回调，从而减少中断频率和搬运开销，提高吞吐率并降低 CPU 占用。

（4）三种方式的函数调用如下：
![UART TX/RX 连接示意图](https://weiyiw510-dotcom.github.io/weiyi.github.io/assets/img/HAL_UART.png)

查询方式发送数据时要死等发送完毕，接收数据时容易丢失，中断方式接收数据时容易丢失数据，可以把数据存入环形buffer并且一开始就使能接收中断。

##代码部分
1.查询方式
'''c
// 查询方式：使用查询方法发送和接收数据
HAL_UART_Transmit(&huart1, TxData, TxSize, HAL_MAX_DELAY);  // 发送数据
HAL_UART_Receive(&huart1, RxData, RxSize, HAL_MAX_DELAY);  // 接收数据

2.中断方式
'''c
// 使能 TXE 和 RXNE 中断
HAL_UART_Receive_IT(&huart1, RxData, RxSize);  // 启动接收中断
HAL_UART_Transmit_IT(&huart1, TxData, TxSize);  // 启动发送中断

// 处理 UART 中断
void USART1_IRQHandler(void)
{
  // 调用 HAL 库中的中断处理函数
  HAL_UART_IRQHandler(&huart1);
}

// UART 中断回调函数
void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART1)
  {
    // 发送完成回调，可以处理发送完成后的操作
  }
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART1)
  {
    // 接收完成回调，处理接收到的数据
    // 例如将数据存入接收缓冲区
  }
}

3.DMA方式
'''c
// 配置 DMA 进行 UART 接收
HAL_UART_Receive_DMA(&huart1, RxData, RxSize);  // 启动 DMA 接收

// 配置 DMA 进行 UART 发送
HAL_UART_Transmit_DMA(&huart1, TxData, TxSize);  // 启动 DMA 发送

// DMA 完成回调
void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART1)
  {
    // 发送完成回调
  }
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART1)
  {
    // 接收完成回调
  }
}

## 总结

查询方式下的数据丢失问题

在 查询方式（Polling） 下，CPU 需要不断轮询串口的接收寄存器（RDR）或状态寄存器（SR）来检查是否有新的数据到达。如果数据到达的速度较快，而 CPU 的查询速度较慢，接收到的数据可能还没有来得及处理，就会被新的数据覆盖，导致 数据丢失。此外，接收缓冲区也有可能会在数据到达之前达到最大容量，从而发生 缓冲区溢出，进一步丢失数据。

这种情况下，中断方式或 DMA 方式 是更为有效的解决方案。中断方式可以通过在数据到达时触发中断来实现实时数据处理，而 DMA 方式 则可以直接将数据从接收寄存器传输到内存，无需 CPU 参与，避免了因查询延迟造成的数据丢失。
