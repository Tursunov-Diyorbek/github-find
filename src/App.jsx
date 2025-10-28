import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  IconButton,
  Link,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubContext from "./context/GitHubContext";
import { debounce } from "lodash";

function App({ setDarkMode, darkMode }) {
  const [username, setUsername] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const { user, repos, loading, error, fetchUser } = useContext(GitHubContext);

  const debouncedFetch = debounce((value) => {
    if (value) {
      fetchUser(value);
    }
  }, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    debouncedFetch(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GitHub foydalanuvchi qidiruvchisi
          </Typography>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <TextField
          label="GitHub foydalanuvchi nomini kiriting..."
          variant="outlined"
          fullWidth
          value={username}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {user && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Avatar
                    src={user?.avatar_url}
                    sx={{ width: 100, height: 100, mx: "auto" }}
                  />
                  <Typography variant="h5" align="center" gutterBottom>
                    {user?.name || user?.login}
                  </Typography>
                  <Typography align="center" color="textSecondary">
                    @{user?.login}
                  </Typography>
                  <Typography align="center" sx={{ mt: 1 }}>
                    {user?.bio}
                  </Typography>
                  <Typography align="center" sx={{ mt: 1 }}>
                    Kuzatuvchilar: {user?.followers} | Kuzatilmoqda:{" "}
                    {user?.following}
                  </Typography>
                  <Link
                    href={user?.html_url}
                    target="_blank"
                    rel="noopener"
                    sx={{ display: "block", textAlign: "center", mt: 1 }}
                  >
                    GitHub'da ko'rish
                  </Link>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Repositories" />
                <Tab label="About" />
              </Tabs>
              {tabValue === 0 && (
                <List>
                  {repos?.map((repo) => (
                    <ListItem key={repo?.id}>
                      <ListItemText
                        primary={repo?.name}
                        secondary={repo?.description}
                      />
                      <ListItemIcon>
                        <StarIcon /> {repo?.stargazers_count}
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              )}
              {tabValue === 1 && (
                <CardContent>
                  <Typography>
                    Jamoat omborlari: {user?.public_repos}
                  </Typography>
                  <Typography>Joylashuv: {user?.location || "N/A"}</Typography>
                  <Typography>Kompaniya: {user?.company || "N/A"}</Typography>
                  <Typography>
                    Blog:{" "}
                    {user?.blog ? (
                      <Link href={user?.blog}>{user?.blog}</Link>
                    ) : (
                      "N/A"
                    )}
                  </Typography>
                  <Typography>
                    Qo'shildi: {new Date(user?.created_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default App;
