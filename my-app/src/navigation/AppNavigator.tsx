import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useTheme } from '../context/ThemeContext';
import { onAuthStateChanged } from '../services/auth';
import { User } from '../types';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

const AuthNavigator: React.FC = () => {
  const { colors } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
      SplashScreen.hideAsync();
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 52, color: colors.white }}>💪</Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.white, letterSpacing: 1 }}>WORKOUT</Text>
        <Text style={{ fontSize: 26, fontWeight: '300', color: colors.white, letterSpacing: 6, marginTop: -2 }}>TRACKER</Text>
        <ActivityIndicator size="small" color={colors.white} style={{ marginTop: 32 }} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;