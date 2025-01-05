import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For icons
import Home from './src/screens/Home';
import Favourites from './src/screens/Favourites';
import Bookmark from './src/screens/Bookmark';
import Settings from './src/screens/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favourites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Bookmark') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato', // Active tab color
          tabBarInactiveTintColor: 'gray', // Inactive tab color
        })}
      >
        {/* Home Screen with Top Bar Title */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Movie Store', // Title for the top bar
            headerStyle: {
              backgroundColor: 'tomato', // Background color of the top bar
            },
            headerTintColor: '#fff', // Text color of the top bar
            headerTitleStyle: {
              fontWeight: 'bold', // Bold title
            },
          }}
        />

        {/* Favourites Screen */}
        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{
            title: 'Favourites', // Title for the top bar
            headerStyle: {
              backgroundColor: 'tomato', // Background color of the top bar
            },
            headerTintColor: '#fff', // Text color of the top bar
            headerTitleStyle: {
              fontWeight: 'bold', // Bold title
            },
          }}
        />

        {/* Bookmark Screen */}
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            title: 'Bookmark', // Title for the top bar
            headerStyle: {
              backgroundColor: 'tomato', // Background color of the top bar
            },
            headerTintColor: '#fff', // Text color of the top bar
            headerTitleStyle: {
              fontWeight: 'bold', // Bold title
            },
          }}
        />

        {/* Settings Screen */}
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings', // Title for the top bar
            headerStyle: {
              backgroundColor: 'tomato', // Background color of the top bar
            },
            headerTintColor: '#fff', // Text color of the top bar
            headerTitleStyle: {
              fontWeight: 'bold', // Bold title
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}