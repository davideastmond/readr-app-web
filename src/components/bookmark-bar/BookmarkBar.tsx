import BookmarkEmpty from "@mui/icons-material/TurnedInNot";
import BookmarkFilled from "@mui/icons-material/Bookmark";
import { styled } from "@mui/material";
import { pallet } from "../../themes/theme";

interface IBookmarkBarProps {
  checked: boolean;
  onClick?: ({ current, next }: { current: boolean; next: boolean }) => void;
}

const StyledFilledHeart = styled(BookmarkFilled)(() => ({
  color: pallet.OrangeTangerine,
  width: "20px",
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledEmptyHeart = styled(BookmarkEmpty)(() => ({
  color: pallet.OrangeTangerine,
  width: "20px",
  "&:hover": {
    cursor: "pointer",
  },
}));

function BookmarkBar(props: IBookmarkBarProps) {
  const handleClickToggle = () => {
    if (props.onClick) {
      props.onClick({ current: props.checked, next: !props.checked });
    }
  };
  return (
    <div onClick={handleClickToggle}>
      {props.checked ? <StyledFilledHeart /> : <StyledEmptyHeart />}
    </div>
  );
}

export default BookmarkBar;
