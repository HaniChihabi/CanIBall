import {View, Text, Stylesheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView, StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native';


export default function HomeScreen({navigation}) {
    const { width, height } = Dimensions.get('window');
    const styles = StyleSheet.create({
        baseContainer: {
            flex: 1,
            aligntitems: 'center',
            justifyContent: 'center'
        },
            lottie: {
                lottieContainer: {
                    width: width * 0.9,
                    height: width,position: 'relative',
                    bottom: 50
                },
            }
    })

    return (
        
            <SafeAreaView style={styles.baseContainer}>
                    <LottieView source={require('../../assets/SpinAnimation.json')} autoPlay loop style={styles.lottie} />

            </SafeAreaView>

    )
}

