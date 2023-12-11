import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewStyle from './../../Utils/MapViewStyle.json';
import { UserLocationContext } from '../../Contexts/UserLocationContext';

export default function AppMapView() {

    const { location, setLocation } = useContext(UserLocationContext);

    return location?.latitude && (
        <View>
            <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                //   showsUserLocation ={true}
                // showsBuildings = {true}
                customMapStyle={MapViewStyle}
                region={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location?.latitude,
                        longitude: location?.longitude,
                    }}>

                    <Image source={require('./../../../assets/images/ev_car_for_map.png')} style={{width: 40, height: 40}} />

                </Marker>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});