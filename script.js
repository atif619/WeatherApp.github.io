let cityName = document.querySelector('.cityName');
let date = document.querySelector('.date');
let myImage = document.querySelector('.image');
let btn = document.querySelector('.btn');
let currTemp = document.querySelector('.currTemp');
let climateType = document.querySelector('.climate_type');
let windSpeed = document.querySelector('.wind_speed');
let humidPer = document.querySelector('.humid_per');
let minmaxDeg = document.querySelector('.minmax_deg');
let input = document.querySelector('.input');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(input.value);
    input.value = "";
})



const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c52a0384581d5f20635ce6bae9d4af1`);

        const myData = await response.json();
        const { name } = myData;
        const { feels_like, temp_max, temp_min, humidity } = myData.main;
        const { id, description } = myData.weather[0];
        const { country } = myData.sys;
        const { speed } = myData.wind;

        cityName.innerHTML = `${name}, ${country}`;
        climateType.innerHTML = description;
        currTemp.innerHTML = `${Math.round(feels_like - 273)}&deg;C`;
        minmaxDeg.innerHTML = `${Math.round(temp_max - 273)}&deg;C / ${Math.round(temp_min - 273)}&deg;C`;
        humidPer.innerHTML = `${humidity}%`;
        windSpeed.innerHTML = `${speed} km/h`
        // console.log(myData);


        if (id >= 200 && id < 300) {
            document.body.style.backgroundImage = 'url(images/thunderstorm_background.jpg)';
            myImage.src = "images/thunderstorm.png";
        }
        else if (id >= 300 && id < 400) {
            document.body.style.backgroundImage = 'url(images/rain_background.jpg)';
            myImage.src = "images/rain.png";
        }
        else if (id >= 500 && id < 600) {
            document.body.style.backgroundImage = 'url(images/rain_background.jpg)';
            myImage.src = "images/rain.png";
        }
        else if (id >= 600 && id < 700) {
            document.body.style.backgroundImage = 'url(images/snow_background.jpg)';
            myImage.src = "images/snow.png";
        }
        else if (id < 800 && id >= 700) {
            document.body.style.backgroundImage = 'url(images/cloudy_background.jpg)';
            myImage.src = "images/mist.png";
        }
        else if (id >= 200 && id < 300) {
            document.body.style.backgroundImage = 'url(images/thunderstorm_background.jpg)';
            myImage.src = "images/thunderstorm.png";
        }
        else if (id == 800) {
            document.body.style.backgroundImage = 'url(images/clear_background.jpg)';
            myImage.src = "images/sun.png";
        }
        else if (id > 800) {
            document.body.style.backgroundImage = 'url(images/cloudy_background.jpg)';
            myImage.src = "images/clouds.png";
        }
    }


    catch (err) {
        alert('city not found');
    }
}




window.addEventListener('load', function () {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            long = pos.coords.longitude;
            console.log(long);
            lat = pos.coords.latitude;
            console.log(lat);

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7c52a0384581d5f20635ce6bae9d4af1`
            fetch(api)
                .then((res) => res.json())
                .then((data) => {
                    const { name } = data;
                    const { feels_like, temp_max, temp_min, humidity } = data.main;
                    const { id, description } = data.weather[0];
                    const { country } = data.sys;
                    const { speed } = data.wind;
                    cityName.innerHTML = `${name}, ${country}`;
                    climateType.innerHTML = description;
                    currTemp.innerHTML = `${Math.round(feels_like - 273)}&deg;C`;
                    minmaxDeg.innerHTML = `${Math.round(temp_max - 273)}&deg;C / ${Math.round(temp_min - 273)}&deg;C`;
                    humidPer.innerHTML = `${humidity}%`;
                    windSpeed.innerHTML = `${speed} km/h`
                    // ccode.innerHTML = country;


                    if (id >= 200 && id < 300) {
                        document.body.style.backgroundImage = 'url(images/thunderstorm_background.jpg)';
                        myImage.src = "images/thunderstorm.png";
                    }
                    else if (id >= 300 && id < 400) {
                        document.body.style.backgroundImage = 'url(images/rain_background.jpg)';
                        myImage.src = "images/rain.png";
                    }
                    else if (id >= 500 && id < 600) {
                        document.body.style.backgroundImage = 'url(images/rain_background.jpg)';
                        myImage.src = "images/rain.png";
                    }
                    else if (id >= 600 && id < 700) {
                        document.body.style.backgroundImage = 'url(images/snow_background.jpg)';
                        myImage.src = "images/snow.png";
                    }
                    else if (id < 800 && id >= 700) {
                        document.body.style.backgroundImage = 'url(images/cloudy_background.jpg)';
                        myImage.src = "images/mist.png";
                    }
                    else if (id >= 200 && id < 300) {
                        document.body.style.backgroundImage = 'url(images/thunderstorm_background.jpg)';
                        myImage.src = "images/thunderstorm.png";
                    }
                    else if (id == 800) {
                        document.body.style.backgroundImage = 'url(images/clear_background.jpg)';
                        myImage.src = "images/sun.png";
                    }
                    else if (id > 800) {
                        document.body.style.backgroundImage = 'url(images/cloudy_background.jpg)';
                        myImage.src = "images/clouds.png";
                    }


                    let todayDate = new Date();
                    console.log(todayDate);
                    date.innerHTML = dateManage(todayDate);

                })
        })
    }
})


function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${day} | ${date} ${month} | ${year}`;

}
