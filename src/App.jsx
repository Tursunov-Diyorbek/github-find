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
  Button,
  Box,
  ListItemAvatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubContext from "./context/GitHubContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import GroupIcon from "@mui/icons-material/Group";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import UpdateIcon from "@mui/icons-material/Update";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GitHubIcon from "@mui/icons-material/GitHub";

dayjs.extend(utc);

function App({ setDarkMode, darkMode }) {
  const [username, setUsername] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const { user, repos, followers, loading, error, fetchUser } =
    useContext(GitHubContext);

  const onFinish = () => {
    if (username) {
      fetchUser(username);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  console.log("repos", repos);

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
            color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2} sx={{ marginBottom: 5 }}>
          <Grid item xs={12} md={10}>
            <TextField
              label="GitHub foydalanuvchi nomini kiriting..."
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e?.target?.value)}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              sx={{ height: "78%", width: "100%" }}
              onClick={onFinish}>
              Qidirish
            </Button>
          </Grid>
        </Grid>

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
                    sx={{ width: 200, height: 200, mx: "auto" }}
                  />
                  <Typography variant="h5" gutterBottom>
                    {user?.name || user?.login}
                  </Typography>
                  <Typography color="textSecondary">@{user?.login}</Typography>
                  <Typography sx={{ my: 1 }}>{user?.bio}</Typography>
                  <Link
                    href={user?.html_url}
                    target="_blank"
                    rel="noopener"
                    sx={{ display: "block", textAlign: "center", my: 1 }}>
                    GitHub'da ko'rish
                  </Link>
                  <Typography
                    sx={{
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      my: 1,
                      fontSize: 12,
                    }}
                    color="textSecondary">
                    <GroupIcon fontSize="small" /> {user?.followers}{" "}
                    kuzatuvchilar / {user?.following} kuzatilmoqda
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CorporateFareIcon /> {user?.company || "Kiritilmagan"}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon /> {user?.location || "Kiritilmagan"}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CreateNewFolderIcon />{" "}
                    {dayjs
                      .utc(user?.created_at)
                      .format("DD.MM.YYYY HH:mm:ss") || "00.00.0000 00:00:00"}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <UpdateIcon />{" "}
                    {dayjs
                      .utc(user?.updated_at)
                      .format("DD.MM.YYYY HH:mm:ss") || "00.00.0000 00:00:00"}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon /> {user?.email || "Kiritilmagan"}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TwitterIcon /> {user?.twitter_username || "Kiritilmagan"}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon /> {user?.type || "Kiritilmagan"}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <VisibilityIcon /> {user?.user_view_type || "Kiritilmagan"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Omborxonalar" />
                <Tab label="Kuzatuvchilarim" />
              </Tabs>
              {tabValue === 0 && (
                <List>
                  {repos?.map((repo) => (
                    <ListItem key={repo?.id} alignItems="flex-start">
                      <ListItemText
                        primary={repo?.name}
                        secondary={
                          <>
                            <Typography
                              color="textSecondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}>
                              Tasnif: {repo?.description || "Kiritilmagan"}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}>
                              Til: {repo?.language || "Kiritilmagan"}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}>
                              Yaratildi:{" "}
                              {dayjs
                                .utc(repo?.created_at)
                                .format("DD.MM.YYYY HH:mm:ss") ||
                                "00.00.0000 00:00:00"}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}>
                              Yangilandi:{" "}
                              {dayjs
                                .utc(repo?.updated_at)
                                .format("DD.MM.YYYY HH:mm:ss") ||
                                "00.00.0000 00:00:00"}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}>
                              Arxivlangan: {repo?.archived ? "Ha" : "Yo'q"}
                            </Typography>
                            <Link
                              href={repo?.clone_url}
                              target="_blank"
                              rel="noopener"
                              sx={{
                                display: "flex",
                                gap: 1,
                              }}>
                              Klon URL manzili
                            </Link>
                          </>
                        }
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
                  {followers?.map((item, index) => (
                    <List
                      sx={{
                        width: "100%",
                      }}
                      key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar sx={{ mr: 2 }}>
                          <Avatar
                            src={item?.avatar_url}
                            sx={{ width: 50, height: 50, mx: "auto" }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item?.login}
                          secondary={
                            <>
                              <Typography
                                color="textSecondary"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}>
                                <PersonIcon fontSize="small" />{" "}
                                {item?.type || "Kiritilmagan"}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}>
                                <VisibilityIcon fontSize="small" />{" "}
                                {item?.user_view_type || "Kiritilmagan"}
                              </Typography>
                              <Link
                                href={item?.html_url}
                                target="_blank"
                                rel="noopener"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}>
                                <GitHubIcon fontSize="small" /> GitHub'da
                                ko'rish
                              </Link>
                            </>
                          }
                        />
                      </ListItem>
                    </List>
                  ))}
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
