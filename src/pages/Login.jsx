import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      email.trim().toLowerCase() ===
        "admin@gmail.com" &&
      password.trim() === "admin123"
    ) {
      dispatch(login());
      navigate("/dashboard");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg,#74ebd5,#ACB6E5)",
      }}
    >
      <Container maxWidth="sm">

        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 5,
            backdropFilter: "blur(10px)",
            background:
              "rgba(255,255,255,0.9)",
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <WbSunnyIcon
              sx={{
                fontSize: 60,
                color: "#ff9800",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Weather Forecast App
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Login to explore real-time weather updates
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1rem",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          

        </Paper>

      </Container>
    </Box>
  );
};

export default Login;