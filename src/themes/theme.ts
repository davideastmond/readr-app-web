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
  },
});
