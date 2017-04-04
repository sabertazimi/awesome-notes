#! /bin/bash
#
# ss_setup.sh
# Copyright (C) 2017 sabertazimi <sabertazimi@avalon>
#
# Distributed under terms of the MIT license.
#

yum install python-setuptools && easy_install pip
pip install shadowsocks
echo "nohup sslocal -c /etc/shadowsocks.json /dev/null 2>&1 &" /etc/rc.local
nohup ssserver -c /etc/shadowsocks.json -d start /dev/null 2>&1 &
# nohup sslocal -c /etc/shadowsocks.json /dev/null 2>&1 &

