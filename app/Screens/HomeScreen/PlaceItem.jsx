import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import secret_keys from '../../../secret_keys';



export default function PlaceItem({ place }) {

    const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

    return (
        <View style={{
            width: Dimensions.get('screen').width * .9,
            backgroundColor: Colors.WHITE,
            margin: 5,
            borderRadius: 10,
        }}>
            <LinearGradient
                colors={['transparent', '#ffffffff', '#ffffff']}
            >
                <Image source={
                    place?.photos ?
                        { uri: PLACE_PHOTO_BASE_URL + place?.photos[0]?.name + "/media?key=" + secret_keys.API_KEY + "&maxHeightPx=800&maxWidthPx=1200" }
                        : require('./../../../assets/images/ev_car.png')
                } style={{ width: '100%', height: 140, zIndex: -1 }} />
                <View style={{
                    padding: 15,

                }}>
                    <Text style={{ fontFamily: 'outfit-medium', fontSize: 23 }}>{place?.displayName?.text}</Text>
                    <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }}>{place?.shortFormattedAddress}</Text>
                </View>
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 20}}>
                    {place?.evChargeOptions?.connectorCount > 0
                        ?
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            padding: 5
                        }}>
                            <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 17 }}>{place?.evChargeOptions?.connectorCount === 1?'Connector: ':'Connectors: '}</Text>
                            <Text style={{ fontFamily: 'outfit-medium', fontSize: 17, }}>{place?.evChargeOptions?.connectorCount}</Text>
                        </View>
                        :
                        <View>
                            <Text style={{ fontFamily: 'outfit-medium', fontSize: 17, }}>{place?.evChargeOptions?.connectorCount}</Text>
                        </View>}
                    <View style={{backgroundColor: Colors.PRIMARY, padding: 12, marginBottom: 6, borderRadius: 6, paddingHorizontal:14}}>
                        <FontAwesome name="location-arrow" size={25} color="white" />
                    </View>
                </View>

            </LinearGradient>
        </View>
    )
}