import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderContainer from "@layouts/Home/components/headerContainer";
import TreatmentContainer from '@layouts/Treatment/TreatmentIndexPage';
import HomePageBody from '@layouts/Home/components/IndexHomePage';
import NewPrescription from '@layouts/NewPrescription/NewPrescriptionIndex';

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
    background: 'white',
  },
};

function App(): JSX.Element {
  return <>
      <NavigationContainer theme={MedicAppWhiteTheme}>
        <Stack.Navigator
          screenOptions={{
            header: () => <HeaderContainer />,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomePageBody} />
          <Stack.Screen name="Treatment" component={TreatmentContainer} />
          <Stack.Screen name="NewPrescription" component={NewPrescription} />

        </Stack.Navigator >
      </NavigationContainer >
    </>
}

export default App;
