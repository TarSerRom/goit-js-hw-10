export default class NewsApiService {
  constructor() {
    this.searchCountry = '';
  }

  fetchCountries() {
    const BASE_URL = 'https://restcountries.com/v3.1';
    
    return fetch(`${BASE_URL}/name/${this.searchCountry}?fields=name,capital,population,flags,languages`)
      
      .then(response => {
        if (response.status === 404) {
          console.log(response)
          throw new Error(response.status);
        }
        return response.json();
      });
  }
  
  get name() {
    return this.searchCountry;
  }

  set name(newName) {
    return this.searchCountry = newName;
  }
}