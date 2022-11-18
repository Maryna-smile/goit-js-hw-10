import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import makeCountryList from './templates/countryList.hbs';
import makeCountryInfo from './templates/countryInfo.hbs';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY));

function getCountries() {
    const countryName = inputRef.value.trim();

    if (!countryName) {
        countryListRef.innerHTML = '';
        countryInfoRef.innerHTML = '';
        return;
    }

    fetchCountries(countryName)
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return;
            }
            if (countries.length === 1) {
                renderCountryInfo(countries);
            } else {
                renderCountryList(countries)
            }

        })
        .catch(error => {
            countryListRef.innerHTML = '';
            countryInfoRef.innerHTML = '';
            Notiflix.Notify.failure('Oops, there is no country with that name');
        })
};

function renderCountryInfo(countryName) {
    const markupInfo = makeCountryInfo(countryName);
    countryInfoRef.innerHTML = markupInfo;
    countryListRef.innerHTML = '';
}

function renderCountryList(countryName) {
    const markupList = makeCountryList(countryName);
    countryListRef.innerHTML = markupList;
    countryInfoRef.innerHTML = '';
}


       

