import ReactDOM from 'react-dom/client';
import App from './App';
import GitHubProvider from './context/GitHubProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';

function Root() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GitHubProvider>
        <App setDarkMode={setDarkMode} darkMode={darkMode} />
      </GitHubProvider>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);