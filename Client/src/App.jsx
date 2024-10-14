import AppRouter from "./router/AppRouter";
import { PopupProvider } from './components/PopupContext'
import AnonymousEntry from "./pages/securityGuard/AnonymousEntry";


const App = () => {
  
  return (
    <>
      
        <PopupProvider>
          <AppRouter/>
        </PopupProvider>
      
    </>
  );
}

export default App;
