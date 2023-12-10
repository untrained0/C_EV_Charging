import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import FavouriteScreen from '../Screens/FavouriteScreen/FavouriteScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Search"
            activeColor='green'
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: Colors.WHITE, height: 70 }}
        >
            <Tab.Screen name="Search" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-search" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Favourite"
                component={FavouriteScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? (
                            <Ionicons name="heart" size={24} color="#ff0000" /> // Red when active
                        ) : (
                            <Ionicons name="heart-outline" size={24} color={color} /> // Green otherwise
                        )
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-circle" size={24} color={color} />
                    )
                }} />

        </Tab.Navigator>
    )
}
