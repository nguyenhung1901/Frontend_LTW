import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

function LoginRegister({ setUser }) {
  const [loginName, setLoginName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8081/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ login_name: loginName })
      });

      if (res.status === 200) {
        const user = await res.json();
        console.log("Logged in user:", user);
        setUser(user);
        setError("");
      } else {
        const errData = await res.json();
        setError(errData.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Login name"
        value={loginName}
        onChange={e => setLoginName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button onClick={handleLogin} variant="contained" style={{ marginTop: "10px" }}>
        Login
      </Button>

      {error && <Typography color="error" style={{ marginTop: "10px" }}>{error}</Typography>}
    </div>
  );
}

export default LoginRegister;
