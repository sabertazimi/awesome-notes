var utils = {
        // validate number format
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
        }
    };
