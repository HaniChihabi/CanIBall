// ==================== IMPORTS ====================

import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native"
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';


// ==================== CODE ====================
export default function OnboardingScreen() {

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: "black"
    },
    lottie1: {
        width: width * 0.7, // 80% of screen width
        height: height * 0.3, // 30% of screen height
        alignSelf: 'center',
        alignSelf: 'center',
            marginTop: height * 0.25, // 5% of screen height for top margin
    },
    lottie2: {
        width: width * 0.8, // 80% of screen width
        height: height * 0.3, // 30% of screen height
        alignSelf: 'center',
        alignSelf: 'center',
            marginTop: height * 0.25, // 5% of screen height for top margin
    },
    lottie3: {
        width: width * 0.7, // 80% of screen width
        height: height * 0.3, // 30% of screen height
        alignSelf: 'center',
        alignSelf: 'center',
        marginTop: height * 0.21, // 5% of screen height for top margin
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
                    backgroundColor:'#a78bfa',
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
