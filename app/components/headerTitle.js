import { Image, StyleSheet } from 'react-native';

const HeaderTitle = () => {
    return (
        <Image 
          source={require("../../assets/images/Logo.png")} 
          style={styles.logo} />
    );
}
export default HeaderTitle;

const styles = StyleSheet.create({
    logo: {
        height:56,
        width:179,
        resizeMode:"contain",
        alignSelf:"center"
    }
});