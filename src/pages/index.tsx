import React, { useState, useEffect } from "react"

// Icons
import { FaMapMarkerAlt } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import { BsWater } from "react-icons/bs"
import { FiWind } from "react-icons/fi"

// Images
import Image from "next/image"
import notFound  from "../../public/images/404.png"

export default function Home() {

  const [city, setCity] = useState<string>("")

  const handleChange = (event: any) => {
    setCity(event.target.value)
  }

  const handleClick = () => {
    if(city === "")
      return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API}`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if(json.cod === '404'){
          return
        }
      })
  }

  return (
    <div className="container relative w-400 h-110 bg-darkless px-7 py-8 overflow-hidden rounded-2xl transition ease-out delay-[0.6s]">
        <div className="search-box w-full h-min flex items-center justify-between">
            <FaMapMarkerAlt className="absolute text-primary text-2xl"/>
            <input type="text" onChange={handleChange} value={city} placeholder="Enter your location" className="w-[80%] text-2xl font-medium uppercase outline-none pl-8 bg-darkless placeholder:text-xl placeholder:text-light placeholder:capitalize"/>
            <button onClick={handleClick} className="group w-50 h-50 flex items-center justify-center bg-primary-opacity-50 rounded-[50%] transition-all ease-out cursor-pointer hover:bg-primary"><BiSearch className="text-xl text-primary transition-all ease-out group-hover:text-light"/></button>
        </div>
        <div className="not-found">
            <Image src={notFound} alt=""/>
            <p>Oops! Invalid location :/</p>
        </div>
        <div className="weather-box text-center">
            <img src="" className="w-[60%] mt-8"/>
            <p className="temperature"></p>
            <p className="description"></p>
        </div>
        <div className="weather-details">
            <div className="humidity">
                <BsWater/>
                <div className="text">
                    <span></span>
                    <p>Humidity</p>
                </div>
            </div>
            <div className="wind">
                <FiWind/>
                <div className="text">
                    <span></span>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>
    </div>
  )
}