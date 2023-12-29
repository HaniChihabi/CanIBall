import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
                if (onboardingCompleted === 'true') {

                    // Retrieve city name
                    const storedCityName = await AsyncStorage.getItem('city');
                    // Navigate to the Home screen and pass the city name
                    navigation.removeListener
                    navigation.replace('Home', { selectedCity: storedCityName });
                } else {
                    // If onboarding is not completed, navigate to the Onboarding screen
                    navigation.removeListener
                    navigation.replace('Onboarding');
                }
            } catch (error) {
                // Handle errors, navigate to Onboarding as a safe default
                navigation.removeListener
                navigation.replace('Onboarding');
            }
        };

        checkOnboarding();
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" />
        </View>
    );
};

export default LoadingScreen;
