import { Text, TextInput, View, Image, TouchableOpacity, ScrollView } from "react-native";
import Checkbox from 'expo-checkbox';
import { stylesProfile } from "../styles/profile.styles";
import { useEffect, useState } from "react";
import { MaskedTextInput } from 'react-native-mask-text';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
// import * as FileSystem from 'expo-file-system';

export default function Profile() {
  const router = useRouter();
  
  const [shortName, setShortName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const user = JSON.parse(value);
        console.log('User:', user);
        setImage(user.photo);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmailid(user.emailid);
        setPhone(user.phone);

        let fName = user.first_name ? user.first_name.charAt(0) : "";
        let lName = user.last_name ? user.last_name.charAt(0) : "";
        let shortName = fName+lName;
        setShortName(shortName);
        // return user;
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // const saveImagePermanently = async (imageUri: string) => {
  //   const fileName = imageUri.split('/').pop();
  //   const newPath = FileSystem.documentDirectory + "" + fileName;
    
  //   // console.log("newPath",newPath);

  //   await FileSystem.copyAsync({
  //     from: imageUri,
  //     to: newPath,
  //   });
  
  //   return newPath;
  // };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("ImagePicker",result);

    if (!result.canceled) {
      const selectedPhotoUri = result.assets[0].uri;

      // const permanentUri = await saveImagePermanently(selectedPhotoUri);
      setImage(selectedPhotoUri);
    }
  };

  const handleLogout = () => {
    // console.log("handleLogout");
    AsyncStorage.clear()
      .then(() => {
        console.log('AsyncStorage cleared!');
        router.replace('/');
      })
      .catch((error) => {
        console.error('Error clearing AsyncStorage:', error);
      });
  }

  const handleChanges = async () => {
    // console.log("handleChanges");
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        let user = value ? JSON.parse(value) : {};
        // console.log('User:', user);
        
        const userData = {
          first_name: firstName,
          last_name: lastName,
          emailid: emailid,
          phone: phone,
          photo: image
        };

        try {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          // console.log('User data updated');
          getUserData();
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  }

  return (
    <ScrollView style={stylesProfile.container}>
      <View style={stylesProfile.styleSectionTitle}>
        <Text style={stylesProfile.BodyTitle}>Personal information</Text>
      </View>

      <View style={stylesProfile.styleSectionForm}>
        <Text style={stylesProfile.styleLabel}>Avatar</Text>
        <View style={stylesProfile.styleSectionAvatar}>
          {image ? (
            <Image source={{ uri: image }} style={stylesProfile.profilePhoto} />
          ) : (
            <View style={stylesProfile.defaultPhotoSection}>
              <Text style={stylesProfile.defaultPhotoText}>{shortName}</Text>
            </View>
          )}
          
          <TouchableOpacity style={stylesProfile.primaryButton} onPress={pickImage}>
            <Text style={stylesProfile.primaryButtonText}>Change</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesProfile.secondaryButton} >
            <Text style={stylesProfile.secondaryButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={stylesProfile.styleSectionForm}>
        <Text style={stylesProfile.styleLabel}>First Name</Text>
        <TextInput style={stylesProfile.styleInput} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      </View>

      <View style={stylesProfile.styleSectionForm}>
        <Text style={stylesProfile.styleLabel}>Last Name</Text>
        <TextInput style={stylesProfile.styleInput} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      </View>

      <View style={stylesProfile.styleSectionForm}>
        <Text style={stylesProfile.styleLabel}>Email</Text>
        <TextInput style={stylesProfile.styleInput} placeholder="Email" value={emailid} onChangeText={setEmailid} />
      </View>

      <View style={stylesProfile.styleSectionForm}>
        <Text style={stylesProfile.styleLabel}>Phone Number</Text>
        {/* <TextInput style={stylesProfile.styleInput} placeholder="Phone Number" value={phone} onChangeText={setPhone} /> */}
        <MaskedTextInput
          mask="(999) 999-9999"
          onChangeText={(text, rawText) => {
            setPhone(rawText); // rawText = unformatted number
            // console.log('Formatted:', text);
            // console.log('Raw:', rawText);
          }}
          value={phone}
          keyboardType="numeric"
          placeholder="(123) 456-7890"
          style={stylesProfile.styleInput}
        />
      </View>

      <Text style={stylesProfile.BodyTitle}>Email notifications</Text>
      <View style={{marginBottom:40}}>
        <View style={stylesProfile.styleSectionCheckBox}>
          <Checkbox style={stylesProfile.styleCheckbox} color={"#495E57"} value={true} onValueChange={() => console.log("")} />
          <Text style={stylesProfile.styleLabel}>Order statuses</Text>
        </View>
        
        <View style={stylesProfile.styleSectionCheckBox}>
          <Checkbox style={stylesProfile.styleCheckbox} color={"#495E57"} value={true} onValueChange={() => console.log("")} />
          <Text style={stylesProfile.styleLabel}>Password changes</Text>
        </View>

        <View style={stylesProfile.styleSectionCheckBox}>
          <Checkbox style={stylesProfile.styleCheckbox} color={"#495E57"} value={true} onValueChange={() => console.log("")} />
          <Text style={stylesProfile.styleLabel}>Special offers</Text>
        </View>

        <View style={stylesProfile.styleSectionCheckBox}>
          <Checkbox style={stylesProfile.styleCheckbox} color={"#495E57"} value={true} onValueChange={() => console.log("")} />
          <Text style={stylesProfile.styleLabel}>Newsletter</Text>
        </View>
      </View>

      <View style={{marginBottom:40}}>
        <TouchableOpacity style={stylesProfile.logoutButton} onPress={handleLogout}>
          <Text style={stylesProfile.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
        
      <View style={stylesProfile.sectionFooter}>
        <TouchableOpacity style={stylesProfile.secondaryButton} >
          <Text style={stylesProfile.secondaryButtonText}>Discard changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesProfile.primaryButton} onPress={handleChanges}>
            <Text style={stylesProfile.primaryButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


