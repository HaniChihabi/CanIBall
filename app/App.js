import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/appNavigation'; // Ensure this path is correct
import i18n from './i18n'; // Import your i18n configuration
import 'intl-pluralrules';
import '@formatjs/intl-pluralrules/polyfill';




export default function App() {
    const App = () => {
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
      };
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
