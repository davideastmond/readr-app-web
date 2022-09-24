import FavEmpty from "@mui/icons-material/FavoriteBorder";
import FavFilled from "@mui/icons-material/Favorite";
import { styled } from "@mui/material";
import { pallet } from "../../themes/theme";

interface IFavBarProps {
  checked: boolean;
  onClick?: () => void;
}

const StyledFilledHeart = styled(FavFilled)(() => ({
  color: pallet.OrangeTangerine,
  width: "20px",
}));

const StyledEmptyHeart = styled(FavEmpty)(() => ({
  color: pallet.OrangeTangerine,
  width: "20px",
}));

function FavBar(props: IFavBarProps) {
  return (
    <div>{props.checked ? <StyledFilledHeart /> : <StyledEmptyHeart />}</div>
  );
}

export default FavBar;
