import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import SearchLocation from './SearchLocation';

export default function Header() {

    const { user } = useUser();

    return (
        <View style={{display: 'flex', flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -30}} >
            <Image source={{ uri: user?.imageUrl }}
                style={{ width: 45, height: 45, borderRadius: 99 }}
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>EV</Text>
                <Image style={styles.logo_image} source={require('./../../../assets/images/ev_car_logo.png')} />
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>STATION</Text>
            </View>
            <FontAwesome name="filter" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    logo_image: {
        width: 50,
        height: 100,
        objectFit: 'contain',
    }
});
