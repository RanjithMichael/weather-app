import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import CloudIcon from "@mui/icons-material/Cloud";

import { getWeatherByCity } from "../services/weatherApi";

const SearchDetails = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCity(city);
        setWeather(data);
      } catch (err) {
        setError("Unable to load weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#74ebd5,#ACB6E5)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#74ebd5,#ACB6E5)",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 3,
            borderRadius: 3,
          }}
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back To Dashboard
        </Button>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {weather && (
          <Card
            elevation={10}
            sx={{
              borderRadius: 5,
              background:
                "rgba(255,255,255,0.9)",
              backdropFilter:
                "blur(10px)",
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
                  justifyContent:
                    "center",
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
                color="text.secondary"
              >
                {
                  weather.weather[0]
                    .description
                }
              </Typography>

              <Grid
                container
                spacing={3}
              >

                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign:
                        "center",
                      borderRadius: 3,
                    }}
                  >
                    <ThermostatIcon
                      color="error"
                      sx={{
                        fontSize:
                          40,
                      }}
                    />

                    <Typography>
                      Temperature
                    </Typography>

                    <Typography
                      variant="h6"
                    >
                      {
                        weather.main
                          .temp
                      }
                      °C
                    </Typography>
                  </Paper>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign:
                        "center",
                      borderRadius: 3,
                    }}
                  >
                    <WaterDropIcon
                      color="primary"
                      sx={{
                        fontSize:
                          40,
                      }}
                    />

                    <Typography>
                      Humidity
                    </Typography>

                    <Typography
                      variant="h6"
                    >
                      {
                        weather.main
                          .humidity
                      }
                      %
                    </Typography>
                  </Paper>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign:
                        "center",
                      borderRadius: 3,
                    }}
                  >
                    <AirIcon
                      color="success"
                      sx={{
                        fontSize:
                          40,
                      }}
                    />

                    <Typography>
                      Wind Speed
                    </Typography>

                    <Typography
                      variant="h6"
                    >
                      {
                        weather.wind
                          .speed
                      }{" "}
                      m/s
                    </Typography>
                  </Paper>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign:
                        "center",
                      borderRadius: 3,
                    }}
                  >
                    <CloudIcon
                      color="action"
                      sx={{
                        fontSize:
                          40,
                      }}
                    />

                    <Typography>
                      Condition
                    </Typography>

                    <Typography
                      variant="h6"
                    >
                      {
                        weather
                          .weather[0]
                          .main
                      }
                    </Typography>
                  </Paper>
                </Grid>

              </Grid>

            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default SearchDetails;