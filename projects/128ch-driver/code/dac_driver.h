#ifndef __DAC_DRIVER_H
#define __DAC_DRIVER_H

#ifdef __cplusplus
extern "C" {
#endif

#include "main.h"

#define DAC_CHANNEL_COUNT 128U

/* 初始化 DAC 发送状态机和默认测试数据。 */
void DAC_Init(void);
/* 定时器每到一个节拍调用一次，推进一拍串行发送时序。 */
void DAC_Tick(void);
/* 用新的 128 路数据更新发送缓冲区。 */
void DAC_SetData(const uint16_t *src, uint16_t len);
/* 返回内部缓冲区地址，便于后续串口接收时直接写入。 */
uint16_t *DAC_GetBuffer(void);

#ifdef __cplusplus
}
#endif

#endif /* __DAC_DRIVER_H */
