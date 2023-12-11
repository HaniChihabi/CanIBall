import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('Hanover');

  useEffect(() => {
    setItem('onboarded', '1');
  }, []);

  const people = [
    { city: 'Frankfurt' },
    { city: 'Miami' },
    { city: 'München' },
    { city: 'Hanover' },
  ];

  const doneButton = ({ ...props }) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <Text>Done</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={() => navigation.navigate('Home')}
        onSkip={() => navigation.navigate('Home')}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: 'turquoise',
            image: (
                <SafeAreaView style={styles.container1}>
                    <LottieView
                        source={require('../assets/SpinAnimation.json')}
                        autoPlay
                        loop
                        style={styles.lottie1}
                    />
                     <View style={styles.page1}>
                    <Text style={styles.title}>Choose Your City!</Text>
                    </View>
              </SafeAreaView>

            ),
            
            title: '',
            subtitle: "",
          },
          {
            backgroundColor: 'lightgreen',
            image: (
              <SafeAreaView style={styles.container1}>
                <LottieView
                  source={require('../assets/CityAnimation.json')}
                  autoPlay
                  loop
                  style={styles.lottie2}
                />
                <View style={styles.page2}>
                <Text style={styles.title}>Choose Your City!</Text>
                <Picker
                  selectedValue={selected}
                  onValueChange={(itemValue) => setSelected(itemValue)}
                  style={styles.pickerStyle}
                >
                  {people.map((city, index) => (
                    <Picker.Item key={index.toString()} label={city.city} value={city.city} />
                  ))}
                </Picker>
                </View>
              </SafeAreaView>
            ),
            title: '',
            subtitle: "",
          },
          {
            backgroundColor: '#a78bfa',
            image: (
                <SafeAreaView style={styles.container1}>
                    <LottieView
                        source={require('../assets/AmigoAnimation.json')}
                        autoPlay
                        loop
                        style={styles.lottie3}
                    />
                    <View style={styles.page3}>
                      <Text style={styles.title}>Choose Your City!</Text>
                    </View>
              </SafeAreaView>

            ),
            title: '',
            subtitle: "",
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
  lottie1: {
    width: 400,
    height: 300,
    alignSelf: 'center',
  },
  lottie2: {
    width: 400,
    height: 300,
    alignSelf: 'center',
  },
  lottie3: {
    width: 400,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  doneButton: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: '100%',
    borderBottomLeftRadius: '100%',
  },
  pickerStyle: {
    marginTop: -20,
    width: width * 0.8,
    alignSelf: 'center',
  },
  page1:{
    position: 'relative',
    top:100
  },
  page2:{
    position: 'relative',
    top:100
  },
  page3:{
    position: 'relative',
    top:100
  },
});
