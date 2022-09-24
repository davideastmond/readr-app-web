// This is the main article card. It will have an image, title, blurb, link to main article
// Allow favorite toggle if user is logged in

import { NewsArticle } from "../../../definitions/news-article.types";
import { Grid, Paper, ButtonBase, Typography, styled } from "@mui/material";
import CardImage from "../card-image/CardImage";
import { StringHelpers } from "../../../utils/string-helpers";
import { FavBar } from "../../fav-bar";

interface INewsArticleCardProps {
  article: NewsArticle;
  canFavorite?: boolean;
  isFavorite?: boolean;
}

const StyledArticleTitle = styled(Typography)((props) => ({
  "&.MuiTypography-root": {
    fontWeight: "bolder",
  },
}));
function NewsArticleCard(props: INewsArticleCardProps) {
  return (
    <Paper
      sx={{
        p: 2,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase>
            <CardImage src={props.article.urlToImage} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <StyledArticleTitle gutterBottom variant="subtitle1">
                {props.article.title}
              </StyledArticleTitle>
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
              {props.canFavorite && <FavBar checked={!!props.isFavorite} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export { NewsArticleCard };
