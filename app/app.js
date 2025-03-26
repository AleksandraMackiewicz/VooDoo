// App.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SwipeScreen from "./SwipeScreen";
import MatchesScreen from "./MatchesScreen";

const Stack = createStackNavigator();

const App = () => {
  const user = { id: "currentUserId", name: "John Doe", matches: [] };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SwipeScreen" component={() => <SwipeScreen user={user} />} />
        <Stack.Screen name="MatchesScreen" component={() => <MatchesScreen user={user} />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
