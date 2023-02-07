//Variáveis
const apiKey = "ec9d29cdb9e9b203b278d6c1e2b4f8e6";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("temperature span");
const descElement = document.querySelector("#description");
const weatherElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

//Funções
//Por ser uma API sua função deve ser assíncrona, pois os dados podem demorar para carregar
const getWeatherData = async(city)=>{
    const apiWeatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res= await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data)
};

const showWeatherData = (city) =>{
    getWeatherData(city);
};



//Eventos
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();//impedir de recarregar a tela

    const city = cityInput.value;
    showWeatherData(city);
})