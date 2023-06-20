import "./home.css";
import React from "react";
import { useState } from "react";
import axios from "../API/axios";
import SpeedIcon from '@mui/icons-material/Speed';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';


export default function Home() {
    const [city, setCity] = useState("Chennai");
    const [data, setData] = useState("");
    const KEY = "2872c377a4855531062b4fa81b45c4e";
    const handleSubmit = async () => {
        try {
            const response = await axios.get(`/weather?q=${city}&appid=c${KEY}`)
            setData(response.data);
            console.log(data);
        }
        catch (err) {
            alert("enter correctly")
        }



    }

    return (

        <div className="container">
            <div className="input-container">
                <input type="text" className="input" placeholder="Enter City here..." onChange={(event) => setCity(event.target.value)}></input>
                <button onClick={handleSubmit} className="btn">Search</button><br />
            </div>
            {data && (
                <div className="weather-info">
                   
                    <h1 className="info">{data.name},{data.sys.country}</h1>
                    {/* <span className="info" style={{ fontSize: "10px", display: "flex", justifyContent: "center" }}>Friday,march 13,2023 at 10:23pm </span> */}
                    <div className="weather-status">
                        <p className="cloud">{data.weather[0].main}</p>
                        <div className="icon">
                            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="icon"></img>
                        </div>
                    </div>
                    <div className="weather-temp">
                        <h1>{Math.round((data.main.temp)-273.15)}°C</h1>

                        <div className="max-min">
                            <span style={{ fontSize: "12px" }}>Min:{Math.round((data.main.temp_min)-273.15)}°C</span>
                            <span style={{ fontSize: "12px" }}>Max:{Math.round((data.main.temp_max)-273.15)}°C</span>
                        </div>


                    </div>
                    <div className="weather-control">
                            <div className="cards">
                                <div className="icon-details">
                                <ThermostatIcon style={{fontSize:"35px"}}/>
                                </div>
                                <div>
                                <p>Real feel</p>
                                <p>{Math.round((data.main.feels_like)-273.15)}°C</p>
                                </div>
                            </div>
                            <div className="cards">
                                <div className="icon-details">
                                <WaterDropIcon style={{fontSize:"35px"}}/>
                                </div>
                                <div>
                                <p>Humidity</p>
                                <p>{data.main.humidity}%</p>
                                </div>
                            </div>
                            <div className="cards">
                                <div className="icon-details">
                                <AirIcon style={{fontSize:"35px"}}/>
                                </div>
                                <div>
                                <p>Wind</p>
                                <p>{data.wind.speed} m/s</p>
                                </div>
                            </div>
                            <div className="cards">
                                <div className="icon-details">
                                <SpeedIcon style={{fontSize:"35px"}}/>
                                </div>
                                <div>
                                <p>Pressure</p>
                                <p>{data.main.pressure} hpa</p>
                                </div>
                            </div>

                        

                    </div>



                </div>)}

        </div>
    )


}