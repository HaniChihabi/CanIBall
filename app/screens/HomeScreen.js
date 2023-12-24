import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';





const { width } = Dimensions.get('window');

function HomeScreen({ navigation }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [weather, setWeather] = useState(null);
    const route = useRoute();
    const [isMentalitybutton, setIsMentalitybutton] = useState(false);
    const { t, i18n } = useTranslation();


    // Fetching city name from onboarding
    const getData = async () => {
          const value = await AsyncStorage.getItem('city');
          setSelectedCity(value);
          console.log(value);
      };
    useEffect(() => {
            getData();
        },[]);

    // Changing city if new city has been entered & fetching new city weather data
    useEffect(() => {
        const newCity = route.params?.selectedCity;
        if (newCity && newCity !== selectedCity) {
            setSelectedCity(newCity);
            fetchWeatherDataForCity(newCity);
        }
    }, [route.params?.selectedCity]);

    // Fetching weather data for city
    const fetchWeatherDataForCity = async (city) => {
        try {
            const apiKey = '294249189d29841b5a3b8791204c6411';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json(); 
            setWeather(data);
        } catch (error) {
            alert(t('Failed to fetch weather data. Please try again.'));
        }
    };

    // Grading logic of weather Temperature, Humidity and Wind Speed
    const calculateIndividualGrade = (value, type) => {
        if (type === 'Temperature') {
            // Temperature grading logic
            if (value >= 20) return 'A';
            if (value >= 16 && value < 20) return 'B';
            if (value >= 13 && value < 16) return 'C';
            if (value >= 9 && value < 13) return 'D';
            return 'F';
        } 
            else if (type === 'Humidity') {
            // Humidity grading logic
            if (value >= 0 && value <= 50) return 'A';
            if (value > 50 && value <= 70) return 'B';
            if (value > 70 && value <= 80) return 'C';
            if (value > 80 && value <= 85) return 'D';
            return 'F';
        }    
            else if (type === 'Wind Speed') {
            // Wind Speed grading logic
            if (value >= 0 && value <= 4) return 'A';
            if (value > 4 && value <= 7) return 'B';
            if (value > 7 && value <= 12) return 'C';
            if (value > 12 && value <= 15) return 'D';
            return 'F';  
        }
        return 'N/A'; // Default case
    };


    // Grading logic of overall grade
    const calculateGrade = (temperature, humidity, windSpeed) => {
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
        // Lowering grade through wind speed
        if (windSpeed > 5) {
            grade = lowerGrade(grade); 
        }
        if (windSpeed > 10) {
            grade = lowerGrade(grade);  
        }
        // Lowering grade through humidity
        if (humidity > 50) {
            grade = lowerGrade(grade)
        }
        if (humidity > 80) {
            grade = lowerGrade(grade)
        }
        return grade;
    };

    // Weather cards
    const grade = weather ? calculateGrade(weather.main.temp, weather.main.humidity, weather.wind.speed) : 'N/A';
    const weatherInfo = weather ? [
        { title: t("temperature"), value: `${weather.main.temp} °C`, type: 'Temperature' },
        { title: t("humidity"), value: `${weather.main.humidity} %`, type: 'Humidity' },
        { title: t("windSpeed"), value: `${weather.wind.speed} m/s`, type: 'Wind Speed' },
        { title: selectedCity, value: grade, type: 'Grade' },
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
            backgroundColor: isMentalitybutton ? 'green' : getCircleColor(grade),
        };   
    };

    // Mentalitybutton
    const ToggleButton = () => (
        <TouchableOpacity 
            style={styles.toggleButton}
            onPress={() => setIsMentalitybutton(prevState => !prevState)}
            >
            <Text>{isMentalitybutton ? t('Keep Going') : t('Stop crying')}</Text>
        </TouchableOpacity>
    );
    const baseContainerStyle = {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    };

    // Reset button functionality
    const handleReset = async () => {
        try {
            // Reset the onboardingCompleted flag in AsyncStorage
            await AsyncStorage.setItem('onboardingCompleted', 'false');
            console.log('Onboarding reset successful');

            // Navigate to the OnboardingScreen
            navigation.navigate('Onboarding');
        } catch (error) {
            console.error('Failed to reset onboarding:', error);
        }
    };
    

    return (
        <SafeAreaView style={[baseContainerStyle, { backgroundColor: isMentalitybutton ? 'gold' : 'transparent' }]}>            
            <ToggleButton />
            {/* Lottie */}
            <View style={styles.lottieContainer}>
                <LottieView source={require('../assets/SpinAnimation.json')} autoPlay loop style={styles.lottie} />
            </View>
            {/* First three cards */}
            {weather && (
                <View style={styles.weatherInfoContainer}>
                    {weatherInfo.slice(0, 3).map((info, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardTitle}>{info.title}</Text>
                            <Text style={styles.cardValue}>{isMentalitybutton ? t('Perfect') : info.value}</Text>
                            <View style={getCircleStyle(calculateIndividualGrade(parseFloat(info.value), info.type))}></View>
                        </View>
                    ))}
                </View>
            )}
            {/* Overall grade */}
            {weather && (
                <View style={styles.weatherInfoContainer}>
                    {weatherInfo.slice(3).map((info, index) => (
                        <View key={index} style={styles.card1}>
                            <Text style={styles.cardTitle}>{info.title}</Text>
                            <Text style={styles.cardValue}>{isMentalitybutton ? t('Perfect') : info.value}</Text>       
                            <View style={getCircleStyle(grade)}></View>
                        </View> 
                    ))}
                </View>
            )}
            {/* Reset button */}
            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                <Text>{t("reset")}</Text>
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
        top: 20,
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
        width: width / 3.4,  
        height: 80,      
        position: 'relative',
        top: 30,
    },
    card1: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 0,
        width: 200,  
        height: 80,      
        position: 'relative',
        top: 30,
    },
    cardTitle: {
        fontSize: 12,
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
        top:20,
    },
    pickerStyle: {
        width: 200,
        height: 50,
        position: 'relative',
        bottom: 50
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#34d399', 
        alignSelf: 'center',
        marginTop: 10,
    },
    toggleButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        zIndex: 2,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'gold',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    Mentalitybutton: {
        backgroundColor: 'gold',
    },
});

export default HomeScreen;