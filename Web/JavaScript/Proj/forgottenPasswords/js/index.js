$(document).ready(function () {
    var $startBtn = $(".btn-forgotten"),
        $mobileBtn = $(".btn-mobile"),
        $idcardBtn = $(".btn-idcard"),
        $mobileForm = $("#mobileForm"),
        $idcardForm = $("#idcardForm"),
        $mainBody = $(".forgotten-main");

        $startBtn.click(function () {
            $startBtn.addClass("hidden");
            $mobileBtn.removeClass("hidden");
            $idcardBtn.removeClass("hidden");
        });

        $mobileBtn.click(function () {
            $idcardBtn.addClass("hidden");
            $mobileBtn.addClass("hidden");
            $mainBody.removeClass("hidden");
            $mobileForm.removeClass("hidden");
        });

        $idcardBtn.click(function () {
            $mobileBtn.addClass("hidden");
            $idcardBtn.addClass("hidden");
            $mainBody.removeClass("hidden");
            $idcardForm.removeClass("hidden");
        });
});
