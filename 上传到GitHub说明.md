# 上传到 GitHub 说明

本目录已经整理为一个 Git 仓库，默认分支为 `main`。

如果已经在 GitHub 新建了空仓库，可以在本目录执行：

```text
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

如果远程仓库已经有 `README.md` 或其他初始文件，建议重新创建一个空仓库，避免第一次推送时产生历史冲突。

建议仓库名：

```text
stm32-freertos-smartwatch
```

建议仓库描述：

```text
基于 STM32F103C8T6 和 FreeRTOS 的可编程多功能手表项目，包含 OLED UI、按键队列、电池采样任务和互斥同步。
```

上传完成后，简历中可以填写仓库主页链接，例如：

```text
https://github.com/你的用户名/stm32-freertos-smartwatch
```
