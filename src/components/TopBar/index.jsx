import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography , Button} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";

function TopBar({ user, setUser }) {

  const handleLogout = async () => {
    await fetch("http://localhost:8081/admin/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">
          Nguyễn Văn Hùng
        </Typography>

        {user ? (
          <>
            <Typography variant="h6">
              Hi {user.first_name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="h6">
            Please Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;