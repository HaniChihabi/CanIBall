import {View, Text, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics'


const { width, height } = Dimensions.get('window');




export default function HomeScreen({navigation}) {
    const [weather, setWeather] = useState(null);
    const route = useRoute();
    const [selectedCity, setSelectedCity] = useState('');
    const {t, i18n } = useTranslation();
    const [isMentalitybutton, setIsMentalitybutton] = useState(false)

    // useEffect(() => {
    //     getData();
    // },[]);

    // Changing city if new city has been entered & fetching new city weather data
    useEffect(() => {
        const newCity = route.params?.selectedCity;
        if (newCity && newCity != selectedCity) {
            setSelectedCity(newCity);
            fetchWeatherDataForCity(newCity);
        }
    }, [route.params?.selectedCity]);

    const fetchWeatherDataForCity = async (city) => {
        try {
            const apiKey = '294249189d29841b5a3b8791204c6411';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (data && data.main) {
                setWeather(data);
            } else {
                // Handle cases where no data is returned for the city
                setWeather(null);
                alert(t('No weather data found for the city. Please try another city.'));
            }
        } catch (error) {
            // Handle network or other errors gracefully
            alert(t('Failed to fetch weather data. Please try again.'));
            };
    };


    const handleReset= async () => {
        try {
            await AsyncStorage.setItem('onboardingCompleted', 'false')
            console.log('Onboarding reset successful');
        
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            console.log('Onboarding set to false')
            navigation.reset({
                index: 0,
                routes:[{ name: 'Onboarding'}],
            });
        } catch (error) {
            console.error('Failed to reset onboarding:', error);
        }
    };

    // ======== Weather Cards ========
    

    const getCircleColor = (grade) => {
        switch (grade) {
            case 'A' :
                return 'green';
            case 'B':
                return 'lightgreen';
            case 'C':
                return 'yellow'
            case 'D':
                return 'orange';
            case 'F':
                return 'red';
            default:
                return 'grey'; // Default color
        }
    };

    const getCircleStyle = (grade) => {
        return{
            width: 10,
            height: 10,
            backgroundColor: isMentalitybutton? 'green' : getCircleColor(grade),
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 5
            }
    }

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
        }
    
    

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
    }

    const grade = weather ? calculateGrade(weather.main.temp, weather.main.humidity, weather.wind.speed) : 'N/A';
    const weatherInfo = weather ? [
        {title: t("temperature"), value: `${weather.main.temp} C`, type: 'Temperature'},
        {title: t("humidity"), value: `${weather.main.humidity} %`, type: 'Humidity'},
        {title: t("windSpeed"), value: `${weather.wind.speed} m/s`, type: 'Wind Speed'},
        {title: selectedCity, value: grade , type: 'Grade'}
    ] : [];

    return (
            <SafeAreaView style={[styles.baseContainer, {backgroundColor:isMentalitybutton ? 'gold' : 'transparent'}]}>
                    {/* Reset Button */}
                    <TouchableOpacity 
                        onPress={handleReset}
                        style={styles.resetButton}><Text>{t('reset')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => {
                            setIsMentalitybutton(prevState => !prevState);
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }}>
                            <Text>{isMentalitybutton ? t('Keep Going') : t('Stop crying')}</Text>
                    </TouchableOpacity>
                    <LottieView source={require('../../assets/SpinAnimation.json')} autoPlay loop style={styles.lottie} 
                        />
                    {/* First three cards */}
                    <View style={styles.weatherInfoContainer}>
                        {weatherInfo.slice(0,3).map((info, index) => (
                            <View key={index} style={styles.card}>
                                <Text style={styles.cardTitle}>{info.title}</Text>
                                <Text style={styles.cardValue}>{isMentalitybutton? t('Perfect') : (info.value)}</Text>
                                <View style={getCircleStyle(calculateIndividualGrade(parseFloat(info.value), info.type))}></View>                            
                            </View>
                        ))}
                    </View>
                    <View style={styles.weatherInfoContainer}>
                        {weatherInfo.slice(3).map((info, index) => (
                            <View key={index} style={styles.card1}>
                                <Text style={styles.cardTitle}>{info.title}</Text>
                                <Text style={styles.cardValue}>{isMentalitybutton? t('Perfect') : (info.value)}</Text>
                                <View style={getCircleStyle(grade)}></View> 
                            </View>
                        ))}
                    </View>
            </SafeAreaView>

    )}

    //=============== Styleshett ===============

    const styles = StyleSheet.create({
        baseContainer: {
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
        },
        lottie: {
            width: width * 0.9,
            alignSelf: 'center',
        },
        resetButton: {
            backgroundColor: 'green',
            width: width * 0.2,
            alignSelf: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            position: 'absolute',
            top: '7%'
        },
        weatherInfoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            top: '15%',
        },
        card:{
            fontSize: 12,
            fontWeight: 'bold',
            alignSelf: 'center',
            width: width / 3.4,  
            margin: 0,
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 10
        },
        card1: {
            fontSize: 12,
            fontWeight: 'bold',
            alignSelf: 'center',
            width: width / 2,  
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 10
        },
        cardTitle:{
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 5,
            alignSelf: 'center',
        },
        cardValue:{
            fontSize: 14,
            color: 'grey',
            alignSelf: 'center',
        },
        toggleButton: {
            padding: 10,
            backgroundColor: 'white',
            position: 'absolute',
            top: '7%',
            right: '10%',
            borderRadius: 5
        },
    })


