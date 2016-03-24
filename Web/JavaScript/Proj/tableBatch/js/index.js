$(document).ready(function () {
    var shopBody = {
        dom: "",
        dataList: [],
        shopNum: 0,
        helper: [],

        /**
         * 初始化
         * @param  {Array} dataList 商店数据
         * @return {Object}          商店对象本身(链式模式)
         */
        init: function (dataList) {
            this.dom = $('#shop_tableBody');
            this.dataList = dataList;
            this.shopNum = dataList.length;
            return this;
        },
        /**
         * 基本模板引擎: 根据 dataList 中数据，渲染表格
         * @param  {Array} dataList 商店数据
         * @return {Object}         商店对象本身(链式模式)
         */
        template: function template(dataList) {
            if (this.dom === "") {
                return this;
            }

            this.helper = [];

            for (var i = 0;i < this.shopNum;i++) {
                this.helper.push("<tr>");
                this.helper.push("<td>" + dataList[i].name + "</td>");
                this.helper.push("<td>" + dataList[i].description + "</td>");
                this.helper.push("<td>" + dataList[i].openTime.start + " : 00 - " + dataList[i].openTime.over + " : 00" + "</td>");
                this.helper.push("<td>" + dataList[i].orderLink + "</td>");
                this.helper.push("</tr>");
            }

            this.dom.html(this.helper);
            return this;
        },
        /**
         * 删除模板引擎，用于渲染删除状态时的表格，为表格每一项添加删除选项
         * @param  {Array} dataList 商店数据
         * @return {Object}         商店对象本身(链式模式)
         */
        delTemplate: function delTemplate(dataList) {
            if (this.dom === "") {
                return this;
            }

            this.helper = [];

            for (var i = 0;i < this.shopNum;i++) {
                this.helper.push("<tr>");
                this.helper.push("<td>" + "<input type='checkbox' class='deleteBox' name='deleteBox' value='0'>" + dataList[i].name + "</td>");
                this.helper.push("<td>" + dataList[i].description + "</td>");
                this.helper.push("<td>" + dataList[i].openTime.start + " : 00 - " + dataList[i].openTime.over + " : 00" + "</td>");
                this.helper.push("<td>" + dataList[i].orderLink + "</td>");
                this.helper.push("</tr>");
            }

            this.dom.html(this.helper);
            return this;
        },
        /**
         * 从 dataList 中删除被选中的商店项
         * @return {Object}         商店对象本身(链式模式)
         */
        deleteShop: function () {
            if (this.dom === "") {
                return this;
            }

            for (var i = 0;i < this.shopNum;i++) {
                if (this.dataList[i].tobeDel == true) {
                    this.dataList.splice(i, 1);
                    i--;
                    this.shopNum = this.dataList.length;
                }
            }

            return this;
        }
    };

    var initDataList = [
        {
            name: "1",
            description: "No.1 Shop",
            openTime: {
                start: 8,
                over: 18
            },
            orderLink: "No.1 Order",
            tobeDel: false
        },
        {
            name: "2",
            description: "No.2 Shop",
            openTime: {
                start: 8,
                over: 18
            },
            orderLink: "No.2 Order",
            tobeDel: false
        },
        {
            name: "3",
            description: "No.3 Shop",
            openTime: {
                start: 8,
                over: 18
            },
            orderLink: "No.3 Order",
            tobeDel: false
        },
        {
            name: "4",
            description: "No.4 Shop",
            openTime: {
                start: 8,
                over: 18
            },
            orderLink: "No.4 Order",
            tobeDel: false
        },
        {
            name: "5",
            description: "No.5 Shop",
            openTime: {
                start: 8,
                over: 18
            },
            orderLink: "No.5 Order",
            tobeDel: false
        },
    ],
        deleteBtn = $('#deleteBtn'),
        confirmBtn = $('#confirmBtn');

    shopBody.init(initDataList);
    shopBody.template(shopBody.dataList);

    deleteBtn.click(function () {
        shopBody.delTemplate(shopBody.dataList);
        confirmBtn.removeClass('hidden');
        deleteBtn.addClass('hidden');
    });

    confirmBtn.click(function () {
        var shopCheckBox = $('.deleteBox');

        for (var i = 0;i < shopBody.shopNum;i++) {
            if (shopCheckBox[i].checked == 1) {
                shopBody.dataList[i].tobeDel = true;
            }
        }

        shopBody.deleteShop();
        shopBody.template(shopBody.dataList);
        deleteBtn.removeClass('hidden');
        confirmBtn.addClass('hidden');
    });
});
