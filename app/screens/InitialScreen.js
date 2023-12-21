import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    checkInitialStatus();
  }, []);

  const checkInitialStatus = async () => {
    const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
    const lastCity = await AsyncStorage.getItem('city');

    if (onboardingCompleted === 'true' && lastCity) {
      // Navigate to Home with last selected city
      navigation.replace('Home', { selectedCity: lastCity });
    } else {
      navigation.replace('Onboarding');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default InitialScreen;
