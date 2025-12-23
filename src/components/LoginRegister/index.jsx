import React, { useState } from "react";
import { TextField, Button, Typography, Box, Tabs, Tab } from "@mui/material";

function LoginRegister({ setUser }) {
  const [tabValue, setTabValue] = useState(0);

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [reLoginName, setReLoginName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePassword2, setRePassword2] = useState("");
  const [reFirstName, setReFirstName] = useState("");
  const [reLastName, setReLastName] = useState("");
  const [reLocation, setReLocation] = useState("");
  const [reDescription, setReDescription] = useState("");
  const [reOccupation, setReOccupation] = useState("");
  const [reError, setReError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8081/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ 
          login_name: loginName,
          password: loginPassword 
        })
      });

      if (res.status === 200) {
        const user = await res.json();
        console.log("Logged in user:", user);
        setUser(user);
        setLoginError("");
      } else {
        const errData = await res.json();
        setLoginError(errData.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Network error");
    }
  };
  const handleRegister = async ()=>{
    if(!reLoginName||!rePassword||!reFirstName||!reLastName){
      setReError("Login name, password, first name, last name are required");
      return;
    }
    if(rePassword.length<6){
      setReError("Password must be at least 6 characters long");
      return;
    }
    if (rePassword!==rePassword2){
      setReError("Passwords do not match");
      return;
    }
    try{
      const res = await fetch("http://localhost:8081/admin/register",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify({
          login_name: reLoginName,
          password: rePassword,
          first_name: reFirstName,
          last_name: reLastName,
          location: reLocation,
          description: reDescription,
          occupation: reOccupation,
        })
      })
      if(res.status===200){
        const user = await res.json();
        console.log("Registered user:", user);
        setUser({
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name
        })
        setReError("");
      }else{
        const errData = await res.json();
        setReError(errData.error||"Registration failed");
      }
    }
    catch(err){
      console.error("Registration error:", err);
      setReError("Network error");
    }
  }
  return (
    <Box>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {tabValue === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>Login</Typography>

          <TextField
            label="Login Name"
            value={loginName}
            onChange={e => setLoginName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button 
            onClick={handleLogin} 
            variant="contained" 
            sx={{ mt: 2 }}
            fullWidth
          >
            Login
          </Button>

          {loginError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {loginError}
            </Typography>
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>Register New Account</Typography>

          <TextField
            label="Login Name *"
            value={reLoginName}
            onChange={e => setReLoginName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password * (min 6 characters)"
            type="password"
            value={rePassword}
            onChange={e => setRePassword(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Confirm Password *"
            type="password"
            value={rePassword2}
            onChange={e => setRePassword2(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="First Name *"
            value={reFirstName}
            onChange={e => setReFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Last Name *"
            value={reLastName}
            onChange={e => setReLastName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Location"
            value={reLocation}
            onChange={e => setReLocation(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            value={reDescription}
            onChange={e => setReDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            label="Occupation"
            value={reOccupation}
            onChange={e => setReOccupation(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button 
            onClick={handleRegister} 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Register Me
          </Button>

          {reError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {reError}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default LoginRegister;
