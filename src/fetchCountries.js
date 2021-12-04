export const fetchCountriesName = function fetchCountries(name) {

    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags=svg,languages`;

    return fetch(url).then(response => {
            return response.json();
        });
};
