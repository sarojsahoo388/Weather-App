import React from 'react';
import {useState} from "react"
import "./Weather.css";
import search_icons from "../Icons/search.png";
import clear_icons from "../Icons/clear.png";
import cloud_icons from "../Icons/cloud.png";
import drizzle_icons from "../Icons/drizzle.png";
import rain_icons from "../Icons/rain.png";
import snow_icons from "../Icons/snow.png";
import wind_icons from "../Icons/wind.png";
import humidity_icons from "../Icons/humidity.png";


export default function Weather () {

    let api_key ="dd94f859a0e52d6e4767fddf735f04a7";

    const [wicon,setWicon] = useState (cloud_icons); 

 async function search (){
    const element = document.getElementsByClassName("cityinput");
    if(element[0].value===""){
        return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;


    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity+"%";
    wind[0].innerHTML = data.wind.speed+"KM/H";
    temp[0].innerHTML = data.main.temp + "°C";
    location[0].innerHTML = data.name;


    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear_icons);
    }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloud_icons);
    }else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzle_icons)
    }else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzle_icons)
    }else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain_icons)
    }else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(rain_icons)
    }else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow_icons)
    }else{
        setWicon(clear_icons)
    }

}


    return(
        <div className='container'>
            <div className='top-bar'>
                <input className='cityinput' type='text' placeholder='Search'/>
                <div className='search-icon' onClick={()=>{search()}}>
                    <img  src={search_icons} />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} width="130px"/>
            </div>
            <div className='weather-temp'>24°C</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icons}className='icon'/>
                    <div className='data'>
                       <div className='humidity-percent'>64%</div> 
                       <div className='text'> Humidity</div>
                    </div>
                </div> 
                <div className='element'>
                    <img src={wind_icons}className='icon'/>
                    <div className='data'>
                       <div className='wind-rate'>18 km/h</div> 
                       <div className='text'> Wind Speed</div>
                    </div>
                </div> 
            </div>
        </div>
    )
}