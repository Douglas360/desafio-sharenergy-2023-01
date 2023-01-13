import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRouter } from './routes';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
       
        <CssBaseline />
        <ToastContainer autoClose={1000} />
        <AppRouter />
       

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
