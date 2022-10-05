import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  IconButton,
  styled,
  Toolbar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { pallet } from "../../themes/theme";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../app-logo";

const StyledAppBar = styled(AppBar)((props) => ({
  "& .MuiToolbar-root": {
    backgroundColor: `${pallet.WoodsGreen}`,
    position: "static",
    width: "100%",
    zIndex: "100",
  },
}));

const StyledSwipableDrawer = styled(SwipeableDrawer)((props) => ({}));
interface INavBarProps {
  hasSession: boolean;
}

const CloseButton = ({ onClickFunction }: { onClickFunction?: () => void }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{ display: "flex", justifyContent: "flex-end" }}
        onClick={onClickFunction}
      >
        <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

// We want a menu for a user with a login session, and one for log out
const NoSessionMenu = ({
  onNavLinkClicked,
}: {
  onNavLinkClicked: (navLink: string) => void;
}) => {
  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/")}>
          <ListItemText>Home</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/headlines")}>
          <ListItemText>Latest Headlines</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/login")}>
          <ListItemText>Sign in</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/register")}>
          <ListItemText>Register | Sign up</ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
};

const SessionMenu = ({
  onNavLinkClicked,
}: {
  onNavLinkClicked: (navLink: string) => void;
}) => {
  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/main")}>
          <ListItemText>Home</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/headlines")}>
          <ListItemText>Latest Headlines</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/logout")}>
          <ListItemText>Log out</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => onNavLinkClicked("/settings")}>
          <ListItemText>User settings</ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
};
function NavBar(props: INavBarProps) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigationDismiss = (navLink: string) => {
    navigate(navLink);
    toggleDrawer();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <StyledSwipableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <CloseButton onClickFunction={toggleDrawer} />
        <Box display="flex" justifyContent={"center"}>
          <AppLogo width="200" />
        </Box>
        <List sx={{ width: "375px" }}>
          {props.hasSession ? (
            <SessionMenu onNavLinkClicked={handleNavigationDismiss} />
          ) : (
            <NoSessionMenu onNavLinkClicked={handleNavigationDismiss} />
          )}
        </List>
      </StyledSwipableDrawer>
    </Box>
  );
}

export default NavBar;
