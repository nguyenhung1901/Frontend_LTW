import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");

    // reset khi đổi trang
    setContextText("");

    if (pathParts.length >= 3) {
      const pageType = pathParts[1];
      const userId = pathParts[2];

      fetch(`http://localhost:8081/api/user/${userId}`)
        .then(res => res.json())
        .then(user => {
          if (!user || user.error) return;

          const userName = `${user.first_name} ${user.last_name}`;

          if (pageType === "users") {
            setContextText(userName);
          } else if (pageType === "photos") {
            setContextText(`Photos of ${userName}`);
          }
        })
        .catch(err => console.error(err));
    }
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Nguyễn Văn Hùng
        </Typography>
        <Typography variant="h5" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
