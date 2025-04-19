import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Redirect, usePathname } from 'expo-router';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [shortName, setShortName] = useState("");

  const checkLoginStatus = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      let fName = user.first_name ? user.first_name.charAt(0) : "";
      let lName = user.last_name ? user.last_name.charAt(0) : "";
      let shortName = fName+lName;
      setShortName(shortName);
      
      setTimeout(() => {
        router.replace('/profile');
      }, 2000);
    } else {
      setTimeout(() => {
        router.replace('/'); // or login screen
      }, 2000);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" options={{
        headerTitle: () => { 
          return (
            <Image 
              source={require("../assets/images/Logo.png")} 
              style={{
                height:56,
                width:179,
                resizeMode:"contain",
                alignSelf:"center"
              }} />
          ); 
        },
        headerRight: () => {
          return (
            // <Image 
            //   source={require("../assets/images/Profile.png")} 
            //   style={{
            //     height:47,
            //     width:50,
            //     resizeMode:"contain"
            //   }} />
            <View style={{
              backgroundColor:"#495E57",
              height:44,
              width:44,
              borderRadius:22,
              justifyContent:"center",
              // marginTop:10
            }}>
              <Text style={{
                textAlign:"center",
                fontFamily:"Karla-Regular",
                fontSize:22,
                color:"#EDEFEE"
              }}>{shortName}</Text>
            </View>
          );
        },
        headerLeft: () => {
          return (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={{ backgroundColor:"#495E57", padding:5, borderRadius:50,opacity:0.8 }}
              // onPress={() => router.back()}
              onPress={() => {}}
            />
          );
        }
      }} />
    </Stack>
  );
}
