import React, { useState, useRef } from "react"
import Image from "next/image"

// Icons
import { FaMapMarkerAlt } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import { BsWater } from "react-icons/bs"
import { FiWind } from "react-icons/fi"

export default function Home() {

  const containerRef = useRef<HTMLDivElement>(null)
  const weatherBoxRef = useRef<HTMLDivElement>(null)
  const weatherDetailsRef = useRef<HTMLDivElement>(null)
  const error404Ref = useRef<HTMLDivElement>(null)
  const temperatureRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const humidityRef = useRef<HTMLDivElement>(null)
  const windRef = useRef<HTMLDivElement>(null)

  const [city, setCity] = useState<string>("")
  const [weatherImage, setWeatherImage] = useState<string>("")

  const handleChange = (event: any) => {
    setCity(event.target.value)
  }

  const handleClick = () => {
    // Empty imput value
    if(city === "")
      return

    // Fetching data from Open Weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API}`)
      .then(response => response.json())
      .then(json => {
        if(json.cod === '404'){
          containerRef.current!.style.height = "25rem"
          weatherBoxRef.current!.className = "hidden"
          weatherDetailsRef.current!.className = "hidden"
          error404Ref.current!.className = "fadeIn flex w-full h-full items-center justify-center"
          return
        }

        error404Ref.current!.className = "hidden"

        // Getting image by weather
        const realtimeWeather: string = json.weather[0].main,
            defaultSource = "No sources available."
        
        const sources: { [key: string]: string } = {
          "Clear": "/images/clear.png",
          "Clouds": "/images/clear.png",
          "Mist": "/images/mist.png",
          "Rain": "/images/rain.png",
          "Snow": "/images/snow.png",
        }

        setWeatherImage(sources[realtimeWeather] || defaultSource)

        // Setting weather infos
        temperatureRef.current!.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        descriptionRef.current!.innerHTML = `${json.weather[0].description}`
        humidityRef.current!.innerHTML = `${json.main.humidity}%`
        windRef.current!.innerHTML = `${parseInt(json.wind.speed)}Km/h`

        weatherBoxRef.current!.className = "fadeIn flex-col item-center justify-center"
        containerRef.current!.style.height = "35rem"
      })
  }

  return (
    <div className="container relative w-400 h-110 bg-darkless px-7 py-8 overflow-hidden rounded-2xl transition-all ease-out duration-500" ref={containerRef}>
        <div className="search-box w-full h-min flex items-center justify-between">
            <FaMapMarkerAlt className="absolute text-primary text-2xl"/>
            <input type="text" onChange={handleChange} value={city} placeholder="Enter your location" className="w-[80%] text-2xl font-medium uppercase outline-none pl-8 bg-darkless placeholder:text-xl placeholder:text-light placeholder:capitalize"/>
            <button onClick={handleClick} className="group w-50 h-50 flex items-center justify-center bg-primary-opacity-50 rounded-[50%] transition-all ease-out cursor-pointer hover:bg-primary"><BiSearch className="text-xl text-primary transition-all ease-out group-hover:text-light"/></button>
        </div>
        <div className="not-found hidden scale-0 opacity-0" ref={error404Ref}>
            <p className="text-primary text-lg font-medium mb-6 text-center">Oops! Invalid location :/</p>
        </div>
        <div className="weather-box" ref={weatherBoxRef}>
            <div className="wether-image flex items-center justify-center">
              <Image src={weatherImage} alt="" width={150} height={0} className=""/>
            </div>
            <p className="temperature relative text-light text-6xl text-center font-extrabold mt-7 -ml-4" ref={temperatureRef}></p>
            <p className="description text-center text-gray text-lg" ref={descriptionRef}></p>
        </div>
        <div className="weather-details" ref={weatherDetailsRef}>
            <div className="humidity" ref={humidityRef}>
                <BsWater/>
                <div className="text">
                    <span></span>
                    <p>Humidity</p>
                </div>
            </div>
            <div className="wind" ref={windRef}>
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