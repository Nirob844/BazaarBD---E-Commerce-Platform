"use client";

import { fetchLogin } from "@/services/auth";
import { storeUserInfo } from "@/utils/auth";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        (async () => {
          const data = await fetchLogin(email, password);
          const accessToken = data.data;
          storeUserInfo(accessToken);
          router.push("/shop");
        })(),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: (err) => err.message || "Something went wrong.",
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            boxShadow: 6,
            borderRadius: theme.shape.borderRadius * 2,
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* Left Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "block" },
              position: "relative",
              minHeight: "650px",
              backgroundColor: theme.palette.primary.light,
            }}
          >
            <Image
              src="/login.png"
              alt="Login"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Right Form Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: { xs: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                color={theme.palette.primary.main}
                mb={2}
              >
                Welcome Back!
              </Typography>

              <Typography
                variant="body1"
                color={theme.palette.text.secondary}
                textAlign="center"
                mb={4}
              >
                Login to continue shopping at BazaarBD
              </Typography>

              <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: theme.shape.borderRadius,
                      fontWeight: 600,
                      boxShadow: `0px 8px 16px rgba(46, 139, 87, 0.24)`,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login Now"
                    )}
                  </Button>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Don&apos;t have an account?{" "}
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={() => router.push("/register")}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        p: 0,
                      }}
                    >
                      Register here
                    </Button>
                  </Typography>
                </Stack>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
