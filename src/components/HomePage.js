import React, { useRef } from "react";
import {Link} from 'react-router-dom'
import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearchLocation } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { BiWind } from "react-icons/bi";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { TbTemperatureMinus } from "react-icons/tb";
import { TbTemperaturePlus } from "react-icons/tb";
import {BsFillCloudsFill} from "react-icons/bs"
import {BsSunFill} from "react-icons/bs"
import {BsFillCloudLightningRainFill} from "react-icons/bs"
import {BsCloudHaze2Fill} from "react-icons/bs"
import {GiBrainstorm} from "react-icons/gi"


const HomePage = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [error, setError]=useState("")
   const refElement = useRef("");
   const refElement2 = useRef("");
   const refElement3 = useRef("");
  
  
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const [data, setData] = useState({
    celcius: 24,
    name: "Bengaluru",
    country: "IN",
    humidity: 60,
    wind: 4,
    pressure: 1000,
    visibility:5000,
    min_temp: 24,
    max_temp: 27,
    image:"../images/clear.png",
    icon :<BsSunFill/>,
    weather : "Clear"
  });

  const handleChange = (e) => {
    setName(e.target.value);
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=6d082793194c6cf690e4e8eb0e8facb5&&units=metric`;
      axios
        .get(apiUrl)
        .then((response) => {
          let imagePath = "";
          let iconPath = "";
          if (response.data.weather[0].main === "Clear") {
            imagePath = "../images/clear.png";
            iconPath = <BsSunFill/>
          } else if (response.data.weather[0].main === "Clouds") {
            imagePath = "../images/cloud3.png";
            iconPath = <BsFillCloudsFill/>
          } else if (response.data.weather[0].main === "Rain") {
            imagePath = "../images/rain.png";
            iconPath = <BsFillCloudLightningRainFill/>
          } else if (response.data.weather[0].main === "Haze" || "Mist") {
            imagePath ="../images/Haze1.png";
            iconPath = <BsCloudHaze2Fill/>
          } else if (response.data.weather[0].main === "Drizzle") {
            imagePath = "../images/thanderstome.png";
            iconPath = <GiBrainstorm/>
          } else (
            imagePath = "../images/clear.png"
           
          )
          console.log(response.data.weather[0].main)
          console.log(response);
          
          setData({
            ...data,
            celcius: response.data.main.temp,
            name: response.data.name,
            country: response.data.sys.country,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            pressure: response.data.main.pressure,
            min_temp: response.data.main.temp_min,
            max_temp: response.data.main.temp_max,
            image: imagePath, icon:iconPath,weather:response.data.weather[0].main,
            visibility:response.data.visibility,
          });
          setError(" ");
          refElement.current.style.width=`${data.humidity}%`;
          refElement2.current.style.width=`${data.min_temp}%`;
          refElement3.current.style.width=`${data.min_temp}%`;
          
        })
        .catch((err)=>{
          if(err.response.status === 404){
            setError("Invalid City Name")
          } else{
            setError(" ");
          }
          console.log(err);
        })
         
        
    }

  };



  return (
    <>
    <div className="m-page">
      <div className="m-container">
        <div className="m-container-left">
          <div className="img-container">
            <img src={data.image} className="image" alt="" />
            
          </div>
          <div className="location-container">
            <h3>
              {data.name},{data.country}
            </h3>
          </div>
          <div className="date">
            <span className="c-time"> {date.toLocaleTimeString()}</span>
            <span className="c-date">
              {date.toLocaleString("en-US", { day: "2-digit" })}{" "}
              {date.toLocaleString("en-US", { month: "long" })}{" "}
              {date.getFullYear()}
            </span>
          </div>
        </div>
        <div className="m-container-right">
          <div className="header">
            <div>
            <input
              type="text"
              placeholder="Search a city"
              className="search-input"
              onChange={(e) => setName(e.target.value)}
            />
            <button className="search-btn" onClick={handleChange}>
              <FaSearchLocation className="location-symbol" />
            </button>
            <Link to="/login" className="login">Login</Link>
            </div>
           
            <div className="error">
              <span>{error}</span>
            </div>
          </div>
          <div className="temperature">
            
            <div className="temp-container">
            <h1 className="temp">{Math.round(data.celcius)}°c</h1>
            <h1 className="location-name">{data.name}</h1>
            
            </div>
           <div>
           <div className="main-icons">{data.icon}</div>
           <p className="weather-details">{data.weather}</p>
           </div>
            
          </div>
          <div className="additional-data">
            <div className="row1">
              
              <div className="data">
                <div className="top-row">
                  <span>Wind</span>
                  <div className="icon-container">
                    <BiWind className="icon" />
                  </div>
                </div>
                <div className="main-data-container">
                  <p className="main-data">{Math.round(data.wind)}Km/hr</p>
                </div>
              </div>
              <div className="data">
                <div className="top-row">
                  <span>Pressure</span>
                  <div className="icon-container">
                    <FaCompressArrowsAlt className="icon" />
                  </div>
                </div>
                <div className="main-data-container">
                  <p className="main-data">{data.pressure} hpa</p>
                </div>
                <div>
                  <p></p>
                </div>
              </div>
              <div className="data">
                <div className="top-row">
                  <span>Visibility</span>
                  <div className="icon-container">
                    <MdVisibility className="icon" />
                  </div>
                </div>
                <div className="main-data-container">
                  <p className="main-data">{data.visibility}</p>
                </div>
              </div>
            </div>
            
            <div className="row2">
            <div className="data">
                <div className="top-row">
                  <span>Humidity</span>
                  <div className="icon-container">
                    <WiHumidity className="icon" />
                  </div>

                </div>
                <div className="main-data-container">
                  <p className="main-data">{data.humidity}%</p>
                </div>
                <div className="range">
                  <div ref={refElement} className="range-color">

                  </div>
                </div>
              </div>
             
              <div className="data">
                <div className="top-row">
                  <span>Min-temp</span>
                  <div className="icon-container">
                    <TbTemperatureMinus className="icon" />
                  </div>
                </div>
                <div className="main-data-container">
                  <p className="main-data">{Math.round(data.min_temp)}°c</p>
                </div>
                <div className="range">
                  <div ref={refElement2} className="range-color">

                  </div>
                </div>
              </div>
              <div className="data">
                <div className="top-row">
                  <span>Max-temp</span>
                  <div className="icon-container">
                    <TbTemperaturePlus className="icon" />
                  </div>
                </div>
                <div className="main-data-container">
                  <p className="main-data">{Math.round(data.max_temp)}°c</p>
                </div>
                <div className="range">
                  <div ref={refElement3} className="range-color">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    </>
  );
};

export default HomePage;
