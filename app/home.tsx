import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Profile" onPress={() => router.navigate("/profile")}/>
    </View>
  );
}


