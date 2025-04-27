import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"white"
    },
    styleInput: {
      fontFamily:"Karla-Regular",
      fontSize:18,
    },
    sectionBanner: {
      backgroundColor:"#495E57",
      paddingHorizontal:25,
      paddingVertical:20
    },
    bannerTitle: {
      color:"#F4CE14",
      fontFamily:"MarkaziText-Regular",
      fontSize:64,
      fontWeight:"medium"
    },
    bannerSubTitle: {
      color:"#EDEFEE",
      fontFamily:"MarkaziText-Regular",
      fontSize:40,
      fontWeight:"regular"
    },
    bannerDescription: {
      color:"#EDEFEE",
      fontFamily:"Karla-Regular",
      fontSize:18,
      fontWeight:"medium"
    },
    sectionBannerImage: {
      width:"35%",
      alignItems:"flex-end"
    },
    bannerImage: {
      width:125, 
      height:150, 
      borderRadius:16,
      resizeMode:"cover"
    },
    sectionBannerSearch: {
      flexDirection:"row",
      borderRadius:8,
      backgroundColor:"#EDEFEE",
      paddingHorizontal:10,
      marginTop:15
    },
    iconSearch: {
      marginRight:8,
      alignSelf:"center",
      color:"#333333",
      fontSize:20
    },
    sectionFilters: {
      padding:25,
      borderBottomWidth:1,
      borderBottomColor:"#EDEFEE"
    },
    sectionFiltersTitle: {
      fontFamily:"Karla-Regular",
      fontSize:24,
      fontWeight:"bold",
      marginBottom:15
    },
    sectionMenus: {
      backgroundColor:"#FFFFFF",
      padding:25
    },
    menuTitle: {
      fontFamily:"Karla-Regular",
      fontSize:20,
      fontWeight:"bold",
      marginBottom:10
    },
    menuDescription: {
      fontFamily:"Karla-Regular",
      fontSize:16,
      fontWeight:"regular",
      marginBottom:10
    },
    menuPrice: {
      fontFamily:"Karla-Regular",
      fontSize:20,
      fontWeight:"bold"
    },
    sectionMenuImage: {
      width:"30%",
      alignItems:"flex-end"
    },
    menuImage: {
      width:80, 
      height:80, 
      resizeMode:"cover"
    }
  });