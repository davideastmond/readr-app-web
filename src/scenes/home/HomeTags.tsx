import { Box, Typography } from "@mui/material";
import { pallet } from "../../themes/theme";
const bumperPadding = "40px";

export function HomeTags() {
  return (
    <Box>
      <Typography
        bgcolor={pallet.White}
        color={pallet.DarkCharcoalGrey}
        padding={bumperPadding}
        textAlign="center"
        fontSize={"1rem"}
      >
        <a href="/headlines">Latest Headlines</a>
      </Typography>
      <Typography
        bgcolor={pallet.WoodsGreen}
        color={pallet.White}
        padding={bumperPadding}
        textAlign="center"
        fontSize={"1rem"}
      >
        Your favorite trusted news sources
      </Typography>
      <Typography
        bgcolor={pallet.IceCreamPink}
        padding={bumperPadding}
        textAlign="center"
        fontSize={"1rem"}
      >
        Topics and tags, all customized and up-to-date
      </Typography>
    </Box>
  );
}
