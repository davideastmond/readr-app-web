// This is the main article card. It will have an image, title, blurb, link to main article
// Allow bookmarks toggle if user is logged in

import { NewsArticle } from "../../../definitions/news-article.types";
import {
  Grid,
  Paper,
  ButtonBase,
  Typography,
  styled,
  Box,
} from "@mui/material";
import CardImage from "../card-image/CardImage";
import { StringHelpers } from "../../../utils/string-helpers";
import { BookmarkBar } from "../../bookmark-bar";
import { ShareButton } from "../../buttons/share-button";

interface INewsArticleCardProps {
  article: NewsArticle;
  canInteract?: boolean;
  isBookmarked?: boolean;
  onDeleteBookmark?: (url: string) => void;
  onAddBookmark?: ({
    url,
    title,
    urlToImage,
    source,
  }: {
    url: string;
    title: string;
    urlToImage: string;
    source: { name: string; id: string };
  }) => void;
}

const StyledArticleTitle = styled(Typography)((props) => ({
  "&.MuiTypography-root": {
    fontWeight: "bolder",
  },
}));
function NewsArticleCard(props: INewsArticleCardProps) {
  const handleBookmarkToggled = ({
    current,
    next,
  }: {
    current: boolean;
    next: boolean;
  }) => {
    if (next === true) {
      props.onAddBookmark &&
        props.onAddBookmark({
          url: props.article.url,
          title: props.article.title,
          urlToImage: props.article.urlToImage,
          source: {
            name: props.article.source.name,
            id: props.article.source.id,
          },
        });
    } else {
      props.onDeleteBookmark && props.onDeleteBookmark(props.article.url);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        mt: 1,
        mb: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase href={props.article.url} target="_blank" rel="noreferrer">
            <CardImage src={props.article.urlToImage} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <ButtonBase
                href={props.article.url}
                target="_blank"
                rel="noreferrer"
              >
                <StyledArticleTitle gutterBottom variant="subtitle1">
                  {props.article.title}
                </StyledArticleTitle>
              </ButtonBase>
              <Typography>{props.article.description}</Typography>
              <Typography>
                <a
                  className="noTextOrnamentation"
                  href={props.article.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {props.article.source.name}
                </a>
              </Typography>
              <Typography>
                {StringHelpers.getFormattedDate({
                  dateString: props.article.publishedAt,
                })}
              </Typography>
              {props.canInteract && (
                <Box component="div" display={"flex"}>
                  <BookmarkBar
                    checked={!!props.isBookmarked}
                    onClick={handleBookmarkToggled}
                  />
                  <ShareButton url={props.article.url} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export { NewsArticleCard };
