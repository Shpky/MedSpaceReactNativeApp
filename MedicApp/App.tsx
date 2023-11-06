import { ScrollView, Button } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import Save from "@models/Save";
import NewPrescriptionView from "@layouts/NewPrescriptions"

function App(): JSX.Element {
  (function initData(): void {
    RNSecureStorage.exists('save')
      .then((exists) => {
        if (!exists) {
          const save = Save.default()
          RNSecureStorage
            .set('save', JSON.stringify(save.toJson()),
              { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        }
      }
      )
  })();
  console.log("inited")
  return (
    <ScrollView>
      {__DEV__ && <>
        <Button title="afficher" onPress={() => {
          console.log("test")
          console.log(Save.default())
        }
        }></Button>
        <Button title="resetDataBase" onPress={() => {
          RNSecureStorage
            .set('save', JSON.stringify(Save.default().toJson()),
              { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        }}></Button>
      </>}
      <NewPrescriptionView></NewPrescriptionView>
    </ScrollView>
  );
}


export default App;
