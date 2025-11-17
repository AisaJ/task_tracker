import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      gap={2}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
      }}
    >
        <Typography variant="body2" color="textSecondary">
            Welcome, <strong>{user?.email}</strong>
        </Typography>
        <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{                
                textTransform: "none",
                fontWeight: 500,
            }}>
            Logout
        </Button>
    </Box>
  );
};

export default LogoutButton;
