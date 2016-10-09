#!/bin/bash
# author:tracyone,tracyone@live.cn
# ./oh-my-ubuntu.sh [-f <path of ini file>] [-a all|ppa|apt|download|build] [-h]
# Core theory:git can read or write standard ini file easily.
# For example:
# read :git config section.key
# write :git config section.key value 

stty -echo
shopt -s expand_aliases # enable alias in bash shell 
read -p "Please input $(whoami)'s passwd: " mypasswd
alias sudo="echo "${mypasswd}" | sudo -S"
stty echo

# variable default setting {{{
LOG_FILE="omu.log"
PROMPT=1 # prompt before every install
ROOT_DIR=$(pwd) #do not change
ACTION="all"
SRC_DIR=${HOME}/Work/Source
GIT_CONFIG="./config/ubuntu_16.04.ini"
NPM="cnpm"
# }}}

# function definition {{{

function BeforeInstall()
{
    alias sudo="sudo"
    echo "prepend domain-name-servers 127.0.0.1;" | sudo tee -a /etc/dhcp/dhclient.conf
    echo "prepend domain-name-servers 114.114.114.114;" | sudo tee -a /etc/dhcp/dhclient.conf
    echo "prepend domain-name-servers 223.5.5.5;" | sudo tee -a /etc/dhcp/dhclient.conf

    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
    echo "deb http://dl.google.com/linux/deb/ stable main" | sudo tee -a /etc/apt/sources.list

    # wget -O ~/XX-Net.zip https://codeload.github.com/XX-net/XX-Net/zip/3.1.19
    # unzip ~/XX-Net.zip -d ~/
    # rm -fr ~/XX-Net.zip
    # echo "nohup ~/XX-Net-3.1.19/start & >/dev/null 2>&1" | sudo tee -a /usr/local/bin/chrome

    sudo touch /usr/local/bin/ssh_D
    echo "ssh -qTfnN -D 7070 bwg" | sudo tee -a /usr/local/bin/ssh_D
    sudo chmod +x /usr/local/bin/ssh_D

    sudo touch /usr/local/bin/sssocks
    echo "nohup sslocal -c ~/ss_config.json > ~/.ss_log &" | sudo tee -a /usr/local/bin/sssocks
    sudo chmod +x /usr/local/bin/sssocks

    sudo touch /usr/local/bin/chrome
    echo "nohup google-chrome > ~/.chrome_log &" | sudo tee -a /usr/local/bin/chrome
    sudo chmod +x /usr/local/bin/chrome

    alias sudo="echo "${mypasswd}" | sudo -S"
}

# $1:software list to install..
function AptSingleInstall()
{
    local oldifs=${IFS}
    IFS=" "
    for i in $1
    do
        sudo apt-get install $i --allow-unauthenticated -y || echo -e "apt-get install failed : $i\n" >> ${LOG_FILE}
    done
    IFS=${oldifs}
}

function AptInstall()
{
    local oldifs=${IFS}
    IFS=" "
    ans=""
    if [[  $1 =~  ^[\ ]*$ ]]; then
        return 3
    fi
    if [[  PROMPT -eq 1  ]]; then
        read -n1 -p "Install $1 ?(y/n)" ans
    fi
	if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
        sudo apt-get install $1 --allow-unauthenticated -y || AptSingleInstall "$1"
        sleep 1
	else
		echo -e  "\n\nAbort install\n"
	fi
    IFS=${oldifs}
}

function BeforeNpmInstall()
{
    AptInstall "nodejs npm" || echo -e "node install failed\n" >> ${LOG_FILE}

    if [[  PROMPT -eq 1  ]]; then
        read -n1 -p "Update node ?(y/n)" ans
    fi
	if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
        echo -e "\nUpdate node ...\n"
        sudo npm install -g n && sudo n stable || echo -e "node update failed\n" >> ${LOG_FILE}
        sleep 1
	else
		echo -e  "\n\nAbort update\n"
	fi

    if [[  PROMPT -eq 1  ]]; then
        read -n1 -p "Install cnpm ?(y/n)" ans
    fi
	if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
        echo -e "\nInstall cnpm ...\n"
        sudo npm install -g cnpm
        sleep 1
	else
		echo -e  "\n\nAbort install\n"
	fi
}

# $1:node modules list to install..
function NpmSingleInstall()
{
    local oldifs=${IFS}
    IFS=" "
    for i in $1
    do
        sudo ${NPM} install -g $i || echo -e "npm install failed : $i\n" >> ${LOG_FILE}
    done
    IFS=${oldifs}
}

function NpmInstall()
{
    local oldifs=${IFS}
    IFS=" "
    ans=""
    if [[  $1 =~  ^[\ ]*$ ]]; then
        return 3
    fi
    if [[  PROMPT -eq 1  ]]; then
        read -n1 -p "Install $1 ?(y/n)" ans
    fi
	if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
        sudo ${NPM} install -g $1 || NpmSingleInstall "$1"
        sleep 1
	else
		echo -e  "\n\nAbort install\n"
	fi
    IFS=${oldifs}
}

# $1:section.key
function AptAddRepo()
{
    ans=""
    if [[  PROMPT -eq 1  ]]; then
        read -n1 -p "Adding ppa $i? (y/n) " ans
    fi
    if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
        sudo add-apt-repository -y $1 || echo -e "apt-add-repository failed : $1\n" >> ${LOG_FILE}
        sleep 1
    else
        echo -e  "\n\nAbort install\n"
    fi
}

function DebInstall()
{
    local filename="tmp$(date +%Y%m%d%H%M%S).deb"
    ans=""
    if [[  PROMPT -eq 1  ]]; then
        read -n1 -p "Wget $i? (y/n) " ans
    fi
    if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
        wget -c $1 -O ${filename}  || echo -e "Wget $1 failed\n" >> ${LOG_FILE}
        sudo dpkg -i ${filename} || ( sudo apt-get -f install --fix-missing -y; sudo dpkg -i ${filename}  \
            || echo -e "dpkg install ${filename}  form $1 failed\n" >> ${LOG_FILE} )
    else
        echo -e  "\n\nAbort install\n"
    fi
}

function BuildSrc()
{
    IFS=","
    local -i count=0
    local proj_str=""
    if [[  PROMPT -eq 1  ]]; then
        read -n1 -p "Build source $i? (y/n) " ans
    fi
    if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
        for i in $1; do
            case ${count} in
                0 )
                    IFS=${OLD_IFS}
                    proj_dir=${SRC_DIR}/$(basename $i .git)
                    if [[ ! -d ${proj_dir}  ]]; then
                        git clone $i ${proj_dir}/ || echo -e "git clone $i failed\n" >> ${LOG_FILE}
                    else
                        echo -e "\n\nUpdating $(basename $i .git)'s source code ...\n"
                        cd  ${proj_dir}
                        git checkout -- .
                        git pull || echo -e "Update source $(basename $i .git) failed\n" >> ${LOG_FILE}
                    fi
                    IFS=","
                    ;;
                1 )
                    AptInstall $i
                    ;;
                2 )
                    child_shell_execute "cd ${proj_dir} && $i"
                    ;;
                *)
                    echo -e "Wrong ini format in build section\n" >> ${LOG_FILE}
                    ;;
            esac
            let "count+=1"
        done
    else
        echo -e  "\n\nAbort install\n"
    fi
    cd ${ROOT_DIR}
    IFS=$'\x0A' 
}

function PrintInfo()
{
    cat << "EOF"
==============================================================
          ___  __  __ _   _ 
         / _ \|  \/  | | | |
        | | | | |\/| | | | |
        | |_| | |  | | |_| |
         \___/|_|  |_|\___/  

    Author  :tracyone at live dot cn                   
    Project :https://github.com/tracyone/oh-my-ubuntu.git
==============================================================
EOF
}

function OmuShowHelp()
{
    PrintInfo
    echo -e "\n$1"
    echo -e "\nUsage:`basename $0` [-f <path of ini file>] [-a all|ppa|apt|npm|download|build] [-h]\n"
}

function ProcessOptionA()
{
    ACTION=$1
    case $1 in
        all )
            ;;
        ppa )
            ;;
        apt )
            ;;
        npm )
            ;;
        download )
            ;;
        build )
            ;;
        * )
            OmuShowHelp "Unsupport action $1"
            exit 3;
            ;;
    esac
}

function configure()
{
	local package_lack=""
	for i in $1
	do
		which $i > /dev/null 2>&1
		if [[ $? -ne 0 ]]; then
			echo -e "\nChecking for $i ..... no\n"
			package_lack="$i ${package_lack}"
		else
			echo -e "\nChecking for $i ..... yes\n"
		fi
	done	
	if [[ ${package_lack} != "" ]]; then
        echo -e "Before install ${package_lack},we update apt Source first ..... \n"
        sudo apt-get update
        echo -e "apt-get install ${package_lack} ..... \n"
		sudo apt-get install -y ${package_lack} || return 3
	fi
    return 0
}

function child_shell_execute()
{
    local tmp="echo ${mypasswd} |sudo -S "
    bash -c "$(echo $1 | sed "s/\<sudo\>/${tmp}/g")"
}

# }}}

# Script start  {{{

# arg parse and env check {{{
while getopts "f:a:h" arg #选项后面的冒号表示该选项需要参数
do
		case $arg in
			 f )
                GIT_CONFIG=${OPTARG}
				;;
			 a )
				ProcessOptionA ${OPTARG}
				;;
			 h )
				OmuShowHelp
                exit 0
				;;
			* )
				OmuShowHelp
				exit 1
				;;
		esac
done
shift $(($OPTIND-1))
if [[ !  -z $1 ]]; then
    OmuShowHelp "Unknown option:$1"
    exit 3
fi

if [[  ! -f ${GIT_CONFIG} ]]; then
    OmuShowHelp "Config file ${OPTARG} is not exist\n"
    exit 3
fi

echo -e "\nUse Config file: ${GIT_CONFIG}\n"
echo -e "Action is : ${ACTION}\n"

export GIT_CONFIG

configure "git wget rm mkdir" || exit 3

# }}}


rm -f ${LOG_FILE}
mkdir -p ${SRC_DIR} || exit 3

# set the separator to \n
OLD_IFS="$IFS" 
IFS=$'\x0A' 


read -n1 -p "Install all software Without prompting?(y/n)" ans
if [[  ${ans} =~ [yY] ]]; then
    PROMPT=0
else
    PROMPT=1
fi

# BeforeInstall

if [[  ${ACTION} == "all" || ${ACTION} == "ppa" ]]; then
    ppa_list=$(git config --get-all repo.ppa)
    echo -e "\n\nadding ppa ...\n"
    for i in ${ppa_list}; do
        if [[ $i != "" ]]; then
            AptAddRepo $i
        fi
    done
fi

if [[  PROMPT -eq 1  ]]; then
    echo -e "\n\n"
    read -n1 -p "Update Source (y/n) " ans
fi

ARCH=$(git config --get-all info.arch)

if [[ $ans =~ [Yy] || PROMPT -eq 0 ]]; then
    if [[  ${ARCH} == "x64" ]]; then
        echo -e "\n\nAdding i386 packages support ...\n"
        sudo dpkg --add-architecture i386
    fi
    echo -e "\n\nUpdate source ...\n"
    sudo apt-get update
    echo -e "\n\nUpgrade ...\n"
    sudo apt-get upgrade -y
fi

if [[  ${ACTION} == "all" || ${ACTION} == "apt" ]]; then
    echo -e "\n\nApt install ...\n"
    apt_list=$(git config --get-all apt.packages)
    for i in ${apt_list}; do
        if [[ $i != "" ]]; then
            AptInstall $i
        fi
    done
fi

if [[  ${ACTION} == "all" || ${ACTION} == "npm" ]]; then
    echo -e "\n\nNode install ...\n"
    BeforeNpmInstall
    echo -e "\n\nNpm install ...\n"
    npm_list=$(git config --get-all npm.modules)
    for i in ${npm_list}; do
        if [[ $i != "" ]]; then
            NpmInstall $i
        fi
    done
fi

if [[  ${ACTION} == "all" || ${ACTION} == "download" ]]; then
    echo -e "\n\nDeb install ...\n"
    deb_list=$(git config --get-all download.url)
    for i in ${deb_list}; do
        if [[ $i != "" ]]; then
            DebInstall $i
        fi
    done
fi

if [[  ${ACTION} == "all" || ${ACTION} == "build" ]]; then
    src_list=$(git config --get-all build.gitsrc)
    echo -e "\n\nInstall software from source ...\n"
    for i in ${src_list}; do
        if [[ $i != "" ]]; then
            BuildSrc $i
        fi
    done
fi

echo -e "\nAll done!!Clean ...\n"
sudo apt-get autoremove -y
sudo apt-get autoclean
sudo apt-get clean
PrintInfo

# }}}

# vim: set ft=sh fdm=marker foldlevel=0 foldmarker&: 
