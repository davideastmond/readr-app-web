import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { IconButton, styled, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { pallet } from "../../themes/theme";

const StyledAppBar = styled(AppBar)((props) => ({
  "& .MuiToolbar-root": {
    backgroundColor: `${pallet.WoodsGreen}`,
    position: "static",
    width: "100%",
    zIndex: "100",
  },
}));
function NavBar() {
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
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

export default NavBar;
