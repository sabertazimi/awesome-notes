    // 1. 原生JavaScript实现字符串长度截取
        function cutstr(str, len) {
            var temp;
            var icount = 0;
            var patrn = /[^\x00-\xff]/;
            var strre = "";
            for (var i = 0; i < str.length; i++) {
                if (icount < len - 1) {
                    temp = str.substr(i, 1);
                    if (patrn.exec(temp) == null) {
                        icount = icount + 1
                    } else {
                        icount = icount + 2
                    }
                    strre += temp
                } else {
                    break
                }
            }
            return strre + "..."
        }


    // 2. 原生JavaScript获取域名主机

        function getHost(url) {
            var host = "null";
            if(typeof url == "undefined"|| null == url) {
                url = window.location.href;
            }
            var regex = /^\w+\:\/\/([^\/]*).*/;
            var match = url.match(regex);
            if(typeof match != "undefined" && null != match) {
                host = match[1];
            }
            return host;
        }

    // 3. 原生JavaScript清除空格

        String.prototype.trim = function() {
            var reExtraSpace = /^\s*(.*?)\s+$/;
            return this.replace(reExtraSpace, "$1")
        }


    // 4. 原生JavaScript替换全部

        String.prototype.replaceAll = function(s1, s2) {
            return this.replace(new RegExp(s1, "gm"), s2)
        }


    // 5. 原生JavaScript转义html标签

        function HtmlEncode(text) {
            // return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }


    // 6. 原生JavaScript还原html标签

        function HtmlDecode(text) {
            return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        }


    // 7. 原生JavaScript时间日期格式转换

        Date.prototype.Format = function(formatStr) {
            var str = formatStr;
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            str = str.replace(/yyyy|YYYY/, this.getFullYear());
            str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
            str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
            str = str.replace(/M/g, (this.getMonth() + 1));
            str = str.replace(/w|W/g, Week[this.getDay()]);
            str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
            str = str.replace(/d|D/g, this.getDate());
            str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
            str = str.replace(/h|H/g, this.getHours());
            str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
            str = str.replace(/m/g, this.getMinutes());
            str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
            str = str.replace(/s|S/g, this.getSeconds());
            return str
        }


    // 8. 原生JavaScript判断是否为数字类型

        function isDigit(value) {
            var patrn = /^[0-9]*$/;
            if (patrn.exec(value) == null || value == "") {
                return false
            } else {
                return true
            }
        }


    // 9. 原生JavaScript设置cookie值

        function setCookie(name, value, Hours) {
            var d = new Date();
            var offset = 8;
            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            var nd = utc + (3600000 * offset);
            var exp = new Date(nd);
            exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
        }


    // 10. 原生JavaScript获取cookie值

        function getCookie(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]);
            return null
         }


    // 11. 原生JavaScript加入收藏夹

        function AddFavorite(sURL, sTitle) {
            try {
                window.external.addFavorite(sURL, sTitle)
            } catch(e) {
                try {
                    window.sidebar.addPanel(sTitle, sURL, "")
                } catch(e) {
                    alert("加入收藏失败，请使用Ctrl+D进行添加")
                }
            }
        }


    // 12. 原生JavaScript设为首页

        function setHomepage() {
            if (document.all) {
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage('http://www.jq-school.com')
            } else if (window.sidebar) {
                if (window.netscape) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                    } catch(e) {
                        alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
                    }
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', 'http://www.jq-school.com')
            }
        }


    // 13. 原生JavaScript判断IE6

        var ua = navigator.userAgent.toLowerCase(); var isIE6 = ua.indexOf("msie 6") > -1; if (isIE6) {
            try {
                document.execCommand("BackgroundImageCache", false, true)
            } catch(e) {}
        }


    // 14. 原生JavaScript加载样式文件

        function LoadStyle(url) {
            try {
                document.createStyleSheet(url)
            } catch(e) {
                var cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.type = 'text/css';
                cssLink.href = url;
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(cssLink)
            }
         }


    // 15. 原生JavaScript返回脚本内容

        function evalscript(s) {
                if(s.indexOf('<script') == -1) return s;
                var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
                var arr = [];
                while(arr = p.exec(s)) {
                        // var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
                        var arr1 = [];
                        arr1 = p1.exec(arr[0]);
                        if(arr1) {
                                appendscript(arr1[1], '', arr1[2], arr1[3]);
                        } else {
                                p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
                                arr1 = p1.exec(arr[0]);
                                appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
                        }
                }
                return s;
        }


    // 16. 原生JavaScript清除脚本内容

        function stripscript(s) {
                return s.replace(/<script.*?>.*?<\/script>/ig, '');
        }


    // 17. 原生JavaScript动态加载脚本文件

        function appendscript(src, text, reload, charset) {
                var id = hash(src + text);
                if(!reload && in_array(id, evalscripts)) return;
                if(reload && $(id)) {
                        $(id).parentNode.removeChild($(id));
                }

                evalscripts.push(id);
                var scriptNode = document.createElement("script");
                scriptNode.type = "text/javascript";
                scriptNode.id = id;
                scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
                try {
                        if(src) {
                                scriptNode.src = src;
                                scriptNode.onloadDone = false;
                                scriptNode.onload = function () {
                                        scriptNode.onloadDone = true;
                                        JSLOADED[src] = 1;
                                };
                                scriptNode.onreadystatechange = function () {
                                        if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                                                scriptNode.onloadDone = true;
                                                JSLOADED[src] = 1;
                                        }
                                };
                        } else if(text){
                                scriptNode.text = text;
                        }
                        document.getElementsByTagName('head')[0].appendChild(scriptNode);
                } catch(e) {}

        }


    // 18. 原生JavaScript返回按ID检索的元素对象

        function $(id) {
                return !id ? null : document.getElementById(id);
         }


    // 19. 原生JavaScript返回浏览器版本内容

        function browserVersion(types) {
                var other = 1;
                for(i in types) {
                        var v = types<i> ? types<i> : i;
                        if(USERAGENT.indexOf(v) != -1) {
                                var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');
                                var matches = re.exec(USERAGENT);
                                var ver = matches != null ? matches[2] : 0;
                                other = ver !== 0 && v != 'mozilla' ? 0 : other;
                        }else {
                                var ver = 0;
                        }
                        eval('BROWSER.' + i + '= ver');
                }
                BROWSER.other = other;
        }


    // 20. 原生JavaScript元素显示的通用方法

        function $(id) {
                return !id ? null : document.getElementById(id); } function display(id) {
                var obj = $(id);
                if(obj.style.visibility) {
                        obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
                } else {
                        obj.style.display = obj.style.display == '' ? 'none' : '';
                }
        }
