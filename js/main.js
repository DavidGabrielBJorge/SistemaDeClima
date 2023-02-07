//Variáveis
const apiKey = "ec9d29cdb9e9b203b278d6c1e2b4f8e6";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

//Funções
//Por ser uma API sua função deve ser assíncrona, pois os dados podem demorar para carregar
const getWeatherData = async(city)=>{
    const apiWeatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res= await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data.name)
    console.log(data.main.temp)
    console.log(data.sys.country)
    return(data)
};

//Deve ser asyc para esperar os dados da API
const showWeatherData = async (city) =>{
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);//Fazer com que a temperatura tenha valores arredondados
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src",apiCountryURL+data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`

};

//Eventos
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();//impedir de recarregar a tela

    const city = cityInput.value;
    showWeatherData(city);
})