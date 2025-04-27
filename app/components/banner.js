import { Image, View, Text } from 'react-native';
import { homeStyles } from "../../styles/home.styles";

const Banner = () => {
    return (
        <>
        <Text style={homeStyles.bannerTitle}>Little lemon</Text>
                
        <View style={{flexDirection:"row"}}>
            <View style={{width:"65%"}}>
                <Text style={homeStyles.bannerSubTitle}>Chicago</Text>
                <Text style={homeStyles.bannerDescription}>We are a family owned Mediterranean restaurant, focused on traditional recipes served wth a modern twist.</Text>
            </View>
            <View style={homeStyles.sectionBannerImage}>
                <Image source={require("../../assets/images/hero_image.png")} style={homeStyles.bannerImage} />
            </View>
        </View>
        </>
    );
}
export default Banner;