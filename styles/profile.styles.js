import { StyleSheet } from "react-native";

export const stylesProfile = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"white",
      padding:25
    },
    BodyTitle:{
      fontSize:28, 
      fontFamily:"MarkaziText-Regular"
    },
    styleLabel:{
      fontFamily:"Karla-Regular",
      fontSize:18
    },
    styleInput: {
      borderWidth:1,
      borderColor:"#E6E5EA",
      borderRadius:8,
      marginTop:10,
      fontFamily:"Karla-Regular",
      fontSize:18
    },
    styleSectionTitle: {
      marginBottom:10
    },
    styleSectionForm: {
      marginBottom:20
    },
    styleSectionAvatar: {
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
    },
    styleSectionCheckBox: {
      flexDirection:"row",
      alignItems:"center"
    },
    profilePhoto: {
      // borderWidth:1,
      // borderColor:"#F4CE14",
      height:80,
      width:80,
      resizeMode:"cover",
      marginTop:10,
      borderRadius:40,
    },
    primaryButton: {
      borderRadius:5,
      backgroundColor:"#495E57"
    },
    primaryButtonText: {
      color:"#EDEFEE",
      textAlign:"center",
      fontFamily:"Karla-Regular",
      margin:8,
      fontSize:18
    },
    secondaryButton: {
      borderRadius:5,
      backgroundColor:"#FFFFFF",
      borderWidth:1,
      borderColor: "#495E57"
    },
    secondaryButtonText: {
      color:"#495E57",
      textAlign:"center",
      fontFamily:"Karla-Regular",
      margin:8,
      fontSize:18
    },
    styleCheckbox: {
      margin:8
    },
    logoutButton: {
      borderRadius:5,
      backgroundColor:"#F4CE14",
      marginRight:20,
      width:"100%"
    },
    logoutButtonText: {
      color:"#333333",
      textAlign:"center",
      fontFamily:"Karla-Regular",
      margin:8,
      fontSize:16,
      fontWeight:"700"
    },
    sectionFooter: {
        marginBottom:70,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    defaultPhotoSection: {
      backgroundColor:"#F4CE14",
      height:72,
      width:79,
      borderRadius:50,
      justifyContent:"center",
      marginTop:10
    },
    defaultPhotoText: {
      textAlign:"center",
      fontFamily:"Karla-Regular",
      fontSize:40,
      color:"#333333"
    }
  });