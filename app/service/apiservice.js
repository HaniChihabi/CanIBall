export const fetchCityName = async (cityName) =>{
    // Fetch city data from the API
    const apiKey = '294249189d29841b5a3b8791204c6411'; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
}