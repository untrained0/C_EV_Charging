import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Contexts/SelectMarkerContext';

export default function Markers({ place, index }) {

    const [isSelected, setIsSelected] = useState(false); // Tracks current selection state

    const { selectMarker, setSelectMarker } = useContext(SelectMarkerContext);
  
    // Update selection state based on context and own state
    useEffect(() => {
      if (selectMarker === index) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    }, [selectMarker, index]);
    return place&&(
        // <View>
        //     <Text>SOham</Text>
        // </View>

        <Marker
  coordinate={{
    latitude: place?.location?.latitude,
    longitude: place?.location?.longitude,
  }}
  onPress={() => {
    setIsSelected(!isSelected); // Toggle selection on click
    setSelectMarker(index); // Update context with selected marker
  }}
>
  <Image
    source={isSelected ? require('./../../../assets/images/marker_green.png') : require('./../../../assets/images/marker.png')}
    style={{ width: 60, height: 60 }}
  />
</Marker>


    )
}