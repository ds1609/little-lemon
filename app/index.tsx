import { Button, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Pressable } from "react-native";
import {styles} from "../styles/onboarding.styles"
import { Link, useNavigation, useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";

// SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [loaded, error] = useFonts({
    'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
    'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf')
  });

  const [name, setName] = useState("");
  const [emailid, setEmailId] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (loaded || error) {
      // SplashScreen.hideAsync();
      // console.log("isLoggedIn",isLoggedIn);
      // if(isLoggedIn){
      //   router.replace("/home");
      // }
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  

  const isNameValid = (value:string) => {
    // console.log(value);
    setName(value);
    // Only letters and spaces, at least 2 characters
    const nameRegex = /^[A-Za-z\s]{2,}$/;

    if (value.trim() === '') {
      setErrorMsg('Name is required');
      setIsFormValid(false);
    } else if (!nameRegex.test(value)) {
      setErrorMsg('Enter a valid name (letters only)');
      setIsFormValid(false);
    } else {
      setErrorMsg('');
      setIsFormValid(true);
    }
  }

  const isEmailValid = (value:string) => {
    // console.log(value);
    setEmailId(value);

    // Simple email regex
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setErrorMsg('Invalid email format');
      setIsFormValid(false);
    } else {
      setErrorMsg('');
      setIsFormValid(true);
    }
  }

  const handleNext = async () => {
    if(!isFormValid){
      return false;
    }
    console.log("Next clicked",name,emailid,isFormValid);
    // await AsyncStorage.setItem("isOnboardingCompleted",JSON.stringify(isFormValid));

    const userData = {
      // isOnboardingCompleted: isFormValid,
      first_name: name,
      emailid: emailid,
    };
    console.log("userData",userData);

    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('User data saved');
  
      // Redirect to home screen
      router.replace('/profile'); // or use navigation.navigate('Home')
    } catch (error) {
      console.error('Error saving user data:', error);
    }
    
    // try {
    //   await AsyncStorage.multiSet([
    //     ["first_name",name],
    //     ["emailid",emailid],
    //     ["isOnboardingCompleted",JSON.stringify(isFormValid)]
    //   ]);

    //   router.navigate("/profile");
    // } catch (error) {
    //   console.log("error",error);
    // }
  }

  return (
    <ScrollView
      style={styles.container}
    >
      <View style={styles.sectionHeader}>
        <Image source={require("../assets/images/Logo.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>Let us get to know you</Text>
      </View>

      <Text style={styles.styleLabel}>First Name *</Text>
      <TextInput style={styles.styleInput} placeholder="First Name" value={name} onChangeText={isNameValid} />
      
      <Text style={[styles.styleLabel,{marginTop:40}]}>Email ID *</Text>
      <TextInput style={[styles.styleInput,{marginBottom:56}]} keyboardType="email-address" placeholder="Email ID" value={emailid} onChangeText={isEmailValid} />

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <TouchableOpacity style={[styles.styleButton, {backgroundColor : errorMsg ? "#EDEFEE" : "#F4CE14"}]} onPress={handleNext}>
        <Text style={styles.textStyleButton}>Next</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}