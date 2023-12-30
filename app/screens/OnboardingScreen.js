import React, { useState, useEffect } from 'react';
import { View, Text, LogBox, TextInput, StyleSheet, Dimensions, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';


export default function OnboardingScreen() {
    const navigation = useNavigation();
    const [cityName, setCityName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const {t, i18n } = useTranslation();
    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        AsyncStorage.setItem('appLanguage', language);
      };

const LanguageOptions = [
    { label: t('Languages'), value: 'ln' },   
    { label: t('Araby'), value: 'ar' },
    { label: t('Chinese'), value: 'ch' },
    { label: t('English'), value: 'en' },
    { label: t('French'), value: 'fr' },
    { label: t('German'), value: 'de' },
    { label: t('Japanese'), value: 'jp' },
    { label: t('Kurdish'), value: 'kr' },
    { label: t('Portuguese'), value: 'pt' },  
    { label: t('Russian'), value: 'rs' },
    { label: t('Spanish'), value: 'es' },
    { label: t('Swedish'), value: 'sv' },
    // ... add other languages
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

    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);


    // Enter the city name, store it & send it to homescreen
    const handleSearch = async () => {
        // Validate the input
        if (cityName.trim() === '') {
            alert(t('Please enter a city name'));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }
    
        // Check if the entered city is in the list of suggestions
        if (!suggestions.includes(cityName)) {
            alert(t('Please enter a valid city name'));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }
    
        // Store data and send city name to homescreen
        try {
            await AsyncStorage.setItem('city', cityName);
            navigation.navigate('Home', { selectedCity: cityName });
            await AsyncStorage.setItem('onboardingCompleted', 'true');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            alert(t('An error occurred. Please try again later.'));
            navigation.navigate('Onboarding');
        }
    };

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
                        backgroundColor: '#a78bfa',
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
    width: 400,
    height: 200,
    alignSelf: 'center',
    position: 'relative',
    top: 53,
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
    top: 100
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
    fontSize: 40,
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
    bottom: 0,
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
    top:20,
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