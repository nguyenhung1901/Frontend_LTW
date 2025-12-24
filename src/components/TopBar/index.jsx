import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TopBar({ user, setUser }) {
  const navigate = useNavigate();
  const [uploadError, setUploadError] = useState("");

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8081/admin/logout", {
        method: "POST",
        credentials: "include"
      });

      if (res.status === 200) {
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("http://localhost:8081/api/photo/new", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (res.status === 200) {
        const data = await res.json();
        setUploadError("");
        alert("Photo uploaded successfully!");
        navigate(`/photos/${user._id}`);
      } else {
        const errData = await res.json();
        setUploadError(errData.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Network error");
    }

    event.target.value = "";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Nguyễn Văn Hùng
        </Typography>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Hi {user.first_name}</Typography>

            {/* Upload Photo Button */}
            <Button
              variant="contained"
              component="label"
              color="secondary"
            >
              Upload Photo
              <Input
                type="file"
                hidden
                inputProps={{ accept: "image/*" }}
                onChange={handlePhotoUpload}
              />
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Typography>Please Login</Typography>
        )}
      </Toolbar>

      {uploadError && (
        <Box sx={{ bgcolor: "error.main", color: "white", p: 1, textAlign: "center" }}>
          {uploadError}
        </Box>
      )}
    </AppBar>
  );
}

export default TopBar;