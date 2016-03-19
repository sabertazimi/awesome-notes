$(document).ready(function () {
    // 利用即时匿名函数,创建命名空间
    (function (global) {
        var $chatThread = $(".chat-thread"),
            $inputAnchor = $(".chat-anchor")
            $inputBtn = $("#chatInputBtn"),
            $input = $("#chatInput"),
            inputText = $input.val(),
            inputHistory = [""],
            getMessageHistory = [""],
            inputMessageCallBack = function (e) {
                inputText = $input.val();

                // XMLHttpRequest POST

                // XMLHttpRequest GET

                $chatThread.append('<li class="local">' + inputText + '</li>');

                // 重新聚焦输入框, 并自动滚动至页面底部
                $input.focus();

                // FIX ME: 无效
                $inputAnchor.click();
            };

        $inputBtn.click(inputMessageCallBack);

        // $(input).input(keyboard === 'space' => inputBtnCallBack)

    }(this));
});
