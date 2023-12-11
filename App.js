import { StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from "expo-secure-store";

import * as Location from 'expo-location';

import SignUpScreen from './app/Screens/LoginScreen/SignUpScreen';
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
import { UserLocationContext } from './app/Contexts/UserLocationContext';
import { NativeBaseProvider } from 'native-base';

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = "pk_test_bG92aW5nLW95c3Rlci05NC5jbGVyay5hY2NvdW50cy5kZXYk";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location?.coords);
      console.log(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  const [fontsLoaded] = useFonts({
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Add a loading indicator or return null
    return null;
  }

  return (
    
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY} >
            <NativeBaseProvider>

        <UserLocationContext.Provider value={{location, setLocation}}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>

        <SignedOut>
          <SignUpScreen />
        </SignedOut>
      </View>
      </UserLocationContext.Provider>
      </NativeBaseProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 35
  }
})
