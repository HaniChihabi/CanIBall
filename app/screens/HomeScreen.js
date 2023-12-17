import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import fetchWeatherData from '../api/api'; 
import { useRoute } from '@react-navigation/native';


const { width } = Dimensions.get('window');

function HomeScreen({ navigation }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [weather, setWeather] = useState(null);
    const route = useRoute();

    useEffect(() => {
        const newCity = route.params?.selectedCity;
        if (newCity && newCity !== selectedCity) {
            setSelectedCity(newCity);
            fetchWeatherDataForCity(newCity);
        }
    }, [route.params?.selectedCity]);
    
    useEffect(() => {
        if (selectedCity) {
            fetchWeatherDataForCity(selectedCity);
        }
    }, [selectedCity]);

    const fetchWeatherDataForCity = async (city) => {
        try {
            const apiKey = '294249189d29841b5a3b8791204c6411';
            // Add &units=metric to get temperature in Celsius
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            alert('Failed to fetch weather data. Please try again.');
        }
    };
    


    const calculateIndividualGrade = (value, type) => {
        if (type === 'Temperature') {
            // Temperature grading logic
            if (value >= 20) return 'A';
            if (value >= 16 && value < 20) return 'B';
            if (value >= 13 && value < 16) return 'C';
            if (value >= 9 && value < 13) return 'D';
            return 'F';
        } else if (type === 'Wind Speed') {
            // Wind Speed grading logic
            if (value >= 0 && value <= 4) return 'A';
            if (value > 4 && value <= 7) return 'B';
            if (value > 7 && value <= 12) return 'C';
            if (value > 12 && value <= 15) return 'D';
            return 'F';  
        }
        return 'N/A'; // Default case
    };


    const calculateGrade = (temperature, windSpeed) => {
        let grade;

        // Calculate grade based on temperature
        if (temperature >= 20) grade = 'A';
        else if (temperature >= 16 && temperature < 20) grade = 'B';
        else if (temperature >= 13 && temperature < 16) grade = 'C';
        else if (temperature >= 9 && temperature < 13) grade = 'D';
        else grade = 'F';
    
        // Function to lower the grade by one level
        const lowerGrade = (currentGrade) => {
            if (currentGrade === 'A') return 'B';
            if (currentGrade === 'B') return 'C';
            if (currentGrade === 'C') return 'D';
            if (currentGrade === 'D') return 'F';
            return 'F'; 
        };
        // Lower the grade based on wind speed conditions
        if (windSpeed > 5) {
            grade = lowerGrade(grade); 
        }
        if (windSpeed > 8) {
            grade = lowerGrade(grade);  
        }
        return grade;
    };

    const grade = weather ? calculateGrade(weather.main.temp, weather.wind.speed) : 'N/A';
    const weatherInfo = weather ? [
        { title: 'Temperature', value: `${weather.main.temp} °C`, type: 'Temperature' },
        { title: 'Wind Speed', value: `${weather.wind.speed} m/s`, type: 'Wind Speed' },
        { title: 'Overall Grade', value: grade, type: 'Grade' },
    ] : [];


    // CircleColor
    const getCircleColor = (grade) => {
        switch (grade) {
            case 'A':
                return 'green';
            case 'B':
                return 'lightgreen';
            case 'C':
                return 'yellow';
            case 'D':
                return 'orange';
            case 'F':
                return 'red';
            default:
                return 'grey'; // Default color
        }
    };
    const getCircleStyle = (grade) => {
        return {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: getCircleColor(grade),
            alignSelf: 'center',
            marginTop: 10,
        };   
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.lottieContainer}>
                <LottieView source={require('../assets/SpinAnimation.json')} autoPlay loop style={styles.lottie} />
            </View>

            {weather && (
                <View style={styles.weatherInfoContainer}>
                    {weatherInfo.slice(0, 2).map((info, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardTitle}>{info.title}</Text>
                            <Text style={styles.cardValue}>{info.value}</Text>
                            <View style={getCircleStyle(calculateIndividualGrade(parseFloat(info.value), info.type))}></View>
                        </View>
                    ))}
                </View>
            )}

            {weather && (
                <View style={styles.weatherInfoContainer}>
                    {weatherInfo.slice(2).map((info, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardTitle}>{info.title}</Text>
                            <Text style={styles.cardValue}>{info.value}</Text>       
                            <View style={getCircleStyle(grade)}></View>
                        </View> 
                    ))}
                </View>
            )}

            <TouchableOpacity onPress={() => navigation.push('Onboarding')} style={styles.resetButton}>
                <Text>Reset</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottieContainer: {
        width: width * 0.9,
        height: width,position: 'relative',
        bottom: 50
    },
    lottie: {
        position: 'relative',
        top: 15,
        width: '100%',
        height: '100%',
    },
    weatherInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    singleCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        padding: 10,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 0,
        width: width / 2.6,  
        height: 80,      
        position: 'relative',
        top: 50,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:5
    },
    cardValue: {
        fontSize: 14,
        color: '#666',
    },
    resetButton: {
        backgroundColor: '#34d399',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        position: 'absolute',
        top:10,
    },
    pickerStyle: {
        width: 200,
        height: 50,
        position: 'relative',
        bottom: 90
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#34d399', 
        alignSelf: 'center',
        marginTop: 10,
    },
});

export default HomeScreen;
