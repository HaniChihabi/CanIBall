// ==================== IMPORTS ====================
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from "react-native"
import { Picker } from '@react-native-picker/picker';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics'
import axios from 'axios';



// ==================== CODE ====================

export default function OnboardingScreen() {

const { width, height } = Dimensions.get('window');
// for translation
const {t, i18n } = useTranslation();
const navigation = useNavigation(); // Use the useNavigation hook here
const [suggestions, setSuggestions] = useState([]);
const [cityName, setCityName] = useState('');


// Fetching city suggestions for search bar
const fetchSuggestions = async (input) => {
    if (input.length > 0) {
        try {
            setSuggestions([]);
            const options= {
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
        } catch(error) {
            setSuggestions([]);
        }
    }
};

const handlesearch = async() => {
    // Validate the input
    if (cityName.trim() === '') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        alert(t('Please enter a city name'));
        return;
    }
    
    try{
    // API call to validate the city name
    const apiKey = '294249189d29841b5a3b8791204c6411';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    const data = await response.json();

    // Check if the response is valid for the entered city name
    if (data.cod === 200) {
        // If the city name is valid, store the data and navigate to the HomeScreen 
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        await AsyncStorage.setItem('city', cityName);
        console.log("stored that city", cityName)
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        navigation.navigate('Home', { selectedCity: cityName });

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
}

const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    AsyncStorage.setItem('appLanguage', language);
  };
const LanguageOptions= [
    {label: t('Languages'), value: 'lng'},
    
    { label: t('Araby'), value: 'ar' },
    { label: t('Chinese'), value: 'ch' },
    { label: t('English'), value: 'en'},
    { label: t('French'), value: 'fr' },
    { label: t('German'), value: 'de' },
    { label: t('Japanese'), value: 'jp' },
    { label: t('Kurdish'), value: 'kr' },
    { label: t('Portuguese'), value: 'pt' },  
    { label: t('Russian'), value: 'rs' },
    { label: t('Spanish'), value: 'es' },
    { label: t('Swedish'), value: 'sv' },
];

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "black",
        top: '0%',
    },
// ======== lottie ========
    lottie: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: -1000,
    },
    lottie1: {
        width: width * 0.7,
        height: height * 0.22,
        alignSelf: 'center',
        top: '100%',
    },
    lottie2: {
        width: width * 0.2, 
        height: height * 0.22,
        alignSelf: 'center',
        top: '100%',
    },
    lottie3: {
        width: width * 0.7,
        height: height * 0.3,
        alignSelf: 'center',
        top: '62%',
    },

    // ======== titles ========
    title: {
        color: 'white',
        alignSelf: 'center',
        top: '40%',
    },
    languageTitle: {
        top: '20%', // Adjust this to move text up or down
        alignSelf: 'center',
        alignItems: 'center',
        color: 'white',
        zIndex: 1000,
        fontSize: 50
    },
    cityTitle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 30,
        margin: 10
    },
    // ======== picker ========

    pickerStyle: {
        position: 'absolute',
        width: width * 1,
        alignSelf: 'center',
        top: '50%',
        fontSize: 40
    },
    // ======== searchbar ========

    containerInput: {
        alignItems: 'center',
        top : '10%',
    },
    input: {
        width: width * 0.6,
        padding: 10,
        borderRadius: 5,
    },
    suggestionsContainer: {
        backgroundColor: 'white',
        width: '100%',
    },
    suggestionItem: {
        padding: 10
    },

    
});


// ==================== UI ====================

    return (
        
            <Onboarding
            skipLabel={''}
            onDone={()=> { 
                handlesearch()
            }}
            //Page1
            pages={[
                {
                    
                    backgroundColor:'#a78bfa',
                    image: (
                        <SafeAreaView>
                            <View style={styles.container}>
                                    <Text style={styles.languageTitle}>{t('Language')}</Text>
                            <Picker
                                selectedValue={i18n.language}
                                onValueChange={(itemValue) => {
                                    handleLanguageChange(itemValue);
                                }}
                                style={styles.pickerStyle}
                                value={cityName}
                                onChangeText={(text) => {
                                    setCityName(text);
                                }}
                                > 
                                    {LanguageOptions.map((lang, index) =>(
                                        <Picker.Item key={index} label={lang.label} value={lang.value} color = 'white'
                                        />
                                    ))}
                            </Picker>
                            <View style={styles.lottie}>
                                <LottieView 
                                    source={require('../../assets/NewLanguagesAnimation.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie1}
                                /> 
                            </View>
                            </View>
                        </SafeAreaView>
                        
                    ),
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor:'#a78bfa',
                    image: (
                        <SafeAreaView>
                            <View style={styles.container}>
                                <Text style={[styles.title, {fontWeight: 'bold', fontSize: 70}]}>Can I Ball</Text>
                                <Text style={styles.title}>{t('Lets see what the weather says!')}</Text>
                            <View style={styles.lottie}>
                            <LottieView
                                        source={require('../../assets/ConfettiAnimation.json')}
                                        autoPlay
                                        loop
                                        style={styles.lottie2}
                                    /> 
                            </View>    
                            </View>
                        </SafeAreaView>
                    ),
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor:'#a78bfa',
                    image: (
                        <SafeAreaView>
                            <View style={styles.container}>
                                
                                <View style={styles.containerInput}>
                                <Text style={styles.cityTitle}>City</Text>
                                    {/* Searchbar */}
                                    <TextInput
                                        style={[styles.input, {backgroundColor: 'white'}]}
                                        placeholder={t("Enter city name")}
                                        value={cityName}
                                        onChangeText= {(text) => {
                                            setCityName(text);
                                            fetchSuggestions(text)
                                        }}
                                    >
                                    </TextInput>

                                    {/* Fetching suggestions */}
                                    {suggestions.length > 0 &&(
                                        <View style={styles.suggestionsContainer}>
                                            {suggestions.map((suggestion, index) =>(
                                                <TouchableOpacity
                                                    key= {index}
                                                    onPress={() => {
                                                        setCityName(suggestion);
                                                        setSuggestions([])
                                                    }}
                                                    >
                                                    <Text style={styles.suggestionItem}>{suggestion}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            <View style={styles.lottie}>
                            <LottieView
                                        source={require('../../assets/CityAnimation.json')}
                                        autoPlay
                                        loop
                                        style={styles.lottie3}
                                    /> 
                            </View>
                            </View>
                        </SafeAreaView>
                    ),
                    title: '',
                    subtitle: '',
                },
            ]}
            />
        
    )

    
}
