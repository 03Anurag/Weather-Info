const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=lakhisarai&appid=3e82d06ecabb6b5b618111ca91315f84&units=metric"
let area;

const city = document.querySelector(".inp");
const btn = document.querySelector("button");

const info = document.querySelector(".info");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".windspeed")



btn.addEventListener('click',()=>{
    area = city.value;
    if(area.trim() === ''){
        alert("Enter a valid input");
        return
    }
    getData(area)

    city.value='';
})

async function getData(city){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e82d06ecabb6b5b618111ca91315f84&units=metric`);

    if(res.status === 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".Data").style.display = "none"
    }
    else{
        document.querySelector(".error").style.display = "none"
        document.querySelector(".Data").style.display = "block"
        const data = await res.json()
        showDetails(data);
    }
}

function showDetails(data){
   const temp = Math.round(data.main.temp);
   const humid = data.main.humidity;
   const speed = data.wind.speed;
   const condition =checkweather(data.weather[0].main)
   
   info.innerHTML = `
   <img src="${condition}.png" alt="clear">
   <p>${temp}°C</p>
   <h1>${data.name}</h1>
   `
   humidity.innerHTML = `
   <img src="humidity.png" alt="humidity">
    <div>
        <p>${humid}%</p>
        <p>Humidity</p>
    </div>
   `

   windspeed.innerHTML=`
   <img src="wind.png" alt="windspeed">
    <div>
        <p>${speed}km/h</p>
        <p>Wind Speed</p>
    </div>
   `
}


function checkweather(name){
    const text = name.toLowerCase();
    if(text === "clear"){
        return "clear"
    }else if(text==="clouds"){
        return "clouds"
    }else if(text==="drizzle"){
        return "drizzle"
    }else if(text==="rain"){
        return "rain"
    }else if(text==="mist"){
        return "mist"
    }else if(text==="snow"){
        return "snow"
    }
    else{
        return "clear"
    }
}