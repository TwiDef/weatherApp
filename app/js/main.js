// http://api.weatherapi.com/v1/current.json?key=a0a2b5ac85604c67a5e102408230402&q=London
// a0a2b5ac85604c67a5e102408230402'

const apiKey = 'a0a2b5ac85604c67a5e102408230402';

// elements
const form = document.querySelector('#form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = input.value.trim();
    input.value = '';

    // do request
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);

        // create data
        const html = `
        <div class="card">
            <h2 class="card__city">${data.location.name} <span>${data.location.country}</span></h2>
            <div class="card__items">
                <div class="card__value">${data.current.temp_c}<span>&#176;</span></div>
                <img class="card__img" src="./images/clouds-and-sun.png" alt="weather">
            </div>
            <div class="card__description">${data.current.condition.text}</div>
        </div>
        `;

        // display card
        header.insertAdjacentHTML('afterend', html);
    });

});