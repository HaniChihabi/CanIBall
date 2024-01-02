import {View, Text, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native';


export default function HomeScreen({navigation}) {
    const { width, height } = Dimensions.get('window');

    const handleReset= () => {
        try {
            navigation.reset({
                index: 0,
                routes:[{ name: 'Onboarding'}],
            });
        } catch (error) {
            console.error('Failed to reset onboarding:', error);
        }
    };
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

