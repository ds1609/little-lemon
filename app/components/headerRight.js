import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const HeaderRight = ({image, shortName, handleProfileIcon}) => {
    return (
        <>
            {image ? (
                <TouchableOpacity style={styles.defaultBackground} onPress={handleProfileIcon}>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.photo} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.defaultBackground} onPress={handleProfileIcon}>
                    <Text style={styles.defaultText}>{shortName}</Text>
                </TouchableOpacity>
            )}
        </>
    );
}
export default HeaderRight;

const styles = StyleSheet.create({
    photo: {
        height:44,
        width:44,
        resizeMode:"cover",
        borderRadius:22,
        borderWidth:1,
        borderColor:"#495E57"
    },
    defaultBackground: {
        backgroundColor:"#495E57",
        height:44,
        width:44,
        borderRadius:22,
        justifyContent:"center"
    },
    defaultText: {
        textAlign:"center",
        fontFamily:"Karla-Regular",
        fontSize:22,
        color:"#EDEFEE"
    }
});