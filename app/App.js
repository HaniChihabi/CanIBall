import 'intl-pluralrules'
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './i18n'; // Import your i18n configuration
// Import the necessary modules
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

export default function App() {

         useEffect(() => {
           const setLanguage = async () => {
             const language = await AsyncStorage.getItem('appLanguage');
             if (language) {
               i18n.changeLanguage(language);
             }
           };
           setLanguage();
         }, []);
      
        // ...
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Loading">
            <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
