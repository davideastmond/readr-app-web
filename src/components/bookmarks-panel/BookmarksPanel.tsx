// This is in charge of getting the user's saved bookmarks

import { Alert, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import {
  deleteAllBookmarksAsync,
  deleteBookmarkAsync,
  selectAppStatus,
  selectUserBookmarks,
} from "../../reducers/app.reducer";
import { StateStatus } from "../../reducers/state-store.definitions";
import { AppDispatch } from "../../store";
import { pallet } from "../../themes/theme";
import { createFriendlyErrorMessage } from "../../utils/friendly-error-message-factory";
import { StyledButton } from "../buttons/styled-button";
import { Spinner } from "../spinner";
import { BookmarkArticleCard } from "./card/BookMarkedArticleCard";
import "./style.css";
interface IBookmarksPanelProps {
  hasSession?: boolean;
}

function BookmarksPanel(props: IBookmarksPanelProps) {
  const bookmarks = useAppSelector(selectUserBookmarks);
  const appState = useAppSelector(selectAppStatus);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteBookmark = (url: string) => {
    dispatch(deleteBookmarkAsync([url]));
  };
  const handleDeleteAllBookmarks = () => {
    dispatch(deleteAllBookmarksAsync());
  };
  return (
    <Box component={"div"} className="BookmarkArticles__container">
      {appState.status === StateStatus.Loading && <Spinner marginTop="10px" />}
      {appState.status === StateStatus.Error && (
        <Box marginTop={"10px"}>
          <Alert severity="error" sx={{ backgroundColor: pallet.White }}>
            {createFriendlyErrorMessage(appState.message)}
          </Alert>
        </Box>
      )}
      <Box
        component={"header"}
        mt={"20px"}
        display="flex"
        justifyContent={"center"}
      >
        <Typography variant="h3">Your bookmarks</Typography>
      </Box>
      <Box>
        <StyledButton
          textLabel="Delete All"
          buttonFillColor={pallet.RedTiaMaria}
          id="delete-topics-button"
          buttonTextColor={pallet.White}
          onClick={handleDeleteAllBookmarks}
          disabled={!bookmarks || bookmarks.length === 0}
        />
      </Box>
      {bookmarks &&
        bookmarks.length > 0 &&
        bookmarks.map((bookmark) => (
          <BookmarkArticleCard
            bookmark={bookmark}
            onDeleteBookmark={handleDeleteBookmark}
            key={bookmark.url}
          />
        ))}
      {(!bookmarks || bookmarks.length === 0) && (
        <Typography
          fontStyle={"italic"}
          fontSize={"0.9rem"}
          color={pallet.RedTiaMaria}
        >
          You have no bookmarks
        </Typography>
      )}
    </Box>
  );
}

export default BookmarksPanel;
