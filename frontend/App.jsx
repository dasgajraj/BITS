import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./screens/Loading";
import MainStack from "./screens/Main";
import Authentication from "./screens/Authentication";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initial, setInitial] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitial(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!initial ? (
          <>
            <Stack.Screen name="Loading" component={LoadingScreen} />
          </>
        ) : !auth ? (
          <>
            <Stack.Screen
              name="Auth"
              children={(props) => (
                <Authentication {...props} setAuth={setAuth} />
              )}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
