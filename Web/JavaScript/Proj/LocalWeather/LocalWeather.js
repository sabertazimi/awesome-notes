window.onload = function localWeather() {

    var request = new XMLHttpRequest(),
        newR = new XMLHttpRequest(),
        position = document.getElementById("position"),
        temperature = document.getElementById("temperature"),
        weather = document.getElementById("weather");

    request.open("GET",
        "https://api.heweather.com/x3/weather?cityid=CN101200101&key=5dfa550a0ff54a19a9bd254206dafbd9",
        true);
    request.onreadystatechange = function () {

        if (request.readyState === 4) {
            // change json to javascript object
            var obj = JSON.parse(request.responseText);
            // parse whole weather information
            obj = obj["HeWeather data service 3.0"][0];

            position.childNodes[0].nodeValue = obj.basic.city + ", " + obj.basic.cnty;
            temperature.childNodes[0].nodeValue = obj.now.tmp + " ℃";

            newR.open("GET",
                "https://api.heweather.com/x3/condition?search=allcond&key=5dfa550a0ff54a19a9bd254206dafbd9",
                true);

            newR.onreadystatechange = function () {
                if (newR.readyState === 4) {
                    var objR = JSON.parse(newR.responseText);
                    // parse target weather
                    objR = objR.cond_info.filter((item) =>
                        {return item.code === obj.now.cond.code});
                    objR = objR[0];
                    console.log(objR);
                    weather.childNodes[0].nodeValue = objR.txt + " - ";
                    weather.childNodes[1].src = objR.icon;
                }
            };

            newR.send(null);
                }
            };
            request.send(null);
};
