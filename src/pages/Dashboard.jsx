import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
  Chip,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import CloudIcon from "@mui/icons-material/Cloud";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setWeather,
  addToHistory,
  setLoading,
} from "../features/weather/weatherSlice";

import { logout } from "../features/auth/authSlice";
import { getWeatherByCity } from "../services/weatherApi";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [logoutMessage, setLogoutMessage] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const weather = useSelector(
    (state) => state.weather.weather
  );

  const history = useSelector(
    (state) => state.weather.history
  );

  const loading = useSelector(
    (state) => state.weather.loading
  );

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");

      dispatch(setLoading(true));

      const data = await getWeatherByCity(city);

      dispatch(setWeather(data));
      dispatch(addToHistory(city));

      setCity("");
    } catch (err) {
      setError("City not found");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleHistoryClick = async (
    selectedCity
  ) => {
    try {
      dispatch(setLoading(true));

      const data =
        await getWeatherByCity(selectedCity);

      dispatch(setWeather(data));
    } catch (err) {
      setError("Unable to load city");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    setLogoutMessage(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(90deg,#0f2027,#203a43,#2c5364)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            🌤 Weather Forecast App
          </Typography>
          <Button
          color="inherit"
          onClick={() => navigate("/profile")}
          >
          Profile
          </Button>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#74ebd5,#ACB6E5)",
          py: 4,
        }}
      >
        <Container maxWidth="md">

          <Paper
            elevation={5}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              Search Weather
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Enter City Name"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />

              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Paper>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 4,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {weather && (
            <Card
              elevation={10}
              sx={{
                borderRadius: 5,
                mb: 4,
                background:
                  "linear-gradient(135deg,#2196f3,#21cbf3)",
                color: "white",
              }}
            >
              <CardContent>

                <Typography
                  variant="h3"
                  align="center"
                  fontWeight="bold"
                >
                  {weather.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather"
                  />
                </Box>

                <Typography
                  variant="h2"
                  align="center"
                  fontWeight="bold"
                >
                  {Math.round(
                    weather.main.temp
                  )}
                  °
                </Typography>

                <Typography
                  variant="h6"
                  align="center"
                  mb={4}
                >
                  {
                    weather.weather[0]
                      .description
                  }
                </Typography>

                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    size={{ xs: 12, sm: 6 }}
                  >
                    <Paper sx={{ p: 2 }}>
                      <ThermostatIcon color="error" />
                      <Typography>
                        Temperature
                      </Typography>
                      <Typography>
                        {weather.main.temp} °C
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid
                    size={{ xs: 12, sm: 6 }}
                  >
                    <Paper sx={{ p: 2 }}>
                      <WaterDropIcon color="primary" />
                      <Typography>
                        Humidity
                      </Typography>
                      <Typography>
                        {weather.main.humidity}%
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid
                    size={{ xs: 12, sm: 6 }}
                  >
                    <Paper sx={{ p: 2 }}>
                      <AirIcon color="success" />
                      <Typography>
                        Wind Speed
                      </Typography>
                      <Typography>
                        {weather.wind.speed} m/s
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid
                    size={{ xs: 12, sm: 6 }}
                  >
                    <Paper sx={{ p: 2 }}>
                      <CloudIcon />
                      <Typography>
                        Condition
                      </Typography>
                      <Typography>
                        {weather.weather[0].main}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          )}

          <Typography
            variant="h5"
            gutterBottom
          >
            Recent Searches
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {history.map(
              (item, index) => (
                <Chip
                 key={index}
                 label={item}
                 clickable
                 color="primary"
                 onClick={() =>
                 navigate(`/history/${item}`)
               }
            />
              )
            )}
          </Box>

          <Snackbar
            open={logoutMessage}
            autoHideDuration={1500}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert
              severity="success"
              variant="filled"
              sx={{
                width: "100%",
              }}
            >
              Logged out successfully!
            </Alert>
          </Snackbar>

        </Container>
      </Box>
    </>
  );
};

export default Dashboard;