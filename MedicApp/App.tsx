import { ScrollView, Button } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import defaultSave from "@data/defaultSave.json";
import NewPrescriptionView from "@layouts/NewPrescription"
import HomeIndex from "@layouts/Home"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Prescriptions from '@layouts/Prescriptions';
import Debug from '@components/Debug';

function App(): JSX.Element {
  (function initData(): void {
    RNSecureStorage.exists('save')
      .then((exists) => {
        if (!exists) {
          resetDataBase()
        }
      }
      )
  })();

  const resetDataBase = () => {
    RNSecureStorage
      .set('save', JSON.stringify(defaultSave),
        { accessible: ACCESSIBLE.WHEN_UNLOCKED })
  }

  type RootStackParamList = {
    Home: undefined;
    NewPrescription: undefined;
    Prescriptions: undefined;
    // Profile: { userId: string };
    // Feed: { sort: 'latest' | 'top' } | undefined;
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();
  console.log("inited")

  return (
    <ScrollView>
      <Debug>
        <Button title="afficher" onPress={() => {
          console.log("test")
          console.log(defaultSave)
        }
        }></Button>
        <Button title="resetDataBase" onPress={resetDataBase}></Button>
      </Debug>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Prescriptions">
          <Stack.Screen name="Home" component={HomeIndex} />
          <Stack.Screen name="Prescriptions" component={Prescriptions} />
          <Stack.Screen name="NewPrescription" component={NewPrescriptionView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScrollView>
  );
}


export default App;
