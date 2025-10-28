import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GitHubProvider from './context/GitHubProvider.jsx';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState } from 'react';

function Root() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GitHubProvider>
        <App darkMode={darkMode} setDarkMode={setDarkMode} />
      </GitHubProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);