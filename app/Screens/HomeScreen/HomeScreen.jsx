import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import SearchLocation from './SearchLocation'
import { UserLocationContext } from '../../Contexts/UserLocationContext'
import GlobalApi from '../../Utils/GlobalApi'
import PlaceListView from './PlaceListView'

export default function HomeScreen() {

  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    location&&GetNearByPlaces();
  }, [location]);

  const GetNearByPlaces = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude},
          "radius": 5000.0
        }
      }
    }
    GlobalApi.NewNearByPlaces(data).then(resp => {
      // console.log("data : ",JSON.stringify(resp.data?.places));
      setPlaceList(resp.data?.places);
      // console.log(placeList);
    })

  }

  
  return (
    <View>
      <View style={styles.headerContainer}>
        <Header />
        <SearchLocation searchedLocation={(location) => console.log(location)}/>
      </View>
      <AppMapView />
      <View style={{position: 'absolute', zIndex: 10, bottom: 0, width: '100%'}}>
       {placeList&& <PlaceListView placeList = {placeList}/>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer : {
    position: 'absolute',
    zIndex : 1,
    padding: 10,
    width: '100%',
    // marginTop: 10,
    paddingHorizontal: 20
  }})