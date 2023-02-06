// http://api.weatherapi.com/v1/current.json?key=a0a2b5ac85604c67a5e102408230402&q=London
// a0a2b5ac85604c67a5e102408230402'

import conditions from "./conditions.js";
console.log(conditions);

const apiKey = 'a0a2b5ac85604c67a5e102408230402';

// elements
const form = document.querySelector('#form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`;
    header.insertAdjacentHTML('afterend', html);
}

function showCard({ name, country, temp, condition, img }) {
    const html = `
            <div class="card">
                <h2 class="card__city">${name} <span>${country}</span></h2>
                <div class="card__items">
                    <div class="card__value">${temp}<span>&#176;</span></div>
                    <img class="card__img" src="${img}" alt="weather">
                </div>
                <div class="card__description">${condition}</div>
            </div>
            `;
    // display card
    header.insertAdjacentHTML('afterend', html);
}


async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    let city = input.value.trim();
    input.value = '';

    const data = await getWeather(city);

    if (data.error) {
        removeCard();
        showError(data.error.message);
    } else {
        removeCard();
        const info = conditions.find((obj) => obj.code === data.current.condition.code);

        const condition = data.current.is_day ?
            info.languages[23]['day_text'] : info.languages[23]['night_text'];

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: condition,
            img: data.current.condition.icon
        };

        showCard(weatherData);
    }
});