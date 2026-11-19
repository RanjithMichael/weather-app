import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const history = useSelector(
    (state) => state.weather.history
  );

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

        {/* Header */}

        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          mb={1}
        >
          👤 My Profile
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={4}
        >
          Manage your account information
        </Typography>

        {/* Main Card */}

        <Card
          elevation={10}
          sx={{
            borderRadius: 5,
            p: 2,
            backdropFilter: "blur(10px)",
            background:
              "rgba(255,255,255,0.9)",
          }}
        >
          <CardContent>

            {/* Avatar */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#1976d2",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : <PersonIcon />}
              </Avatar>
            </Box>

            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              mb={4}
            >
              {user?.name || "Guest User"}
            </Typography>

            <Grid container spacing={3}>

              {/* Name */}

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                  }}
                >
                  <PersonIcon color="primary" />

                  <Typography
                    variant="h6"
                    mt={1}
                  >
                    Name
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {user?.name || "N/A"}
                  </Typography>
                </Paper>
              </Grid>

              {/* Email */}

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                  }}
                >
                  <EmailIcon color="success" />

                  <Typography
                    variant="h6"
                    mt={1}
                  >
                    Email
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {user?.email || "N/A"}
                  </Typography>
                </Paper>
              </Grid>

              {/* Searches */}

              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  <SearchIcon
                    sx={{
                      fontSize: 40,
                      color: "#ff9800",
                    }}
                  />

                  <Typography
                    variant="h6"
                    mt={1}
                  >
                    Total Searches
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    {history.length}
                  </Typography>
                </Paper>
              </Grid>

            </Grid>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<DashboardIcon />}
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 3,
              }}
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Back To Dashboard
            </Button>

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

export default Profile;