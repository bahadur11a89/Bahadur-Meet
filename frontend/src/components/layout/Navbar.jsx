import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src="/logo_b.png" alt="Bahadur Meet Logo" style={{ height: 28, width: 28, borderRadius: 4 }} />
          <Typography variant="h6" component="div">
            Bahadur Meet
          </Typography>
        </Box>
        <Box>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/history")}>
            History
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
