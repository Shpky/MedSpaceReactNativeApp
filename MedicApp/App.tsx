import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderContainer from "@layouts/Home/components/headerContainer";
import TreatmentContainer from '@layouts/Treatment/TreatmentIndexPage';
import HomePageBody from '@layouts/Home/components/IndexHomePage';
import IndexPageNewPrescription from '@layouts/NewPrescriptions/IndexPageNewPrescription';
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
// Personnalisez le thème ici
const MedicAppWhiteTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white', // Changez la couleur de fond selon vos besoins
  },
};
function App() {
  return (
    <NavigationContainer theme={MedicAppWhiteTheme}>
      <Stack.Navigator
        screenOptions={{
          header: () => <HeaderContainer />,
          animation: 'slide_from_right',

        }}
      >
        <Stack.Screen name="Home" component={HomePageBody} />
        <Stack.Screen name="Treatment" component={TreatmentContainer} />
        <Stack.Screen name="NewPrescription" component={IndexPageNewPrescription} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
