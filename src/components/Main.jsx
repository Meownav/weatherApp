import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"

const Main = ({ api, setters, props }) => {

  useEffect(() => {
    if (props.searchText.length == 0) {// if no search text provided, then load the browser location.
      navigator.geolocation.getCurrentPosition(
        (loc) => setters.setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })
      )
    }
  }, [])

  useEffect(() => {
    if (Object.entries(props.location).length !== 0) {// if location is not empty 
      if (props.searchText.length == 0) {// and if search text is not provided.
        axios.get(`${api.baseUrl}current.json?key=${api.key}&q=${props.location.latitude},${props.location.longitude}&aqi=yes`)
          .then(response => setters.setData(response))
          .catch(err => console.log(err))
      }
    }
  }, [props.location])

  useEffect(() => {// when searchText is changed(is provided.)
    if (props.searchText.length != 0) {// for first render.
      axios.get(`${api.baseUrl}current.json?key=${api.key}&q=${props.searchText}&aqi=yes`)
        .then(response => setters.setData(response))
        .catch(err => console.log(err))
    }
  }, [props.searchText])

  const [mouseHoverHumid, setMouseHoverHumid] = useState(false);
  const [mouseHoverWind, setMouseHoverWind] = useState(false);
  const [mouseHoverVisib, setMouseHoverVisib] = useState(false);
  const [mouseHoverPres, setMouseHoverPres] = useState(false);

  return (
    <div className='flex justify-center items-center p-8 mt-8 text-white'>
      <div className='weatherDetails flex-col rounded-lg w-[600px] h-[500px] 
      bg-[url("https://images.hdqwalls.com/wallpapers/abstract-lines-dark-4k-mg.jpg")] bg-cover'>
        <div className='dateHolder flex w-full justify-end text-xl font-bold p-4'>

          <div className='date'>
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        <div className='box flex w-full p-4 text-2xl justify-center'>
          <p className='locationName font-serif text-3xl hover:scale-110 ease-in-out '><b>
            {Object.entries(props.data).length === 0 ? "-_-" : props.data.data.location.region}
          </b>
          </p>
        </div>
        <div className='tempDetails flex item-center justify-center'>
          <img src={Object.entries(props.data).length === 0 ? "" : props.data.data.current.condition.icon} alt="Weather img" />
          <div className='temp flex px-10 items-center  text-4xl font-semibold justify-between' >
            <p className='flex p-4'>
              {Object.entries(props.data).length === 0 ? "" : props.data.data.current.temp_c}&#xb0;C
            </p>
            <p className='flex p-2 '>||</p>
            <p className='flex p-4'>
              {Object.entries(props.data).length === 0 ? "" : props.data.data.current.temp_f}&#xb0;F
            </p>
          </div>
        </div>

        <div className='otherDetails flex-row p-8 text-2xl font-semibold  '>
          <div className="flex p-2 justify-center"
            onMouseEnter={() => { setMouseHoverHumid(true) }}
            onMouseLeave={() => { setMouseHoverHumid(false) }}>
            {mouseHoverHumid ?
              (<p>Cloud Cover : {Object.entries(props.data).length === 0 ? "" : props.data.data.current.cloud}%</p>) :
              (<p>Humidity: {Object.entries(props.data).length === 0 ? "" : props.data.data.current.humidity}%</p>)
            }
          </div>

          <div className='flex p-2 justify-center'
            onMouseEnter={() => { setMouseHoverWind(true) }}
            onMouseLeave={() => { setMouseHoverWind(false) }}>
            {
              mouseHoverWind ?
                (<p>Gust : {Object.entries(props.data).length === 0 ? "" : props.data.data.current.gust_kph} kph</p>) :
                (<p>Wind : {Object.entries(props.data).length === 0 ? "" : props.data.data.current.wind_kph} kph</p>)
            }
          </div>

          <div className='flex p-2 justify-center'
            onMouseEnter={() => { setMouseHoverVisib(true) }}
            onMouseLeave={() => { setMouseHoverVisib(false) }}>
            {
              mouseHoverVisib ?
                (<p>Condition: {Object.entries(props.data).length === 0 ? "" : props.data.data.current.condition.text} </p>) :
                (<p>Visibility: {Object.entries(props.data).length === 0 ? "" : props.data.data.current.vis_km} km</p>)
            }
          </div>

          <div className='flex p-2 justify-center'
            onMouseEnter={() => { setMouseHoverPres(true) }}
            onMouseLeave={() => { setMouseHoverPres(false) }}>
            {mouseHoverPres ?
              (<p> PM-2.5 : {Object.entries(props.data).length === 0 ? "" : props.data.data.current.air_quality.pm2_5} </p>) :
              (< p > Pressure : {Object.entries(props.data).length === 0 ? "" : props.data.data.current.pressure_mb} mb</p>)
            }
          </div>

        </div>

      </div>
    </div >
  )
}

export default Main