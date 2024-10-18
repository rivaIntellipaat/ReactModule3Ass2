import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import icon from './assets/icon.png';
import wind from './assets/windy.png';
import vec from './assets/Vector.png';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [background, setBackground] = useState('sunny');

  const apiKey = 'bcd7e0bcd04351d3722ac7bd9d97bbc8';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = async () => {
    if (location) {
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        toast.error('City not found. Please try again.'); // Show toast on error
        setData({}); // Clear previous data
      }
      setLocation(''); // Clear the input after searching
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  useEffect(() => {
    if (data.weather) {
      const weatherCondition = data.weather[0].main.toLowerCase();
      const temperature = data.main.temp;

      if (weatherCondition.includes('rain')) {
        setBackground('rainy');
      } else if (temperature < 20) {
        setBackground('cold');
      } else {
        setBackground('sunny');
      }
    }
  }, [data]);

  return (
    <div className={`flex justify-center items-center w-screen h-screen text-white`} id='any'>
      <div className={`app ${background} w-[70vw] h-[95vh]`}>
        <div className="search ml-10 mt-7 bg-opacity-75 justify-center items-center text-white flex w-[250px] h-[40px] p-1 rounded-2xl bg-[#B6ABAB]">
          <input
            className='text-white'
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Enter Location'
            type="text" />
          <img
            className='w-[20px] h-[20px]'
            onClick={searchLocation} src={icon} alt="Search" />
        </div>

        <div className='flex justify-center overpass-text items-center h-[100%]'>
          <div className="container relative flex flex-col w-[473px] h-[270px] shadow-sm shadow-white border-white border rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white to-[#BFBFBF] opacity-[30%] rounded-3xl"></div>
            <div className="flex flex-col justify-center items-center relative z-10">
              <div className="text-[20px] mt-3">
                <p>{data.name}</p>
              </div>
              <div className="temp text-[70px] font-bold tracking-wide drop-shadow-xl stroke-slate-900">
                {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
              </div>
              <div className="description font-bold drop-shadow-xl stroke-slate-900">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name !== undefined &&
              <div className="bottom flex flex-col justify-center items-center relative z-10">
                <div className="">
                  {data.wind ?
                    <div className='grid grid-cols-4 gap-4 mt-3'>
                      <div className=''>
                        <img className='' src={wind} alt='' />
                      </div>
                      <div>Wind</div>
                      <div className='h-4 w-[1px] bg-white'></div>
                      {data.wind.speed.toFixed()} m/s</div> : null}
                </div>
                <div className="hum">
                  <div className='grid grid-cols-4 gap-4 mt-3'>
                    <div><img className='mr-4' src={vec} alt='' /></div>
                    <div>Hum</div>
                    <div className='h-4 w-[1px] bg-white'></div>
                    <div>
                      {data.main ? <div className='ml-2'>{data.main.humidity}%</div> : null}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <ToastContainer id='toastc'/> {/* Toast container for notifications */}
    </div>
  );
}

export default App;