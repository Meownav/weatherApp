import React from 'react'
import { useState, useEffect } from 'react';

const Nav = ({ searchText, setSearchText }) => {


  return (
    <div className='flex px-8 items-center justify-between
     bg-[url("https://1.bp.blogspot.com/-FqUWhtyNp3k/UF2zfLn-rrI/AAAAAAAAAJc/JaGPd3wP2lg/w1200-h630-p-k-no-nu/Grey-abstract-Wallpaper.png")]
     bg-cover rounded-full m-8 font-mono'>
      <h1 className='text-6xl text-black font-fira-sans '>
        Logo
      </h1>
      <nav className='flex text-black p-2 font-bold '>
        <ul className='flex text-2xl'>
          <li className='m-4'><a href="https://www.accuweather.com/">AccuWeather</a></li>
          <li className='m-4'><a href="https://weather.com/">TheWeatherChannel</a></li>
          <li className='m-4'><a href="https://weatherspark.com/">WeatherSpark</a></li>
        </ul>
      </nav>
      <div className='text-2xl font-bold p-4 '>
        <input id='searchBar' className='font-sans rounded-full px-4 py-2' placeholder='Search Locations...'>
        </input>
        <button type='submit'
          onClick={() => {
            setSearchText(document.getElementById("searchBar").value);
            document.getElementById("searchBar").value = "";
          }}>
          Search
        </button>
      </div>
    </div >
  )
}

export default Nav