import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState('Hanover');
    const [cityName, setCityName] = useState('');

    const handleSearch = () => {
        navigation.navigate('WeatherDisplayScreen', { cityName });
    };

    const City = [
        { city: 'Frankfurt' },
        { city: 'Miami' },
        { city: 'München' },
        { city: 'Hanover' },
        { city: 'Frankfurt' },
        { city: 'Miami' },
        { city: 'München' },
        { city: 'Hanover' },
        { city: 'Frankfurt' },
        { city: 'Miami' },
        { city: 'München' },
        { city: 'Hanover' },
        { city: 'Frankfurt' },
        { city: 'Miami' },
        { city: 'München' },
        { city: 'Hanover' },
        { city: 'Frankfurt' },
        { city: 'Miami' },
        { city: 'München' },
        { city: 'Hanover' },
    ];

    useEffect(() => {
        setSelected(City[0].city);
    }, []);

    const doneButton = ({ ...props }) => (
        <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => {
                navigation.navigate('Home', { selectedCity: selected });
            }} {...props}>
            <Text>Done</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={() => navigation.navigate('Home', { selected: selected })}
                onSkip={() => navigation.navigate('Home', { selected: selected })}
                DoneButtonComponent={doneButton}
                pages={[
                    {
                        backgroundColor: 'turquoise',
                        image: (
                            <SafeAreaView style={styles.container1}>
                                
                                <View style={styles.page1}>
                                <Text style={[styles.title, { fontSize: 70 }]}>Can I Ball</Text>
                                    <Text style={styles.subtitle}>Let's see what the weather says!</Text>
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
                    {
                        backgroundColor: '#a78bfa',
                        image: (
                            <SafeAreaView style={styles.container3}>
                                <LottieView
                                    source={require('../assets/NewGlobeAnimation.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie2}
                                />
                                <View style={styles.page2}>
                                    
                                <Text style={styles.title}>Choose Your Language!</Text>
                                </View>
                                    <Picker
                                        selectedValue={selected}
                                        onValueChange={(itemValue) => setSelected(itemValue)}
                                        style={styles.pickerStyle}
                                    >
                                        {City.map((city, index) => (
                                            <Picker.Item key={index.toString()} label={city.city} value={city.city} />
                                        ))}
                                    </Picker>
                                    
                               
                                
                            </SafeAreaView>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#a78bfa',
                        image: (
                            <SafeAreaView style={styles.container2}>
                                <LottieView
                                    source={require('../assets/CityAnimation.json')}
                                    autoPlay
                                    loop
                                    style={styles.lottie3}
                                />
                                <View style={styles.page3}>
                                  
                                <Text style={styles.title}>Now Your City!</Text>
                                    <View style={styles.containerInput}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter city name"
                                            value={cityName}
                                            onChangeText={setCityName}
                                        />
                                        <Button
                                            title="Search"
                                            onPress={handleSearch}
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
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerInput: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'relative',
    top:100
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
    height: 300,
    alignSelf: 'center',
    position: 'relative',
    top: 10,
  },
  lottie3: {
    width: 400,
    height: 300,
    alignSelf: 'center',
    position: 'relative',
    bottom: 30,
  },
  // page-contents
  page1:{
    position: 'relative',
    top: 120
  },
  page2:{
    position: 'relative',
    top:0,
  },
  page3:{
    position: 'relative',
    bottom: 90
  },
  title: {
    fontSize: 30,
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
    width: width * 0.8,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    borderRadius: 5,
},
  
});
