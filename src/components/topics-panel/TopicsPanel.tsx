import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useAppSelector } from "../../hooks";
import {
  deleteTopicsAsync,
  putTopicsAsync,
  selectAppStateStatus,
  selectUserTopics,
} from "../../reducers/app-reducer";
import React, { useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

import { StyledButton } from "../buttons/styled-button";
import { pallet } from "../../themes/theme";
import "./style.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { StateStatus } from "../../reducers/state-store.definitions";
import { Spinner } from "../spinner";

interface ITopicsPanelProps {
  hasSession?: boolean;
}

const ListItemElement = (
  label: string,
  value: number,
  toggleFunction: (value: number, label: string) => void,
  checked: number[]
) => {
  const labelId = `checkbox-list-label-${value}`;
  const identifier = `checkbox-item-${label}`;
  return (
    <ListItem key={value} disablePadding>
      <ListItemButton
        role={undefined}
        onClick={() => toggleFunction(value, label)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            id={identifier}
            edge="start"
            checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

function TopicsPanel(props: ITopicsPanelProps) {
  const userTopics = useAppSelector(selectUserTopics);
  const [checked, setChecked] = useState([-1]);
  const [topicsInput, setTopicsInput] = useState<string>("");
  const checkBoxState = useRef({});
  const dispatch = useDispatch<AppDispatch>();
  const appStateStatus = useAppSelector(selectAppStateStatus);

  const handleToggle = (value: number, label: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      checkBoxState.current = {
        ...checkBoxState.current,
        [label]: true,
      };
    } else {
      checkBoxState.current = {
        ...checkBoxState.current,
        [label]: false,
      };
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleEnterTopicString = () => {
    if (topicsInput.trim() !== "") {
      const commaSeparatedTopics = topicsInput
        .split(",")
        .map((el) => el.trim().toLowerCase())
        .filter((word) => word.trim() !== "");
      dispatch(putTopicsAsync(commaSeparatedTopics));
      setTopicsInput("");
    }
  };

  const handleTopicsInputBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setTopicsInput(input);
  };

  const handleDeleteTopics = () => {
    const topicElements = Object.entries(checkBoxState.current)
      .filter((element) => element[1] === true)
      .map((t) => t[0]);

    if (topicElements.length > 0) {
      dispatch(deleteTopicsAsync(topicElements));
      setChecked([-1]);
      checkBoxState.current = {};
    }
  };
  return (
    <Box>
      <Box>{appStateStatus.status === StateStatus.Loading && <Spinner />}</Box>
      <Box>
        {appStateStatus.status === StateStatus.Error && (
          <Typography fontSize={"0.9rem"} color={pallet.RedTiaMaria}>
            {appStateStatus.message ||
              `${appStateStatus.message}: There was an error completing this request. Please try signing in again.`}
          </Typography>
        )}
      </Box>
      <Box width={"100%"} maxWidth={"600px"}>
        <div className="topics-add-control-div">
          <TextField
            label="Enter topics"
            id="text-field-topics"
            onChange={handleTopicsInputBoxChange}
            value={topicsInput}
            sx={{ width: "100%" }}
          />
          <StyledButton
            textLabel="Add"
            buttonFillColor={pallet.WoodsGreen}
            id="add-topics-button"
            buttonTextColor={pallet.White}
            onClick={handleEnterTopicString}
            disabled={topicsInput.length < 3}
          />
        </div>
        <div>
          <Typography
            fontSize={"0.9rem"}
            color={pallet.WoodsGreen}
            marginTop={"10px"}
          >
            You can enter a single keyword, or bunch of keywords separated by
            commas. Hit the add button.
          </Typography>
        </div>
      </Box>
      <Box>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            marginTop: "30px",
          }}
        >
          {userTopics &&
            userTopics.map((el, index) =>
              ListItemElement(el, index, handleToggle, checked)
            )}
        </List>
        {(!userTopics || userTopics.length === 0) && (
          <Typography
            fontStyle={"italic"}
            fontSize={"0.9rem"}
            color={pallet.RedTiaMaria}
          >
            You have no topics. Add some topics to customize your feed
          </Typography>
        )}
        <Box p={"1rem"} display={"flex"}>
          {userTopics && userTopics.length > 0 && (
            <StyledButton
              textLabel="Delete"
              buttonFillColor={pallet.RedTiaMaria}
              id="delete-topics-button"
              buttonTextColor={pallet.White}
              onClick={handleDeleteTopics}
              disabled={checked.length === 1}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default TopicsPanel;
