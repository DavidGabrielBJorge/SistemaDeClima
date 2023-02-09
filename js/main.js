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
const errorMessageInput = document.querySelector("#message-error");
const errorMessageServer = document.querySelector("#message-error-server");
const weatherContainer = document.querySelector("#data-weather");

//Funções
//Por ser uma API sua função deve ser assíncrona, pois os dados podem demorar para carregar
const getWeatherData = async(city)=>{
    const apiWeatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res= await fetch(apiWeatherURL);
    const data = await res.json();
    
    if(data.cod == "404"){
        weatherContainer.classList.add("hide");
        errorMessageInput.classList.remove("hide");
    }
    else if(data.cod == "502"){
        weatherContainer.classList.add("hide");
        errorMessageInput.classList.add("hide");
        errorMessageServer.classList.remove("hide");
    }
    else{
    console.log(data.name)
    console.log(data.main.temp)
    console.log(data.sys.country)
    return(data)
    }
    
};

//Deve ser asyc para esperar os dados da API
const showWeatherData = async (city) =>{
    errorMessageInput.classList.add("hide");
    errorMessageServer.classList.add("hide");
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);//Fazer com que a temperatura tenha valores arredondados
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src",apiCountryURL+data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`

    weatherContainer.classList.remove("hide");//Vai remover a classe hide, mostrando os dados
    
    
};

//Eventos
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();//impedir de recarregar a tela

    const city = cityInput.value;
    showWeatherData(city);
})

cityInput.addEventListener("keyup",(e)=>{
    if(e.code=="Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
})