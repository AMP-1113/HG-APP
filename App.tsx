import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SongsStackNavigator from "./src/navigation/SongsStackNavigator";
import { Icon } from "@rneui/themed";
import { ThemeProvider } from "@rneui/themed";
import { usetheme } from "./src/theme/theme";
import { useFonts } from "expo-font";
import TakeOutScreen from "./src/screens/TakeOutScreen";
import { AppProvider } from "./src/contexts/appContext";

const BottomTab = createBottomTabNavigator();

const theme = usetheme;

export default function App() {
  const [loaded] = useFonts({
    MarcellusRegular: require("./assets/fonts/Marcellus-Regular.ttf"),
    CourierRegular: require("./assets/fonts/CourierPrime-Regular.ttf"),
    CourierBold: require("./assets/fonts/CourierPrime-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
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
            <BottomTab.Screen
              name="Takeout"
              component={TakeOutScreen}
              options={{
                title: "Our Favorite Takeout",
                headerShown: false,
                tabBarIcon: () => (
                  <Icon name="food-hot-dog" type="material-community" />
                ),
              }}
            />
          </BottomTab.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
