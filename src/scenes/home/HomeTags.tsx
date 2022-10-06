import { Box, Typography } from "@mui/material";
import { pallet } from "../../themes/theme";

const bumperPadding = "40px";

export function HomeTags() {
  return (
    <Box>
      <Typography
        bgcolor={pallet.White}
        color={pallet.WoodsGreen}
        padding={bumperPadding}
        textAlign="center"
        fontSize={"1rem"}
      >
        Headlines and breaking news
      </Typography>
      <Typography
        bgcolor={pallet.OrangeTangerine}
        color={pallet.WoodsGreen}
        padding={bumperPadding}
        textAlign="center"
        fontSize={"1rem"}
      >
        All of your favorite and trusted news sources
      </Typography>
      <Typography
        bgcolor={pallet.WoodsGreen}
        padding={bumperPadding}
        textAlign="center"
        fontSize={"1rem"}
        color={pallet.White}
      >
        Customized feed and bookmarks all up-to-date in one place
      </Typography>
      <Typography marginTop={"20px"}>© 2022 Readr Ltd.</Typography>
    </Box>
  );
}
