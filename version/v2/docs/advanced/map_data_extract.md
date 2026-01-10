---
title: 地图数据提取
description: 如何提取自己想要的地图数据
layout: doc
---

# 地图数据提取

### 本页面将指导您如何提取 ETS2LA 的附加地图数据。请注意，这是一个高级操作，仅建议熟悉终端操作并具备一定 Linux 知识的用户尝试！

## 1. 下载 WSL
数据提取器只能在 Linux 环境下运行。建议在 WSL（Windows Server Lineage OS）中运行提取器，这样您仍然可以通过它访问 Windows 游戏文件。

## 2. 准备 WSL 实例
默认情况下，WSL 会尝试使用您 Windows 系统下的程序。这意味着如果您在 WSL 实例中运行 node ，它会轮询您的 Windows 系统。这样做行不通，因此需要使用以下命令安装 Node.js：
```
sudo apt update
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```
请立即打开一个新的终端窗口以刷新 PATH 环境变量。
```
nvm ls # should show as N/A
nvm install node
nvm ls # should show as stable
```
该提取器还需要一些额外的组件，这些组件可以按如下方式安装：
```
sudo apt install make
sudo apt install g++
```
## 3. 下载并安装解压缩程序
此步骤需要安装 Git，您应该已经安装了，因此以下代码将克隆我们的地图仓库。此仓库是 [tmudge](https://github.com/truckermudgeon/maps) 版本的自定义分支，添加了模组支持。
```
cd ~
mkdir maps
cd maps
git clone --recurse-submodules https://github.com/ETS2LA/maps/ .
```
这将把存储库克隆到 `/home/username/maps` 目录下，其余命令假设您已在该目录中！
```
npm i
npm run build -w packages/clis/parser
```
## 4. 提取数据
现在我们可以开始提取数据了。该命令有三个主要参数 `-g` 游戏路径） 、 `-m` （模组文件夹路径） 和 `-o` （输出路径）。 以下是一个示例命令，您需要填写：
```
mkdir data
npx parser -g "/mnt/{windows_drive_label}/path/to/the/game/in/your/windows/drive" -m "/mnt/{windows_drive_label}/path/to/the/mods/folder/in/your/windows/drive" -o "/home/{ubuntu_username}/maps/data"
npx generator graph -m [usa/europe] -o "/home/{ubuntu_username}/maps/data" -i "/home/{ubuntu_username}/maps/data"
```
以下是一个命令示例：
```
npx parser -g "/mnt/c/Program Files (x86)/Steam/steamapps/common/Euro Truck Simulator 2" -m "/mnt/c/Users/Tumppi066/Documents/Euro Truck Simulator 2/mod" -o "/home/tuomas/maps/data"
```
以相同的方式运行图形命令，只需记住将 `-m` 参数更改为基础游戏，即 `usa` 或 `europe` 。
## 5. 测试数据、创建配置并发布
::: tip 笔记
这部分工作量很大，如果您不知道/不想自己完成，您可以将数据发送到 Discord 上的开发者，他们会为您处理上传事宜。

建议您尽量学习一下，因为开发人员时间有限，数据导入可能需要一些时间👍
:::
开始之前，请确保您使用的是游戏的基础数据。例如，如果您的模组基于 `ETS2 1.57` 版本，那么您应该先下载该版本的基础数据。

然后，您可以将数据文件夹中除 `icons` 外的所有内容复制到 `app/Plugins/Map/data` ，这将覆盖现有数据。请注意，您可以通过文件资源管理器打开 `Ubuntu` 文件系统，方法是转到左下角的 *Linux* 选项卡。

接下来，您需要打开 `config.json` 文件，并编辑其中的值以匹配要求。首先，您应该修改描述和鸣谢信息。您可以根据需要向字典中添加更多鸣谢类别。请注意文件格式，如果 `JSON` 文件格式错误，则无法正常工作。您可以将 `JSON` 文件复制到类似 https://jsonformatter.org/json-viewer 的 `JSON` 查看器中，它会警告您任何错误。

要获取文件 `size` 变量，您可以在文件资源管理器中选中所有数据文件，右键单击并选择“属性”。在那里您可以看到 “*大小*” 参数，并可以复制其值。请删除逗号，因为该值必须是连续的！

如果您已准备好文件的其余部分，可以将数据打包成 `.zip` 文件， 请勿包含 `config.json` 文件，只需包含数据即可！ 打包完成后，您可以对配置中的 `packed_size` 变量执行相同的大小检查。

此时您可以启动游戏并重新加载地图插件。这会将您的自定义数据加载到系统中，您应该能够正常地在地图上驾驶。

您可能已经注意到配置文件中的 `offsets` 量数组。这是用于手动修复一些解析不正确的道路。如果您使用 `--dev` 参数启动 ETS2LA（编辑 `start.bat` 文件，并将该参数添加到 Python 调用末尾，例如 `python main.py --dev` ），您会在地图设置中看到一个新选项卡，该选项卡提供了启用内部地图的选项。

如果在驾驶过程中遇到任何偏移问题，您可以将鼠标悬停在内部地图中的道路上并点击，这样即可复制道路名称，然后您可以将其添加到 `per_name` 字典中。左侧字符串是道路名称，右侧是您自定义的偏移量。更改偏移量后，您可以点击地图设置中的“ `Reload Offsets` 按钮，并检查内部地图是否已更改。 请注意，可视化界面不会更新道路，只有内部地图会更新！

如果您对偏移量满意，可以将文件发送给 Discord 上的任何一位开发者，或者直接向 https://gitlab.com/ETS2LA/data 提交合并请求。文件添加到代码库后，任何人都可以从地图设置中下载它们 👍