import React from 'react'
import Nav from './components/Nav'
import Main from './components/Main'

import { useEffect, useState } from "react";
import axios from "axios"

const App = () => {

  const api = {
    key: "9f53035e4c4e4dd8ae6151650221409",
    baseUrl: "https://api.weatherapi.com/v1/"
  };

  const [location, setLocation] = useState({});
  const [data, setData] = useState({});
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <Nav searchText={searchText} setSearchText={setSearchText}
      />
      <Main api={api}
        setters={{ setLocation: setLocation, setData: setData, setSearchText }}
        props={{ location: location, data: data, searchText}}
      />
    </div>
  )
}

export default App