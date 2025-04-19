import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"white",
      padding:25
    },
    errorText: {
      color: 'red',
      marginTop: 5,
    },
    sectionHeader: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom:80
    },
    logo:{
      height:56,
      width:179,
      resizeMode:"contain",
      marginBottom:44
    },
    headerTitle:{
      fontSize:40, 
      fontFamily:"MarkaziText-Regular"
    },
    styleLabel:{
      fontFamily:"Karla-Regular",
      fontSize:18
    },
    styleInput: {
      borderWidth:1,
      borderColor:"#EDEFEE",
      borderRadius:8,
      backgroundColor:"#EDEFEE",
      marginTop:10,
      fontFamily:"Karla-Regular",
      fontSize:18
    },
    styleButton: {
      width:60,
      height:35,
      borderRadius:5,
      alignSelf:"flex-end"
    },
    activeButton: {
      backgroundColor: "#F4CE14"
    },
    inactiveButton: {
      backgroundColor: "#EDEFEE"
    },
    textStyleButton: {
      color:"#333333",
      textAlign:"center",
      fontFamily:"Karla-Regular",
      marginVertical:8,
      fontSize:18
    }
});