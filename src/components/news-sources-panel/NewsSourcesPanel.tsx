import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  INewsSource,
  ISecureUser,
  TCustomSourceFilter,
} from "../../definitions/user";
import { useAppSelector } from "../../hooks";
import {
  patchNewsSourcesAsync,
  selectAppStatus,
  selectSessionUser,
  SUCCESS_UPDATE_MESSAGE,
} from "../../reducers/app.reducer";
import { StateStatus } from "../../reducers/state-store.definitions";
import { NewsClient } from "../../services/client/news-client";
import { AppDispatch } from "../../store";
import { pallet } from "../../themes/theme";
import { createFriendlyErrorMessage } from "../../utils/friendly-error-message-factory";
import { StyledButton } from "../buttons/styled-button";
import { SnackBarAlert } from "../snack-alert";
import { Spinner } from "../spinner";
import { NEWS_SOURCE_HELPERS } from "./news-source-helpers";
import { setClearStatusMessage } from "../../reducers/app.reducer";

import "./style.css";
interface INewsSourcesPanel {
  hasSession?: boolean;
}

const StyledListItem = styled(ListItem)((props) => ({
  padding: "0",
  "&.MuiListItem-root.Mui-selected": {
    backgroundColor: pallet.OrangeTangerine,
    color: pallet.White,
  },
}));
/**
 * NewsSources panel should have radios that are "exclude", "only include", "no-filtering"
 * There are
 */
function NewsSourcesPanel(props: INewsSourcesPanel) {
  const [originalSources, setOriginalSources] = useState<INewsSource[]>([]);
  const [originalSourceReference, setOriginalSourcesReference] = useState<
    INewsSource[]
  >([]);

  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<TCustomSourceFilter>("none");

  const appStatus = useAppSelector(selectAppStatus);

  const [selectedItems, setSelectedItems] = useState<INewsSource[]>([]);
  const [targetedItems, setTargetedItems] = useState<INewsSource[]>([]);
  const [selectedTargetItems, setSelectedTargetItems] = useState<INewsSource[]>(
    []
  );

  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const sessionUser = useAppSelector(selectSessionUser);

  const fetchSources = async () => {
    const newsSourceClient = new NewsClient();
    return newsSourceClient.getNewsSources();
  };

  // Reset the lists and fetch original sources
  const resetLists = async () => {
    try {
      setIsBusy(true);
      setSelectedItems([]);
      setTargetedItems([]);
      await mapToINewsSource();
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsBusy(false);
    }
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(
      (event.target as HTMLInputElement).value as TCustomSourceFilter
    );
  };
  const mapToINewsSource = async () => {
    const mappedSources = await fetchSources().then((source) => {
      return Object.entries(source).map((el) => {
        return {
          name: el[1],
          id: el[0],
        };
      });
    });

    if (sessionUser && sessionUser.configuration.sources.option !== "none") {
      const userSources = sessionUser.configuration.sources.list;
      setSelectedItems([]);
      setTargetedItems(userSources);
      const sourceListFiltered = NEWS_SOURCE_HELPERS.filterFromSourceList(
        userSources,
        mappedSources
      );
      setOriginalSources(sourceListFiltered);
    } else {
      setOriginalSources(mappedSources);
    }
    setOriginalSourcesReference(mappedSources);
  };

  // On initial load, we need to check the user's news sources status
  useEffect(() => {
    if (sessionUser && sessionUser.configuration.sources) {
      if (
        sessionUser.configuration.sources.option === "none" ||
        (sessionUser.configuration.sources.option as any) === ""
      ) {
        try {
          setIsBusy(true);
          fetchSourcesNone();
          setRadioValue("none");
        } catch (err: any) {
          console.error(err.message);
        } finally {
          setIsBusy(false);
        }
      } else {
        try {
          setIsBusy(true);
          fetchSourcesFiltered(sessionUser);
          sessionUser.configuration.sources.option === "onlyInclude"
            ? setRadioValue("onlyInclude")
            : setRadioValue("onlyExclude");
        } catch (err: any) {
          console.error(err.message);
        } finally {
          setIsBusy(false);
        }
      }
    }
  }, []);

  const fetchSourcesNone = async () => {
    await mapToINewsSource();
  };

  const fetchSourcesFiltered = async (user: ISecureUser) => {
    // Get all sources
    await mapToINewsSource();

    // Filter out and set the selected
    const items = user.configuration.sources.list;
    setSelectedItems(items);
  };

  const handleSelect = (event: any) => {
    const { id } = event.currentTarget;
    if (!selectedItems.some((el) => el.id === id)) {
      setSelectedItems([
        ...selectedItems,
        {
          id: id,
          name: originalSources[originalSources.findIndex((el) => el.id === id)]
            .name,
        },
      ]);
    } else {
      const filtered = selectedItems.filter((item) => item.id !== id);
      setSelectedItems(filtered);
    }
  };

  const handleSelectTarget = (event: any) => {
    const { id } = event.currentTarget;
    if (!selectedTargetItems.some((el) => el.id === id)) {
      setSelectedTargetItems([
        ...selectedTargetItems,
        {
          id: id,
          name: originalSourceReference[
            originalSourceReference.findIndex((el) => el.id === id)
          ].name,
        },
      ]);
    } else {
      const filtered = selectedTargetItems.filter((item) => item.id !== id);
      setSelectedTargetItems(filtered);
    }
  };

  const generateEmptyListItem = (): JSX.Element => {
    return (
      <StyledListItem>
        <ListItemButton sx={{ paddingTop: "0", paddingBottom: "0" }}>
          <ListItemText>Empty</ListItemText>
        </ListItemButton>
      </StyledListItem>
    );
  };
  const generateItems = (
    item: INewsSource,
    selectFunction: (event: any) => void,
    selectedItemsList: INewsSource[]
  ): JSX.Element => {
    return (
      <StyledListItem
        selected={selectedItemsList.some((el) => el.id === item.id)}
        key={`item__${item.id}`}
      >
        <ListItemButton
          id={item.id}
          onClick={selectFunction}
          sx={{ paddingTop: "0", paddingBottom: "0" }}
        >
          <ListItemText id={item.id}>{item.name}</ListItemText>
        </ListItemButton>
      </StyledListItem>
    );
  };

  const handleAddAllItemsToTargetList = async () => {
    await mapToINewsSource();
    setSelectedItems(originalSources);
    handleAddSelectedItems(originalSources, originalSources); // Should add all
  };

  const handleSubmitSavePatchSources = () => {
    if (radioValue === "none") {
      dispatch(patchNewsSourcesAsync({ option: radioValue, list: [] }));
    } else {
      dispatch(
        patchNewsSourcesAsync({ option: radioValue, list: targetedItems })
      );
    }
  };

  const handleAddSelectedItems = (
    items: INewsSource[],
    sourceList: INewsSource[]
  ) => {
    // Transfer the items
    setOriginalSources(
      NEWS_SOURCE_HELPERS.filterFromSourceList(items, sourceList)
    );
    setTargetedItems(NEWS_SOURCE_HELPERS.addToTargetList(items, targetedItems));
    // Clear the selected list
    setSelectedItems([]);
  };

  const handleRemoveSelectedTargetItems = (
    items: INewsSource[],
    sourceList: INewsSource[]
  ) => {
    // Puts the selected items back in the source list
    setTargetedItems(
      NEWS_SOURCE_HELPERS.filterFromSourceList(items, sourceList)
    );
    setOriginalSources(
      NEWS_SOURCE_HELPERS.addToTargetList(items, originalSources)
    );
    setSelectedItems([]);
  };

  const handleRemoveAll = async () => {
    setSelectedItems([]);
    setTargetedItems([]);
    await mapToINewsSource();
  };

  const handleCloseSnackBarAlertMessage = () => {
    setSnackBarOpen(false);
    dispatch(setClearStatusMessage());
  };

  return (
    <Box>
      <Box>
        {appStatus.status === StateStatus.Loading && (
          <div className="Spinner__enclosure absolute-positioning">
            <Spinner />
          </div>
        )}
        {appStatus.status === StateStatus.Error && (
          <Box marginTop={"10px"}>
            <Alert severity="error" sx={{ backgroundColor: pallet.White }}>
              {createFriendlyErrorMessage(appStatus.message)}
            </Alert>
          </Box>
        )}
        <Box component={"div"}>
          <SnackBarAlert
            text="Updates complete"
            isOpen={
              appStatus.status === StateStatus.Idle &&
              appStatus.message === SUCCESS_UPDATE_MESSAGE
            }
            onClose={handleCloseSnackBarAlertMessage}
          />
        </Box>
      </Box>
      <Box component={"header"}>
        <FormControl>
          <FormLabel id="sources-control">Sources Options</FormLabel>
          <RadioGroup
            row
            aria-labelledby="source-options-radio-buttons-group"
            name="source-options-radio-buttons-group"
            value={radioValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="onlyExclude"
              control={<Radio />}
              label="Exclude sources"
            />
            <FormControlLabel
              value="onlyInclude"
              control={<Radio />}
              label="Only these sources"
            />
            <FormControlLabel
              value="none"
              control={<Radio />}
              label="No Filter"
            />
          </RadioGroup>
        </FormControl>
        <Box component={"div"} mb={3}>
          <StyledButton
            textLabel="Save"
            buttonFillColor={pallet.WoodsGreen}
            buttonTextColor={pallet.White}
            id="save-options"
            squared={true}
            onClick={handleSubmitSavePatchSources}
          />
        </Box>
      </Box>
      <Box component="div" className="flex__container">
        <List className="container__list-boxes">
          {originalSources &&
            originalSources.length > 0 &&
            originalSources.map((source) =>
              generateItems(source, handleSelect, selectedItems)
            )}
          {(!originalSources || originalSources.length === 0) &&
            generateEmptyListItem()}
        </List>
        <div>
          <Box component="div" className="container__controls">
            <StyledButton
              textLabel="Add >"
              id="add-source"
              buttonFillColor={pallet.WoodsGreen}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
              disabled={selectedItems.length === 0}
              onClick={() =>
                handleAddSelectedItems(selectedItems, originalSources)
              }
            />
            <StyledButton
              textLabel="< Remove"
              id="remove-source"
              buttonFillColor={pallet.RedTiaMaria}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
              disabled={targetedItems.length === 0}
              onClick={() =>
                handleRemoveSelectedTargetItems(
                  selectedTargetItems,
                  targetedItems
                )
              }
            />
          </Box>
          <Box component="div" className="container__controls" mt={5}>
            <StyledButton
              textLabel="Add All >"
              id="add-all-source"
              buttonFillColor={pallet.WoodsGreen}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
              disabled={originalSources.length === 0}
              onClick={handleAddAllItemsToTargetList}
            />
            <StyledButton
              textLabel="< Remove All"
              id="remove-all-source"
              buttonFillColor={pallet.RedTiaMaria}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
              disabled={targetedItems.length === 0}
              onClick={handleRemoveAll}
            />
          </Box>
          <Box component="div" className="container__controls" mt={5}>
            <StyledButton
              textLabel="Reset"
              id="reset"
              buttonFillColor={pallet.GrapeWine}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
              onClick={resetLists}
            />
          </Box>
        </div>
        <List className="container__list-boxes">
          {targetedItems &&
            targetedItems.length > 0 &&
            targetedItems.map((item) =>
              generateItems(item, handleSelectTarget, selectedTargetItems)
            )}
          {(!targetedItems || targetedItems.length === 0) &&
            generateEmptyListItem()}
        </List>
      </Box>
    </Box>
  );
}

export default NewsSourcesPanel;
