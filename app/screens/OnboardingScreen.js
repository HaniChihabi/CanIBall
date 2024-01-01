
// ================= IMPORTS ===============
import React, { useState } from 'react';
import { View, Text, LogBox, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';

// =================== CODE =================

export default function OnboardingScreen() {

    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

    // defaults
    const navigation = useNavigation();
    const [cityName, setCityName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // for translation
    const {t, i18n } = useTranslation();
    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        AsyncStorage.setItem('appLanguage', language);
      };

    const LanguageOptions = [
        { label: t('English'), value: 'en' },
        { label: t('Araby'), value: 'ar' },
        { label: t('Chinese'), value: 'ch' },
        { label: t('French'), value: 'fr' },
        { label: t('German'), value: 'de' },
        { label: t('Japanese'), value: 'jp' },
        { label: t('Kurdish'), value: 'kr' },
        { label: t('Portuguese'), value: 'pt' },  
        { label: t('Russian'), value: 'rs' },
        { label: t('Spanish'), value: 'es' },
        { label: t('Swedish'), value: 'sv' },
    ];   

    // Fetching city suggestions for search bar
    const fetchSuggestions = async (input) => {
        if (input.length > 0) {
            try {
                setSuggestions([]);
                const options = {
                    method: 'GET',
                    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
                    params: { namePrefix: input, minPopulation: 10000, limit: 5 },
                    headers: {
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                        'X-RapidAPI-Key': 'e88ee664bdmshad6c6505a38d94cp144614jsndeb85cd45b61' 
                    }
                }; 
                const response = await axios.request(options);
                const cities = response.data.data.map(city => `${city.name}, ${city.countryCode}`);
                setSuggestions(cities);
                console.log("From fetch suggestions:", cities);
            } catch (error) {
                setSuggestions([]); 
            }
        } 
    }

    // for searching city (button)
    const handleSearch = async () => {
        // Validate the input
        if (cityName.trim() === '') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            alert(t('Please enter a city name'));
            return;
        }
    
        try {
            // API call to validate the city name
            const apiKey = '294249189d29841b5a3b8791204c6411'; // Replace with your actual API key
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
            const data = await response.json();
    
            // Check if the response is valid for the entered city name
            if (data.cod === 200) {
                // If the city name is valid, store the data and navigate to the HomeScreen 
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                await AsyncStorage.setItem('city', cityName);
                navigation.navigate('Home', { selectedCity: cityName });
                await AsyncStorage.setItem('onboardingCompleted', 'true');
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                // If the city name is invalid
                alert(t('Please enter a valid city name'));
                
            }
        } catch (error) {
            console.error('Error while validating city name:', error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            alert(t('An error occurred while validating the city name. Please try again.'));
        }
    };

    // =================== UI =======================

    return (
        <View style={styles.container}>
            <Onboarding
                skipLabel={''}
                onDone={()=> { 
                    handleSearch();
                }}
                // Page1
                pages={[// Page2
                    {
                        backgroundColor: '# ',
                        image: (
                            <SafeAreaView style={styles.container3}>
                                    <View style={styles.page2}>
                                        {/* <Text style={styles.title}>{t('Language')}</Text>  */}
                                    </View>
                                    {/* Language picker */}
                                    <Picker
                                    selectedValue={i18n.language}
                                    onValueChange={(itemValue) => {
                                        handleLanguageChange(itemValue);
                                        
                                    }}
                                    style={styles.pickerStyle}
                                    itemStyle={{ fontWeight: 'bold', fontSize: '40'}} // Not consistently supported
                                >
                                    {LanguageOptions.map((lang, index) => (
                                        <Picker.Item key={index} label={lang.label} value={lang.value} color= "white" 
                                        />
                                    ))}
                                </Picker>
                                    <LottieView
                                        source={require('../assets/NewLanguagesAnimation.json')}
                                        autoPlay
                                        loop
                                        style={styles.lottie2}
                                    /> 
                            </SafeAreaView>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#a78bfa',
                        image: (
                                <SafeAreaView style={styles.container1}>
                                    <View style={styles.page1}>
                                        <Text style={[styles.title, { fontSize: 70 }]}>Can I Ball</Text>
                                        <Text style={styles.subtitle}>{t('Lets see what the weather says!')}</Text>
                                    </View>
                                    <LottieView
                                        source={require('../assets/ConfettiAnimation.json')}
                                        autoPlay
                                        loop
                                        style={styles.lottie1}
                                    />
                                </SafeAreaView>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    
                    // Page3
                    {
                        backgroundColor: '#a78bfa',
                        image: (
                            <SafeAreaView>
                                <View style={styles.page3}>
                                    <Text style={styles.title}>{t('City')}</Text>
                                    <View style={styles.containerInput}>
                                        {/* Search bar */}
                                        <TextInput
                                            style={[styles.input, { backgroundColor: 'white' }]} // Temporary background color for debugging
                                            placeholder={t("Enter city name")}
                                            value={cityName}
                                            onChangeText={(text) => {
                                                setCityName(text);
                                                fetchSuggestions(text);
                                            }}
                                        />
                                        {/* Fetching suggestions */}
                                        {suggestions.length > 0 && (
                                            <View style={styles.suggestionsContainer}>
                                                {suggestions.map((suggestion, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => {
                                                            setCityName(suggestion);
                                                            setSuggestions([]);
                                                        }}
                                                    >
                                                        <Text style={styles.suggestionItem}>{suggestion}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <LottieView
                                    source={require('../assets/CityAnimation.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie3}
                                /> 
                            </SafeAreaView>
                        ),
                        title: '',
                        subtitle: '',
                    },
                ]}
            />
        </View>
    );
}

// ================= STYLES ==================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: "black"
    },
    // lotties
    lottie1: {
        width: 200,
        height: 200,
        position: 'relative',
        top: 70,
        alignSelf: 'center',
    },
    lottie2: {
        width: 300,
        height: 200,
        alignSelf: 'center',
        position: 'relative',
        top: 0.05, // Adjust this value as needed
    },
    lottie3: {
        width: 400,
        height: 300,
        alignSelf: 'center',
        position: 'relative',
        top: 53,
    },
    // page-contents
    page1:{
        position: 'relative',
        top: 80
    },
    page2:{
        position: 'relative',
        bottom: 0,
    },
    page3:{
        position: 'relative',
        bottom: 65
    },
    // Titles
    title: {
        fontSize: 50,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        marginTop: 15,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',    fontWeight: 'bold',
        marginTop: 10,
    },
    doneButton: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: '100%',
        borderBottomLeftRadius: '100%',
    },
    pickerStyle: {
        marginTop: 50,
        width: 400,
        alignSelf: 'center',
        position: 'relative',
        bottom: 50,
    },
    suggestionsContainer: {
        backgroundColor: 'white',
        width: '100%',
        position: 'absolute',
        top: 60, 
        zIndex: 1, 
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    containerInput: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'relative',
        top: 10,
    },
    input: {
        width: 280,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    button: {
        height:100,
        width: 100
    }
  
});