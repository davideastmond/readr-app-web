import {
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { INewsSource } from "../../definitions/user";
import { NewsClient } from "../../services/client/news-client";
import { pallet } from "../../themes/theme";
import { StyledButton } from "../buttons/styled-button";
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
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>("noFilter");

  const [selectedItems, setSelectedItems] = useState<INewsSource[]>([]);
  const [targetedItems, setTargetedItems] = useState<INewsSource[]>([]);
  const fetchSources = async () => {
    const newsSourceClient = new NewsClient();
    return newsSourceClient.getNewsSources();
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
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
    setOriginalSources(mappedSources);
  };

  useEffect(() => {
    try {
      setIsBusy(true);
      mapToINewsSource();
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setIsBusy(false);
    }
  }, []);

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
  const generateItems = (
    item: INewsSource,
    sourceArray: INewsSource[]
  ): JSX.Element => {
    return (
      <StyledListItem
        selected={sourceArray.some((el) => el.id === item.id)}
        key={`item__${item.id}`}
      >
        <ListItemButton
          id={item.id}
          onClick={handleSelect}
          sx={{ paddingTop: "0", paddingBottom: "0" }}
        >
          <ListItemText id={item.id}>{item.name}</ListItemText>
        </ListItemButton>
      </StyledListItem>
    );
  };

  const handleAddSelectedItems = () => {
    // Transer the items
    console.log(selectedItems);
  };
  return (
    <Box>
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
              value="excludeAll"
              control={<Radio />}
              label="Exclude sources"
            />
            <FormControlLabel
              value="onlyAll"
              control={<Radio />}
              label="Only these sources"
            />
            <FormControlLabel
              value="noFilter"
              control={<Radio />}
              label="No Filter"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box component="div" className="flex__container">
        <List className="container__list-boxes">
          {originalSources &&
            originalSources.length > 0 &&
            originalSources.map((source) =>
              generateItems(source, selectedItems)
            )}
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
              onClick={handleAddSelectedItems}
            />
            <StyledButton
              textLabel="< Remove"
              id="remove-source"
              buttonFillColor={pallet.RedTiaMaria}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
            />
          </Box>
          <Box component="div" className="container__controls" mt={5}>
            <StyledButton
              textLabel="Add All >"
              id="add-all-source"
              buttonFillColor={pallet.WoodsGreen}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
            />
            <StyledButton
              textLabel="< Remove All"
              id="remove-all-source"
              buttonFillColor={pallet.RedTiaMaria}
              buttonTextColor={pallet.White}
              sx={{ borderRadius: "0px", display: "block" }}
            />
          </Box>
        </div>
        <List className="container__list-boxes">
          <ListItem>
            <ListItemText>Placeholder</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default NewsSourcesPanel;
