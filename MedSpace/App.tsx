import StackNavigator from "./src/navigation/StackNavigator";
import { PasswordContextProvider } from "./src/contexts/PasswordContext";
import { DoctorContextProvider } from "./src/contexts/DoctorContext";
function App(): JSX.Element {
  return <PasswordContextProvider>
    <DoctorContextProvider>
      <StackNavigator />
    </DoctorContextProvider>
  </PasswordContextProvider>;
}

export default App;
