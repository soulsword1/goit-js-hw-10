export { fetchCountries };

async function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    const fetchUrl = await fetch(url);
    const fetchResult =  !fetchUrl.ok?new Error(fetchUrl.status):fetchUrl.json();
    return fetchResult;
}

// async function fetchCountries(name) {
// try {
//     const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
//     const fetchUrl = await fetch(url);
//     const fetchResult = await fetchUrl.json();
//     return fetchResult;
// } catch(e) {
//     console.log('error: ', e);  
// }
// }
