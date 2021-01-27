'use strict';

const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main =document.getElementById('main');
const form =document.getElementById('form');
const search =document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city){
  const resp = await fetch(url(city));
  const respData = await resp.json();

  console.log(respData, KtoC(respData.main.temp));

  addWeatherToPage(respData);
}

function addWeatherToPage(data){
  const temp = KtoC(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />${temp}°C
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
    <small>${data.weather[0].main}</small>
  `;

  // clean up
  main.innerHTML = '';

  main.appendChild(weather);
}

// 켈빈 온도를 섭씨 온도로 변환하는 함수
function KtoC(K){
  // numberObj.toFixed([digits])
  // digits: 소수점 뒤에 나타날 자릿수. 0 이상 20 이하의 값을 사용할 수 있음. 값을 지정하지 않으면 0을 사용.
  // toFixed()는 Number 객체를 주어진 digits 만큼의 소수점 이하 자리수를 정확하게 갖는 문자열 표현으로 반환합니다.
  // 소수점 이하가 길면 숫자를 반올림하고, 짧아서 부족할 경우 뒤를 0으로 채울 수 있습니다.
  // return (K - 273.15).toFixed(2);
  return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});