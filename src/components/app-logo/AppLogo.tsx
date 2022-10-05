import { Box } from "@mui/material";

import AppLogoInsignia from "../../assets/Original.png";
import "./style.css";

interface IAppLogoProps {
  width?: number | string;
}
function AppLogo(props: IAppLogoProps) {
  return (
    <Box>
      <img
        className="LogoImage"
        src={AppLogoInsignia}
        alt="App Logo"
        width={props.width}
      />
    </Box>
  );
}

export default AppLogo;
