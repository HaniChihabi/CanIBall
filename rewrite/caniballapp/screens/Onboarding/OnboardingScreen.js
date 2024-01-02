// ==================== IMPORTS ====================

import { SafeAreaView, View, Text, StyleSheet, Dimensions} from "react-native"
import { Picker } from '@react-native-picker/picker';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";



// ==================== CODE ====================

export default function OnboardingScreen() {

const { width, height } = Dimensions.get('window');
// for translation
const {t, i18n } = useTranslation();
const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    AsyncStorage.setItem('appLanguage', language);
  };
const LanguageOptions= [
    {label: t('Languages'), value: 'lng'},
    {label: t('English'), value: 'en'},
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

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: "black"
    },
    lottie: {
        position: 'absolute',
        alignSelf: 'center',
    },
    lottie1: {
        width: width * 0.7,
        height: height * 0.22,
        alignSelf: 'center',
        top: '57%',
    },
    lottie2: {
        width: width * 0.2, 
        height: height * 0.22,
        alignSelf: 'center',
        top: '50%',
    },
    lottie3: {
        width: width * 0.7,
        height: height * 0.3,
        alignSelf: 'center',
        top: '34%',
    },
    titles: {
        position: 'absolute',
        top: '45%', // Adjust this to move text up or down
        alignSelf: 'center',
        alignItems: 'center',
        color: 'white'
    },
    title: {
        color: 'white'
    },
    pickerStyle: {
        marginTop: 50,
        width: 400,
        alignSelf: 'center',
        position: 'relative',
        bottom: 50,
    },
    
});


// ==================== UI ====================

    return (
        <View style={styles.container}>
            <Onboarding
            skipLabel={''}
            onDone={()=> { 
                handleSearch();
            }}
            //Page1
            pages={[
                {
                    backgroundColor:'#a78bfa',
                    image: (
                        <SafeAreaView>
                            <Picker
                                selectedValue={i18n.language}
                                onValueChange={(itemValue) => {
                                    handleLanguageChange(itemValue);
                                }}
                                style={styles.pickerStyle}
                                itemStyle={{fontWeight: 'bold', fontSize: 40}}
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
                        </SafeAreaView>
                    ),
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor:'#a78bfa',
                    image: (
                        <SafeAreaView>
                            <View style={styles.titles}>
                                <Text style={[styles.title, {fontSize: 70}]}>Can I Ball</Text>
                                <Text style={styles.title}>{"Let's see what the weather says!"}</Text>
                            </View>
                            <LottieView
                                        source={require('../../assets/ConfettiAnimation.json')}
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
                    backgroundColor:'#a78bfa',
                    image: (
                        <SafeAreaView>
                            <LottieView
                                        source={require('../../assets/CityAnimation.json')}
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
    )

    
}
