var utils = {
    format: {
        // remove alpha between num
        toNum: function (num) {
            return parseInt(Array.prototype.filter.call(num.toString(10), function (item) {
                return item >= '0' && item <= '9';
            }).join(''));
        }
    },
    timing: {
        // delay function
        sleep: function (numberMillis) {
            var now = new Date(),
                exitTime = now.getTime() + numberMillis;
            while (true) {
                now = new Date();
                if (now.getTime() > exitTime)
                return this;
            }
        }
    },
    string: {
        leftpad: function (str, len, ch) {
            var i = -1;

            // handle users' input - don't trust users' input
            str = String(str);
            len = len - str.length;
            if (!ch && ch !== 0) ch = ' ';

            while (++i < len) {
                str = ch + str;
            }
            return str;
        }
    },
    canvas: {
        // 根据参数画线
        drawLine: function drawLine(fromX, fromY, toX, toY) {
        	context.moveTo(fromX, fromY);
        	context.lineTo(toX, toY);
        	context.stroke();
        },
        // 根据参数画圆
        drawCircle: function drawCircle(x, y, radius, color) {
        	context.fillStyle = color;
        	context.beginPath();
        	context.arc(x, y, radius, 0, Math.PI*2, true);
        	context.closePath();
        	context.fill();
        	context.stroke();
        },
        // 改变 canvas 中图形颜色
        changeColor: function changeColor(color){
        	context.fillStyle = color;
        	context.fill();
        }
    }
};
