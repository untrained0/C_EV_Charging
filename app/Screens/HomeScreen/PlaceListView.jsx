import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList } from 'native-base'
import PlaceItem from './PlaceItem'
import { SelectMarkerContext } from '../../Contexts/SelectMarkerContext';
import { getFirestore } from "firebase/firestore";
import { app } from '../../Utils/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';


export default function PlaceListView({ placeList }) {

  const db = getFirestore(app);
  const { user } = useUser();
  const flatListRef = useRef(null);
  const { selectMarker, setSelectMarker } = useContext(SelectMarkerContext);
  const [favList, setFavList] = useState([])

  useEffect(() => {
    user&&getFav();
  },[user])

  const getFav = async () => {
    const q = query(collection(db, "EV_fav"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFavList(favList => [...favList, doc.data()]);
    });
  }


  useEffect(() => {
    if (placeList.length > 0 && selectMarker) {
      scrollToIndex(selectMarker);
    }
  }, [selectMarker, placeList])

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index })
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index
  })

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem place={item} />
          </View>
        )}
      />
    </View>
  )
}