import { ScrollView, Button } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import defaultSave from "@data/defaultSave.json";
import NewPrescriptionView from "@layouts/NewPrescriptions"
import HommeIndex from "@layouts/Home"
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

  console.log("inited")
  return (
    <ScrollView>
      {__DEV__ && <>
        <Button title="afficher" onPress={() => {
          console.log("test")
          console.log(defaultSave)
        }
        }></Button>
        <Button title="resetDataBase" onPress={resetDataBase}></Button>
      </>}
      <HommeIndex></HommeIndex>
    </ScrollView>
  );
}


export default App;
