import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SongsStackNavigator from "./src/navigation/SongsStackNavigator";
import { Icon } from "@rneui/themed";
import { ThemeProvider } from "@rneui/themed";
import { usetheme } from "./src/theme/theme";
import { useFonts } from "expo-font";

const BottomTab = createBottomTabNavigator();

const theme = usetheme;

export default function App() {
  const [loaded] = useFonts({
    MarcellusRegular: require("./assets/fonts/Marcellus-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: () => <Icon name="home" type="feather" />,
            }}
          />
          <BottomTab.Screen
            name="SongsTab"
            component={SongsStackNavigator}
            options={{
              title: "Songs",
              headerShown: false,
              tabBarIcon: () => <Icon name="music" type="feather" />,
            }}
          />
        </BottomTab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
