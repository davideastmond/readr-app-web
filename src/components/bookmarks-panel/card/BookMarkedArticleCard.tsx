import { ButtonBase, Grid, styled, Typography } from "@mui/material";
import { IArticleBookmark } from "../../../definitions/user";
import CardImage from "../../news-article/card-image/CardImage";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { pallet } from "../../../themes/theme";
import { StringHelpers } from "../../../utils/string-helpers";
import { ShareButton } from "../../buttons/share-button";
const StyledArticleTitle = styled(Typography)((props) => ({
  "&.MuiTypography-root": {
    fontWeight: "bold",
  },
}));

const StyledDeleteIcon = styled(DeleteForeverIcon)((props) => ({
  color: pallet.RedTiaMaria,
  width: "20px",
  "&:hover": {
    cursor: "pointer",
  },
}));

interface IBookmarkArticleProps {
  bookmark: IArticleBookmark;
  onDeleteBookmark?: (url: string) => void;
}
function BookmarkArticleCard(props: IBookmarkArticleProps) {
  const handleBookmarkDelete = () => {
    props.onDeleteBookmark && props.onDeleteBookmark(props.bookmark.url);
  };

  return (
    <Grid container spacing={2} mt={"5px"} mb={"5px"}>
      <Grid item>
        <ButtonBase href={props.bookmark.url} target="_blank" rel="noreferrer">
          <CardImage src={props.bookmark.urlToImage} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs>
          <StyledArticleTitle gutterBottom variant="subtitle2">
            {props.bookmark.title}
          </StyledArticleTitle>
          <Typography fontSize={"0.9rem"}>
            <a
              className="noTextOrnamentation"
              href={props.bookmark.url}
              target="_blank"
              rel="noreferrer"
            >
              {props.bookmark.source?.name || "Unknown source"}
            </a>
          </Typography>
          <Typography fontSize={"0.9rem"}>
            {`Bookmarked ${StringHelpers.getFormattedDate({
              dateString: props.bookmark.createdAt,
            })}`}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid item>
            <div>
              <ButtonBase onClick={handleBookmarkDelete}>
                <StyledDeleteIcon />
              </ButtonBase>
              <ShareButton />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { BookmarkArticleCard };
