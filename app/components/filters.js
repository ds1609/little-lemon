import { Text, View, TouchableOpacity } from "react-native";

const Filters = ({sections, onChange, selections}) => {
    return (
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            {sections.map((item,index) => {
                return (
                    <TouchableOpacity key={index} style={{backgroundColor:selections[index] ? "#495E57" : "#EDEFEE",padding:5,borderRadius:5}} onPress={() => { onChange(index); }}>
                        <Text style={{fontFamily:"Karla-Regular",fontSize:18,fontWeight:"medium",textTransform:"capitalize",textAlign:"center",color:selections[index] ? "#FFFFFF" : "#333333"}}>{item}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default Filters;