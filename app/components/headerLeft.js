import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderLeft = ({isLoggedIn, handleBackButton}) => {
    return (
        <TouchableOpacity onPress={handleBackButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={{ backgroundColor:"#495E57", padding:5, borderRadius:50,opacity: isLoggedIn ? 1 : 0.8 }}
          />
        </TouchableOpacity>
    );
}
export default HeaderLeft;

const styles = StyleSheet.create({
    logo: {
        height:56,
        width:179,
        resizeMode:"contain",
        alignSelf:"center"
    }
});