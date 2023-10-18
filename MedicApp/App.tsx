import { SafeAreaView, Button } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import Save from './src/models/Save';
import NewPrescriptionView from './src/views/NewPrescriptionsView';
import TitleComponent from './src/components/TitleComponent';


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
    <SafeAreaView>
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
      <TitleComponent title="Sélectionner un traitement" />
    </SafeAreaView>
  );
}


export default App;
