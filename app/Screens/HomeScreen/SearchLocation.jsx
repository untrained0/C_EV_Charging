import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function SearchLocation({searchedLocation}) {
    return (
        <View style={{display:'flex', flexDirection:'row', marginTop: -5, borderRadius: 6, paddingHorizontal: 5, backgroundColor: Colors.WHITE}}>
            <Ionicons name="location-sharp" size={24} color="black" style={{paddingTop: 10}}/>
            <GooglePlacesAutocomplete
                placeholder='Search'
                enablePoweredByContainer = {false}
                fetchDetails = {true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.log(data, details);
                    searchedLocation(details?.geometry?.location);
                }}
                query={{
                    key: 'AIzaSyB9ctiAb-J9CZil_ZlpAg3ZOXpxwudHlNw',
                    language: 'en',
                }}
            />
        </View>
    )
}