// ==================== IMPORTS ====================

import { SafeAreaView, View, StyleSheet } from "react-native"
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';


// ==================== CODE ====================
export default function OnboardingScreen() {


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
                    backgroundcolor:'#a78bfa',
                    image: (
                        <SafeAreaView>
                            <LottieView
                                        source={require('../../assets/NewLanguagesAnimation.json')}
                                        autoPlay
                                        loop
                                        style={styles.lottie1}
                                    /> 
                        </SafeAreaView>
                    ),
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundcolor:'#a78bfa',
                    image: (
                        <SafeAreaView>
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
                    backgroundcolor:'#a78bfa',
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
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            color: "black"
        },
        lottie1: {
            width: 300,
            height: 200,
            alignSelf: 'center',
            position: 'relative',
            top: 100, // Adjust this value as needed
        },
        lottie2: {
            width: 300,
            height: 200,
            alignSelf: 'center',
            position: 'relative',
            top: 100, // Adjust this value as needed
        },
        lottie3: {
            width: 300,
            height: 200,
            alignSelf: 'center',
            position: 'relative',
            top: 100, // Adjust this value as needed
        },
    })