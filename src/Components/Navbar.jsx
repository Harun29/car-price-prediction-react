import "../Style/Navbar.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DehazeIcon from "@mui/icons-material/Dehaze";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link
          to="/price-prediction"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PriceChangeIcon />
              </ListItemIcon>
              <ListItemText primary="Price Prediction" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link
          to="/data-analysis"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Data Analysis" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding>
          {/* <Link to="/update-data" style={{ textDecoration: 'none', color: 'inherit' }}> */}
          <ListItemButton>
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary="Update Data" />
          </ListItemButton>
          {/* </Link> */}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="navbar-container">
      <DehazeIcon
        style={{ fontSize: "2rem", cursor: "pointer" }}
        onClick={toggleDrawer(true)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Navbar;
