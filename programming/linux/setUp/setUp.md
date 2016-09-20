
* [Linux Set Up](#linux-set-up)
	* [Language](#language)
	* [Git](#git)
	* [DHCP](#dhcp)
	* [Chrome](#chrome)
		* [XX-Net](#xx-net)
		* [Extensions](#extensions)
	* [Aria2](#aria2)
	* [ Fonts](#-fonts)
	* [IDE](#ide)
		* [ Android Studio/WebStorm/CLion](#-android-studiowebstormclion)
	* [Text Editor](#text-editor)
		* [Vim(Github)](#vimgithub)
		* [Sublime Text](#sublime-text)
		* [Atom](#atom)
		* [Visual Studio Code](#visual-studio-code)
	* [Software](#software)
		* [[Appearence](https://blog.microideation.com/2016/08/30/customizing-ubuntu-system/)](#appearencehttpsblogmicroideationcom20160830customizing-ubuntu-system)
		* [ZealDocs](#zealdocs)
		* [Desktop](#desktop)
	* [Shell Tools](#shell-tools)
		* [f-irc/irssi (irc client)](#f-ircirssi-irc-client)
		* [pppoeconf/speedtest-cli](#pppoeconfspeedtest-cli)
	* [Config](#config)
		* [Terminal](#terminal)
		* [zsh](#zsh)
	* [GFW](#gfw)
		* [Hosts](#hosts)
		* [Lantern](#lantern)
		* [Shadowsocks](#shadowsocks)
		* [sshuttle](#sshuttle)
		* [Proxychains(Global Proxy)](#proxychainsglobal-proxy)
		* [OpenVPN && vpngate/vpnbook](#openvpn--vpngatevpnbook)
		* [Docker VPN](#docker-vpn)
	* [Windows](#windows)
		* [Imitate Linux](#imitate-linux)
		* [Software](#software-1)

# Linux Set Up

## Language

```shell
export LANG=en_US
xdg-user-dirs-gtk-update
export LANG=zh_CN
```

*   /var/lib/locales/supported.d/local

```shell
sudo locale-gen zh_CN.GBK
sudo locale-gen zh_CN.GB18030
sudo dpkg-reconfigure locales
```

## Git

```sh
$ sudo apt install git
$ git config --global user.name "sabertazimi"
$ git config --global user.email sabertazimi@gmail.com
$ git config --global core.editor vim
$ git config --global push.default simple
$ git config --global credential.helper store
$ git config --global commit.template $HOME/.gitmsg.md
$ git config --global alias.s "status"
$ git config --global alias.a "add"
$ git config --global alias.c "commit -v"
$ git config --global alias.p "push"
$ git config list
```

## DHCP

```sh
sudo vim /etc/dhcp/dhclient.conf

prepend domain-name-servers 127.0.0.1;

prepend domain-name-servers 114.114.114.114;
prepend domain-name-servers 223.5.5.5;
```

## Chrome

```shell
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo vi /etc/apt/sources.list << deb http://dl.google.com/linux/deb/ stable main
```

### XX-Net

*   download

https://github.com/XX-net/XX-Net/wiki/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95

```shell
nohup ~/XX-Net-3.1.19/start & >/dev/null 2>&1
```

### Extensions

*   SwitchyOmega
*   Tempermonkey
*   RSS Reader
*   Netease Email
*   Dida List
*   Zhihu
*   Bilibili

## Aria2

```shell
mkdir -p ~/.aria2
vi ~/.aria2/aria2.conf
```

```conf
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

##  Fonts

*   /usr/share/fonts/chinese/TrueType/
*   [Windows Fonts Download](http://pan.baidu.com/s/1jGRz7ue)

```shell
mkfontscale
mkfontdir
fc-cache
```

## IDE

###  Android Studio/WebStorm/CLion

## Text Editor

### Sublime Text

```sh
git clone https://github.com/lyfeyaj/sublime-text-imfix.git
cd sublime-text-imfix
./sublime-imfix
```

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
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

```sh
git clone https://github.com/sabertazimi/Awesome-Sublime
cd Awesome-Sublime
cp -fr User ~/.config/sublime-text-3/Packages/
```

### Atom

*   firewall config

```
 $ touch ~/.atom/.apmrc && echo 'strict-ssl = false' > ~/.atom/.apmrc
```

*   plugins: sync-SETTINGS(gist)

```javascript
  "activate-power-mode":
    screenShake:
      enabled: false
```

### Visual Studio Code

```
sudo apt-get install ubuntu-make
umake web visual-studio-code
umake web visual-studio-code --remove
sudo ln -s /home/hustlyl/.local/share/umake/web/visual-studio-code/Code /usr/local/bin/code
```

## Software

### [Appearence](https://blog.microideation.com/2016/08/30/customizing-ubuntu-system/)

### ZealDocs

```shell
$ sudo apt-get install zeal
$ sudo apt-get remove appmenu-qt5
```

### Desktop

```sh
$ sudo apt install gnome gnome-shell gnome-panel gnome-menus gnome-session gnome-tweak-tool gdm
```

## Shell Tools

[Futher List](http://www.codeceo.com/article/linux-terminal-guide.html)

### f-irc/irssi (irc client)

### pppoeconf/speedtest-cli

```sh
sudo pppoeconf
sudo pon dsl-provider
sudo poof
ifconfig ppp0
```

## Config

### Terminal

```sh
$ sudo update-alternatives --config x-terminal-emulator
```

### zsh

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

```shell
vi /etc/passwd
vi ~/.zshrc
```

*   theme : rkj-repos candy ys robbyrussell
*   plugins=(vi-mode git github go golang gradle history screen cp emoji man node npm sudo)

## GFW

### Hosts

*   https://github.com/racaljk/hosts

### Lantern

*   https://github.com/getlantern/lantern

### Shadowsocks

*   https://github.com/breakwa11/shadowsocks-rss
*   https://github.com/yangyangwithgnu/autoshadower

### sshuttle

*   https://github.com/apenwarr/sshuttle

### Proxychains(Global Proxy)

*   https://github.com/rofl0r/proxychains-ng

### OpenVPN && vpngate/vpnbook

*   https://github.com/OpenVPN/openvpn
*   https://github.com/waylau/vpngate-mirrors

```sh
sudo apt-get install openssl
sudo apt-get install pam-devel
```

```sh
sudo wget http://www.oberhumer.com/opensource/lzo/download/lzo-2.06.tar.gz
tar –zxvf lzo-2.06.tar.gz –C /usr/src/
cd /usr/src/lzo-2.06
sudo  ./configure --prefix=/usr/local
sudo make
sudo make install
```

```sh
sudo unzip openvpn-2.3.10.zip
cd openvpn-2.3.2
sudo ./.configure --prefix=/opt/openvpn-2.3.10
sudo make
sudo make install
```

```sh
sudo apt-get install easy-rsa
sudo apt-get install openvpn
```

### Docker VPN

*   https://github.com/hwdsl2/docker-ipsec-vpn-server

## Windows

### Imitate Linux

*   Wox
*   Cygwin
*   chocalate

### Software

*   360 safe
*   google chrome
*   sougoupinyin
*   haozip
*   qq
*   baiduyun
*   thunder
*   netease music
*   office
*   nodejs: cash
