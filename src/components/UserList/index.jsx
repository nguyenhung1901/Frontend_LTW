import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import API_BASE_URL from "../../config/api";
function UserList({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      setUsers([]);
      return;
    }

    fetch(`${API_BASE_URL}/api/user/list`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          setUsers([]);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUsers(data);
      })
      .catch((err) => console.error(err));
  }, [user]); 

  if (!user) {
    return null;
  }

  return (
    <div>
      <Typography variant="body1">
        User list
      </Typography>

      <List component="nav">
        {users.map((u) => (
          <React.Fragment key={u._id}>
            <ListItem
              button
              component={Link}
              to={`/users/${u._id}`}
            >
              <ListItemText
                primary={`${u.first_name} ${u.last_name}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;


