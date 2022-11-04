import { createTheme } from "@mui/material/styles";

export const pallet = {
  IceCreamPink: "#f4adaf",
  WoodsGreen: "#5b6c46",
  SkinTone: "#ecd4c1",
  OrangeTangerine: "#ea9736",
  White: "#ffffff",
  GrapeWine: "#57466C",
  DarkCharcoalGrey: "#101010",
  RedTiaMaria: "#C9470b",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: pallet.WoodsGreen,
    },
    error: {
      main: pallet.RedTiaMaria,
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
});
