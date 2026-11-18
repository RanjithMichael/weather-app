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
  List,
  ListItem,
  AppBar,
  Toolbar,
} from "@mui/material";

import { useState } from "react";
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleHistoryClick = async (selectedCity) => {
    try {
      const data = await getWeatherByCity(
        selectedCity
      );

      dispatch(setWeather(data));
    } catch (err) {
      setError("Unable to load city");
    }
  };

  return (
    <>
      {/* Navbar */}

      <AppBar position="static">
        <Toolbar>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Weather Dashboard
          </Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Toolbar>
      </AppBar>

      {/* Main Content */}

      <Container maxWidth="md">

        <Typography
          variant="h4"
          mt={4}
          mb={3}
          align="center"
        >
          Search Weather
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            fullWidth
            label="Enter City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {weather && (
          <Card
            elevation={5}
            sx={{
              mb: 4,
              borderRadius: 3,
            }}
          >
            <CardContent>

              <Typography
                variant="h4"
                gutterBottom
              >
                {weather.name}
              </Typography>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather"
              />

              <Typography>
                🌡 Temperature:
                {" "}
                {weather.main.temp} °C
              </Typography>

              <Typography>
                💧 Humidity:
                {" "}
                {weather.main.humidity}%
              </Typography>

              <Typography>
                🌬 Wind Speed:
                {" "}
                {weather.wind.speed} m/s
              </Typography>

              <Typography>
                ☁ Condition:
                {" "}
                {weather.weather[0].description}
              </Typography>

            </CardContent>
          </Card>
        )}

        {/* Search History */}

        <Typography
          variant="h5"
          gutterBottom
        >
          Search History
        </Typography>

        <List>

          {history.map(
            (item, index) => (
              <ListItem
                key={index}
                button
                onClick={() =>
                  handleHistoryClick(item)
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                {item}
              </ListItem>
            )
          )}

        </List>

      </Container>
    </>
  );
};

export default Dashboard;