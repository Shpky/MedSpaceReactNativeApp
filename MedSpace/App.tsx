import StackNavigator from "./src/navigation/StackNavigator";
import { PasswordContextProvider } from "./src/contexts/PasswordContext";

function App(): JSX.Element {
  return <PasswordContextProvider>
    <StackNavigator />
  </PasswordContextProvider>;
}

export default App;
