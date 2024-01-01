// =============== IMPORTS ================

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/Onboarding/OnboardingScreen';

// import 'intl-pluralrules'
// import React, {useEffect} from 'react';
// import i18n from './i18n'; // Import your i18n configuration
// import LoadingScreen from './screens/LoadingScreen';
// import HomeScreen from './screens/HomeScreen';

// ============== CODE ====================

const Stack = createStackNavigator();




export default function App() {

        // useEffect(() => {
        //   const setLanguage = async () => {
        //     const language = await AsyncStorage.getItem('appLanguage');
        //     if (language) {
        //       i18n.changeLanguage(language);
        //     }
        //   };
        //   setLanguage();
        // }, []);
      
        // ...

// =============== UI ================

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding">
            {/* <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
