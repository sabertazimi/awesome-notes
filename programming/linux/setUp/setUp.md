
# Linux Set Up

<!-- TOC -->

- [Linux Set Up](#linux-set-up)
  - [ArchLinux Set Up](#archlinux-set-up)
    - [Tutorials](#tutorials)
    - [Basic](#basic)
    - [Pacman](#pacman)
    - [AUR](#aur)
  - [Ubuntu Set Up](#ubuntu-set-up)
    - [Language](#language)
    - [Git](#git)
    - [Aria2](#aria2)
    - [Fonts](#fonts)
    - [IDE](#ide)
      - [Android Studio/WebStorm/CLion](#android-studiowebstormclion)
    - [Text Editor](#text-editor)
      - [Sublime Text](#sublime-text)
      - [Atom](#atom)
      - [Visual Studio Code](#visual-studio-code)
    - [Software](#software)
      - [[Appearence](https://blog.microideation.com/2016/08/30/customizing-ubuntu-system/)](#appearencehttpsblogmicroideationcom20160830customizing-ubuntu-system)
      - [ZealDocs](#zealdocs)
      - [Desktop](#desktop)
    - [Shell Tools](#shell-tools)
      - [f-irc/irssi (irc client)](#f-ircirssi-irc-client)
      - [pppoeconf/speedtest-cli](#pppoeconfspeedtest-cli)
    - [GFW](#gfw)
      - [Hosts](#hosts)
      - [Lantern](#lantern)
      - [Shadowsocks](#shadowsocks)
      - [sshuttle](#sshuttle)
      - [Proxychains(Global Proxy)](#proxychainsglobal-proxy)
      - [OpenVPN && vpngate/vpnbook](#openvpn--vpngatevpnbook)
      - [Docker VPN](#docker-vpn)
  - [Bonus for OSX](#bonus-for-osx)

<!-- /TOC -->

## ArchLinux Set Up

### Tutorials

- [Arch Linux - Jianshu](http://www.jianshu.com/p/960130fb1fa5)
- [Linux Toy](https://linuxtoy.org/archives/the-perfect-linux-desktop-arch-linux-2007-08-2-1.html)
- [Gist Part 1](https://gist.github.com/bcbcarl/5d3d9c41d728eef395dd)
- [Gist Patr 2](https://gist.github.com/bcbcarl/2d4c77cc06955f74bd0b)

### Basic

```bash
Ctrl+Alt+F1
# less /usr/share/aif/docs/official_installation_guide_en

Ctrl+Alt+F2
# install os

Ctrl+Alt+F3
# pacman -S lynx arch-wiki-docs arch-wiki-lite
# lynx /usr/share/doc/arch-wiki/html/index.html
```

```bash
# systemctl enable dhcpcd
# reboot
# pacman -S --needed base-devel git wget jshon expac yajl zsh vim
```

- makepkg

```bash
$ curl -L -O https://aur.archlinux.org/cgit/aur.git/snapshot/package_name.tar.gz
$ cd package_name
$ less PKGBUILD
$ less package_name.install

$ makepkg -si
# -s sync deps
# -i install
# -r rm deps
# -c clean up
```

### Pacman

- /etc/pacman.conf
- /etc/pacman.d/mirrorlist

### AUR

- [yaourt](https://archlinux.fr/yaourt-en)

```bash
# packages' list
$ wget https://aur.archlinux.org/packages.gz
```

## Ubuntu Set Up

### Language

```bash
export LANG=en_US
xdg-user-dirs-gtk-update
export LANG=zh_CN
```

- /var/lib/locales/supported.d/local

```bash
sudo locale-gen zh_CN.GBK
sudo locale-gen zh_CN.GB18030
sudo dpkg-reconfigure locales
```

### Git

```bash
sudo apt install git
git config --global user.name "sabertazimi"
git config --global user.email sabertazimi@gmail.com
git config --global core.editor vim
git config --global push.default simple
git config --global credential.helper store
git config --global commit.template $HOME/.gitmsg.md
git config --global alias.s "status"
git config --global alias.a "add"
git config --global alias.c "commit -v"
git config --global alias.p "push"
git config list
```

### Aria2

```bash
mkdir -p ~/.aria2
vi ~/.aria2/aria2.conf
```

```bash
#用户名
#rpc-user=user
#密码
#rpc-passwd=passwd
#设置加密的密钥
#rpc-secret=secret
#允许rpc
enable-rpc=true
#允许所有来源, web界面跨域权限需要
rpc-allow-origin-all=true
#是否启用https加密，启用之后要设置公钥,私钥的文件路径
#rpc-secure=true
#启用加密设置公钥
#rpc-certificate=/home/acgotaku/.config/aria2/example.crt
#启用加密设置私钥
#rpc-private-key=/home/acgotaku/.config/aria2/example.key
#允许外部访问，false的话只监听本地端口
rpc-listen-all=true
#RPC端口, 仅当默认端口被占用时修改
#rpc-listen-port=6800
#最大同时下载数(任务数), 路由建议值: 3
max-concurrent-downloads=5
#断点续传
continue=true
#同服务器连接数
max-connection-per-server=5
#最小文件分片大小, 下载线程数上限取决于能分出多少片, 对于小文件重要
min-split-size=10M
#单文件最大线程数, 路由建议值: 5
split=10
#下载速度限制
max-overall-download-limit=0
#单文件速度限制
max-download-limit=0
#上传速度限制
max-overall-upload-limit=0
#单文件速度限制
max-upload-limit=0
#断开速度过慢的连接
#lowest-speed-limit=0
#验证用，需要1.16.1之后的release版本
#referer=*
#文件保存路径, 默认为当前启动位置
dir=D:\Downloads
#文件缓存, 使用内置的文件缓存, 如果你不相信Linux内核文件缓存和磁盘内置缓存时使用, 需要1.16及以上版本
#disk-cache=0
#另一种Linux文件缓存方式, 使用前确保您使用的内核支持此选项, 需要1.15及以上版本(?)
#enable-mmap=true
#文件预分配, 能有效降低文件碎片, 提高磁盘性能. 缺点是预分配时间较长
#所需时间 none < falloc ? trunc << prealloc, falloc和trunc需要文件系统和内核支持
file-allocation=prealloc
#不进行证书校验
check-certificate=false
```

### Fonts

- /usr/share/fonts/chinese/TrueType/
- [Windows Fonts Download](http://pan.baidu.com/s/1jGRz7ue)

```bash
mkfontscale
mkfontdir
fc-cache
```

### IDE

#### Android Studio/WebStorm/CLion

### Text Editor

#### Sublime Text

```markdown
—– BEGIN LICENSE —–
Nicolas Hennion
Single User License
EA7E-866075
8A01AA83 1D668D24 4484AEBC 3B04512C
827B0DE5 69E9B07A A39ACCC0 F95F5410
729D5639 4C37CECB B2522FB3 8D37FDC1
72899363 BBA441AC A5F47F08 6CD3B3FE
CEFB3783 B2E1BA96 71AAF7B4 AFB61B1D
0CC513E7 52FF2333 9F726D2C CDE53B4A
810C0D4F E1F419A3 CDA0832B 8440565A
35BF00F6 4CA9F869 ED10E245 469C233E
—— END LICENSE ——
```

```python
import urllib.request,os,hashlib; h ='2915d1851351e5ee549c20394736b442' +
'8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package';
ipp = sublime.installed_packages_path(); urllib.request.install_opener(
urllib.request.build_opener( urllib.request.ProxyHandler()) ); by =
urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ',
'%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating
download (got %s instead of %s), please try manual install' % (dh, h)) if dh
!= h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

```bash
git clone https://github.com/sabertazimi/Awesome-Sublime
mv ~/.config/sublime-text-3/Packages/User ~/.config/sublime-text-3/Packages/User.bk
cp -fr Awesome-Sublime/User ~/.config/sublime-text-3/Packages/
```

#### Atom

- plugins: sync-SETTINGS(gist)

```javascript
  "activate-power-mode":
    screenShake:
      enabled: false
```

#### Visual Studio Code

```bash
sudo apt-get install ubuntu-make
umake ide visual-studio-code (--remove)
sudo ln -s /home/hustlyl/.local/share/umake/web/visual-studio-code/Code /usr/local/bin/code
```

### Software

#### [Appearence](https://blog.microideation.com/2016/08/30/customizing-ubuntu-system/)

#### ZealDocs

```bash
sudo apt-get install zeal
sudo apt-get remove appmenu-qt5
```

#### Desktop

```bash
sudo apt install gnome gnome-shell gnome-panel
\ gnome-menus gnome-session gnome-tweak-tool gdm
```

### Shell Tools

[Futher List](http://www.codeceo.com/article/linux-terminal-guide.html)

#### f-irc/irssi (irc client)

#### pppoeconf/speedtest-cli

```bash
sudo pppoeconf
sudo pon dsl-provider
sudo poof
ifconfig ppp0
```

### GFW

#### Hosts

- [Hosts](https://github.com/racaljk/hosts)

#### Lantern

- [Lantern](https://github.com/getlantern/lantern)

#### Shadowsocks

- [RSS](https://github.com/breakwa11/shadowsocks-rss)
- [Autoshadower](https://github.com/yangyangwithgnu/autoshadower)
- [ChinaDNS](https://github.com/shadowsocks/ChinaDNS-Python)

```bash
nohup ssserver -c /etc/shadowsocks.json 2>&1 &
```

#### sshuttle

- [sshuttle](https://github.com/apenwarr/sshuttle)

#### Proxychains(Global Proxy)

- [proxychains](https://github.com/rofl0r/proxychains-ng)

#### OpenVPN && vpngate/vpnbook

- [openvpn](https://github.com/OpenVPN/openvpn)
- [vpngate](https://github.com/waylau/vpngate-mirrors)

#### Docker VPN

- [Docker VPN](https://github.com/hwdsl2/docker-ipsec-vpn-server)

## Bonus for OSX

- [Basic Dev Setup for OSX](https://hackernoon.com/macbook-dev-setup-5890e61a8f0a)
- [OSX Setup Apps](https://juejin.im/post/58e1f221570c350057a6bc03)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json
\ qlprettypatch quicklook-csv betterzipql webp-quicklook suspicious-package

brew cask install qq
brew cask install qqinput   # qq输入法
brew cask install qqmacmgr  # 腾讯电脑管家
brew cask install qqmusic   # qq音乐
brew cask install rtx       # 腾讯RTX

brew cask install aliwangwang
brew cask install thunder
brew cask install baiducloud  # 百度网盘
brew cask install youdao      # 有道词典  

brew cask install mplayerx    # 视频播放器
brew cask install batterzip   # zip，付费
brew cask install daisydisk

# markdown
brew cask install typora
brew cask install macdown

# 效率
brew cask install alfred
brew cask install xmind     # 思维导图
brew cask install calibre   # 电子书管理

# 虚拟机
brew cask install genymotion
brew cask install virtualbox
brew cask install vagrant

# 版本管理
brew cask install sourcetree    # git
brew cask install kaleidoscope  # 文件比较，付费

# 开发
brew cask install iterm2
brew cask install gas-mask        # host 管理
brew cask install sqlitebrowser
brew cask install shadowsocksx

# 请求/抓包
brew cask install cocoapacketanalyzer # tcp/ip 抓包
brew cask install charles # http 抓包，付费
brew cask install postman # api工具，http 请求模拟
brew cask install paw     # api工具，http 请求模拟，付费
```
