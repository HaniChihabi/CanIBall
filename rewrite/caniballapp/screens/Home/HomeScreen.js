import {View, Text, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';



export default function HomeScreen({navigation}) {
    const { width, height } = Dimensions.get('window');
    const [weather, setWeather] = useState(null);
    const route = useRoute();
    const [selectedCity, setSelectedCity] = useState('');


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
    const handleReset= () => {
        try {
            navigation.reset({
                index: 0,
                routes:[{ name: 'Onboarding'}],
            });
        } catch (error) {
            console.error('Failed to reset onboarding:', error);
        }

        
}
    const styles = StyleSheet.create({
        baseContainer: {
            flex: 1,
            aligntitems: 'center',
            justifyContent: 'center',
            top: '0%,'
            
        },
        lottie: {
                width: width * 0.9,
                height: width,position: 'relative',
                top: '10%'
        },
        resetButton: {
            backgroundColor: 'green',
            width: width * 0.1,
            justifyContent: 'center',
            alignSelf: 'center',
        }
            
    })

    return (

            <SafeAreaView >
                <View tyle={styles.baseContainer}>
                    <TouchableOpacity 
                    onPress={handleReset}
                    style={styles.resetButton}><Text>Reset</Text>
                    </TouchableOpacity>
                    <LottieView source={require('../../assets/SpinAnimation.json')} autoPlay loop style={styles.lottie} />
                </View>
            </SafeAreaView>

    )
}

