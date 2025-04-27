import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HeaderTitle from "./components/headerTitle";
import HeaderRight from "./components/headerRight";
import HeaderLeft from "./components/headerLeft";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [shortName, setShortName] = useState("");

  const checkLoginStatus = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      let fName = user.first_name ? user.first_name.charAt(0) : "";
      let lName = user.last_name ? user.last_name.charAt(0) : "";
      let shortName = fName+lName;
      setShortName(shortName);
      setImage(user.photo);

      setIsLoggedIn(true);
      setTimeout(() => {
        router.replace('/home');
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

  const handleProfileIcon = () => {
    // console.log("handleProfileIcon");
    router.navigate("/profile");
  }

  const handleBackButton = () => {
    // console.log("handleBackButton");
    if(isLoggedIn){
      router.back();
    }
  }
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="home" options={{
        headerTitle: () => <HeaderTitle  />,
        headerRight: () => <HeaderRight image={image} shortName={shortName} handleProfileIcon={handleProfileIcon} />,
      }} />
      <Stack.Screen name="profile" options={{
        headerTitle: () => <HeaderTitle />,
        headerRight: () => <HeaderRight image={image} shortName={shortName} handleProfileIcon={handleProfileIcon} />,
        headerLeft: () => <HeaderLeft isLoggedIn={isLoggedIn} handleBackButton={handleBackButton} />
      }} />
    </Stack>
  );
}
