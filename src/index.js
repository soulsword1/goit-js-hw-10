import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener(
  'input',
  Debounce(() => addingCountriesToHTML(), DEBOUNCE_DELAY)
);

async function addingCountriesToHTML() {
  const name = countryInput.value.trim();
  if (name) {
    const fetchResult = await fetchCountries(name);
    try {
      const countriesQty = fetchResult.length;
      const min = 2;
      const max = 10;
      if (countriesQty > max) {
        tooManyNotification();
        return;
      } else if (countriesQty > min && countriesQty < max) {
        showCountryList(fetchResult);
        countryInfo.innerHTML = '';
        return;
      }
      showInformationAboutCountry(fetchResult);
    } catch (error) {
      notFoundNotification(error);
      console.log(`Error ${error}`);
    }
  }
}

function tooManyNotification() {
  clearHTML();
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function notFoundNotification(error) {
  clearHTML();
  if(error){
  Notify.failure('Oops, there is no country with that name');
  }
}

function clearHTML() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function showCountryList(countries) {
  const markup = countries
    .map(
      ({ name, flags }) =>
        `<li class="country-item"><img src='${flags.svg}' width='100px' height='75px'/><span class="country-item__name">${name.common}</span></li>`
    )
    .join('');
  countryList.innerHTML = markup;
}

function showInformationAboutCountry(countries) {
  showCountryList(countries);
  document.querySelector('.country-item__name').classList.add('bigger-font');
  document
    .querySelector('.country-item img')
    .classList.add('country-item__img');
  const markup2 = countries
    .map(({ capital, population, languages }) => {
      const countryLanguages = Object.values(languages);
      return `<card class="container-details"><p><span class="bold">Capital:</span> ${capital}</p>
            <p><span class="bold">Population:</span> ${population}</p>
            <p><span class="bold">Languages:</span> ${countryLanguages.map(
              lang => `${lang}`
            )}</p>
            </card>
            `;
    })
    .join('');
  countryInfo.innerHTML = markup2;
}
