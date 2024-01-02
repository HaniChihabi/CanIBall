// ==================== IMPORTS ====================

import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput} from "react-native"
import { Picker } from '@react-native-picker/picker';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';




// ==================== CODE ====================

export default function OnboardingScreen() {

const { width, height } = Dimensions.get('window');
// for translation
const {t, i18n } = useTranslation();
const navigation = useNavigation(); // Use the useNavigation hook here

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
    },   
    // ======== picker ========

    pickerStyle: {
        position: 'absolute',
        width: width * 1,
        alignSelf: 'center',
        top: '30%',
        
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
    }

    
});


// ==================== UI ====================

    return (
        
            <Onboarding
            skipLabel={''}
            onDone={()=> { 
                navigation.navigate("Home")
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
                                itemStyle={{ fontSize: 40}}
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
                                    <TextInput
                                    style={[styles.input, {backgroundColor: 'white'}]}
                                    placeholder={t("Enter city name")}
                                    >
                                    </TextInput>
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
