var utils = {
    // remove alpha between num
    toNum: function (num) {
        return parseInt(Array.prototype.filter.call(num.toString(10), function (item) {
            return item >= '0' && item <= '9';
        }).join(''));
    },
    // delay function
    sleep: function (numberMillis) {
        var now = new Date(),
            exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
            return this;
        }
    },
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
};
