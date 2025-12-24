import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../../config/api";
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user/${userId}`, {
      credentials: "include"  
    })
      .then(res => {
        if (res.status === 401) {
          console.error("Not authenticated");
          return null;
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data) setUser(data);
      })
      .catch(err => console.error(err));
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography>
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography>
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography>
        <strong>Description:</strong> {user.description}
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={`/photos/${userId}`}
      >
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;
