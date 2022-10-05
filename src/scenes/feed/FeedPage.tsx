import { INewsArticleAPIResponse } from "../../definitions/news-article.types";
import { useState, useEffect } from "react";
import { Spinner } from "../../components/spinner";
import { NewsArticleCard } from "../../components/news-article/card/NewsArticleCard";
import "./style.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  deleteBookmarkAsync,
  putBookmarkAsync,
  selectUserBookmarks,
} from "../../reducers/app-reducer";
import { useAppSelector } from "../../hooks";
import { Box, Typography } from "@mui/material";
import { UserClient } from "../../services/client/user-client";
import { NewsClient } from "../../services/client/news-client";

import { pallet } from "../../themes/theme";

interface IFeedPageProps {
  hasSession?: boolean;
  mode: "headlines" | "custom";
}
function FeedPage(props: IFeedPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<INewsArticleAPIResponse | null>(
    null
  );

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchHeadlines = async () => {
    setIsLoading(true);
    try {
      const client = new NewsClient();
      const data = await client.fetchHeadlines();
      setArticles(data);
      setIsLoading(false);
    } catch (err: any) {
      setHasError(true);
      setErrorMessage(
        "There was a problem fetching headlines data. Try logging in again or check your connection"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeed = async () => {
    setIsLoading(true);
    try {
      const client = new UserClient();
      const data = await client.getFeed();
      setArticles(data);
      setIsLoading(false);
    } catch (err: any) {
      setHasError(true);
      const networkMessage = err.response?.data?.error;
      setErrorMessage(
        `There was a problem fetching your feed. Try logging in again or check your connection: ${networkMessage}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const bookmarks = useAppSelector(selectUserBookmarks);

  useEffect(() => {
    if (props.mode === "headlines") {
      fetchHeadlines();
    } else if (props.mode === "custom") {
      fetchFeed();
    }
  }, []);

  const handleAddBookmark = async ({
    url,
    urlToImage,
    title,
    source,
  }: {
    url: string;
    urlToImage: string;
    title: string;
    source: { name: string; id: string };
  }) => {
    dispatch(putBookmarkAsync({ url, urlToImage, title, source }));
  };

  const handleDeleteBookmark = async (url: string) => {
    dispatch(deleteBookmarkAsync([url]));
  };

  const getIsBookmarked = (articleUrl: string): boolean => {
    if (bookmarks && bookmarks.length > 0) {
      return bookmarks.findIndex((element) => element.url === articleUrl) >= 0;
    }
    return false;
  };

  return (
    <div className="HeadlinesPage__main">
      {isLoading && <Spinner marginTop="10px" />}
      {hasError && (
        <Box component={"div"} display="flex" justifyContent={"center"}>
          <Typography fontSize={"1rem"} color={pallet.RedTiaMaria}>
            {errorMessage}
          </Typography>
        </Box>
      )}
      <div className="HeadlinesPage_Articles__Container">
        <Box
          component={"header"}
          mt={"20px"}
          display="flex"
          justifyContent={"center"}
        >
          {props.mode === "headlines" ? (
            <Typography variant="h3">Latest top headlines</Typography>
          ) : (
            <Typography variant="h3">Your feed</Typography>
          )}
        </Box>
        {articles &&
          articles.articles.map((article, index) => (
            <NewsArticleCard
              article={article}
              key={`idx-${index}-${article.url}`}
              canInteract={props.hasSession}
              isBookmarked={getIsBookmarked(article.url)}
              onAddBookmark={handleAddBookmark}
              onDeleteBookmark={handleDeleteBookmark}
            />
          ))}
      </div>
    </div>
  );
}

export default FeedPage;