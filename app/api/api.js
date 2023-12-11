import axios from 'axios';

const fetchWeatherData = async (city, apiKey) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' // or 'imperial' for Fahrenheit
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchWeatherData;
