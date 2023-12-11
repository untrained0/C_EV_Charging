import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
// import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio, ScrollView } from 'native-base';
import * as WebBrowser from "expo-web-browser";
import Colors from '../../Utils/Colors'
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser";


WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <View style={{ marginTop: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>EV</Text>
        <Image style={styles.logo_image} source={require('./../../../assets/images/ev_car_logo.png')} />
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>STATION</Text>
      </View>
      <Image style={styles.bottom_image} source={require('./../../../assets/images/ev_car.png')} />

      {/* <Text style={{ textAlign: 'center', marginTop: 80, fontSize: 20 }}>Login/Signup</Text> */}
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Your EV Charging Station Finder App</Text>
        <Text style={styles.subtitle}>Find EV Charging Stations near and you and enjoy your journey.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>

        <Image source={require('./../../../assets/images/google_logo.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
        <Text style={{ color: Colors.WHITE, fontSize: 17, fontFamily: 'outfit', textAlign: 'center' }}>Sign In with Google</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    marginTop: 70,
    borderRadius: 99,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo_image: {
    width: 50,
    height: 100,
    objectFit: 'contain',
  },
  bottom_image: {
    width: '100%',
    height: 140,
    objectFit: 'cover'
  },
  title: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 20
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'outfit',
    textAlign: 'center',
    color: Colors.GRAY,
    marginTop: 15
  }
});
