import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/appNavigation'; // Ensure this path is correct

export default function App() {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
