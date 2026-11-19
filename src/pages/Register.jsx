import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");

  const handleRegister = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setError("");
    setSuccess(
      "Registration successful!"
    );

    setTimeout(() => {
      navigate("/");
    }, 1500);
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
        p: 2,
      }}
    >
      <Container maxWidth="sm">

        <Paper
          elevation={15}
          sx={{
            p: 5,
            borderRadius: 5,
            backdropFilter: "blur(10px)",
            background:
              "rgba(255,255,255,0.92)",
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <PersonAddIcon
              sx={{
                fontSize: 70,
                color: "#1976d2",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Create Account
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Register to access real-time
            weather updates and search
            history.
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              severity="success"
              sx={{ mb: 2 }}
            >
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
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
            onClick={handleRegister}
          >
            Register
          </Button>

          <Button
            fullWidth
            sx={{
              mt: 2,
              textTransform: "none",
            }}
            onClick={() =>
              navigate("/")
            }
          >
            Already have an account?
            Login
          </Button>

        </Paper>

      </Container>
    </Box>
  );
};

export default Register;