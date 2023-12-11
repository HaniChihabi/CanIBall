import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import fetchWeatherData from '../api/api'; // Adjust the path as necessary
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

function HomeScreen({ navigation }) {
    const [selected, setSelected] = useState(null);
    const [weather, setWeather] = useState(null);
    const route = useRoute()
    const city = route.params?.selected;
    console.log(city);

    useEffect(() => {
        setSelected(city);
    }, [selected]);


    const initializeWeather = async () => {
            const data = await fetchWeatherData(selected, '294249189d29841b5a3b8791204c6411');
            setWeather(data);
    };
    const getCardStyle = (temperature) => {
        const thresholdTemperature = 10;

        if (temperature < thresholdTemperature) {
            return {
                ...styles.card,
                backgroundColor: 'white',
            };
        } else {
            return {
                ...styles.card,
                backgroundColor: 'white',
            };
        }
    };
    
    // one gotta go
    useEffect(() => {
        if (selected) {
            initializeWeather();
        }
    }, [selected]);

    useEffect(() => {
        if (city) {
            setSelected(city);
            initializeWeather();
        }
    }, [city]);

      
    

    const weatherInfo = weather ? [
        { title: 'Temperature', value: `${weather.main.temp} °C` },
        { title: 'Humidity', value: `${weather.main.humidity}%` },
        { title: 'Wind Speed', value: `${weather.wind.speed} m/s` },
    ] : [];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.lottieContainer}>
                <LottieView source={require('../assets/SpinAnimation.json')} autoPlay loop style={styles.lottie} />
            </View>

            {weather && (
            <View style={styles.weatherInfoContainer}>
                {weatherInfo.map((info, index) => (
                    <View key={index} style={getCardStyle(info.title === 'Temperature' ? parseFloat(info.value) : null)}>
                        <Text style={styles.cardTitle}>{info.title}</Text>
                        <Text style={styles.cardValue}>{info.value}</Text>
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
        width: '100%',
        height: '100%',
    },
    weatherInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 0,
        width: width / 3.5,  // Adjust width for three cards to fit in a row
        height: 80,         // Smaller height
        position: 'relative',
        top: 50, // Adjust this value as needed
        },

    cardTitle: {
        fontSize: 14,
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

        // Add more styling as needed
    },
});

export default HomeScreen;
