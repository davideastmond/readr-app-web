import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";
import { StyledButton } from "../buttons/styled-button";
import { useState } from "react";
import "./style.css";
import { pallet } from "../../themes/theme";
import { useAppSelector } from "../../hooks";
import {
  selectAppStateStatus,
  selectSessionUser,
} from "../../reducers/app/app.reducer";
import { FormFields } from "../../definitions/form-fields";
import { PAGE_SIZE_NUMERIC_OPTIONS } from "../../definitions/page-size-numeric-options";
import { FormInputValidator } from "../../validators/form-input-validator/form-input-validator";
import { PAGESIZE_RULES } from "../../validators/validator-rules";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { patchPageSize } from "../../reducers/app/thunks/app.thunks";
import { Spinner } from "../spinner";
import { StateStatus } from "../../reducers/state-store.definitions";
interface IHeadlinesTopicsPanelProps {
  hasSession: boolean;
}

const generateNumericOptions = () => {
  return PAGE_SIZE_NUMERIC_OPTIONS.map((val) => (
    <MenuItem value={val}>{val}</MenuItem>
  ));
};

const StyledFormControl = styled(FormControl)(() => ({
  "&.MuiFormControl-root": {
    marginTop: "10px",
    width: "100%",
  },
}));

function HeadlinesTopicsPanel(props: IHeadlinesTopicsPanelProps) {
  const sessionUser = useAppSelector(selectSessionUser);
  const [headlinesCount, setHeadlinesCount] = useState<number>(
    sessionUser?.configuration.pageSize.headlines || 30
  );
  const [feedCount, setFeedCount] = useState<number>(
    sessionUser?.configuration.pageSize.feed || 30
  );
  const [hasError, setHasError] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const appBusyState = useAppSelector(selectAppStateStatus);
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    if (name === "number-of-headlines") {
      setHeadlinesCount(parseInt(value));
    } else if (name === "number-of-custom") {
      setFeedCount(parseInt(value));
    }
  };

  const handlePatchChanges = () => {
    // Validate fields
    resetErrorState();
    const fieldsToValidate = {
      [`${FormFields.NumberOfHeadlines}`]: headlinesCount,
      [`${FormFields.NumberOfCustom}`]: feedCount,
    };
    const fieldValidator = new FormInputValidator();
    const result = fieldValidator.validate(fieldsToValidate, PAGESIZE_RULES);
    if (result.success) {
      // do the dispatch
      dispatch(
        patchPageSize({
          headlines: headlinesCount,
          feed: feedCount,
        })
      );
    } else {
      setHasError(true);
    }
  };

  const resetErrorState = () => {
    setHasError(false);
  };
  return (
    <Box>
      {isBusy && <Spinner />}
      {appBusyState.status === StateStatus.Loading && <Spinner />}
      {/* Headline pageSize setting */}
      <div className="headline-topics-inner-closure">
        <Box component="header" mb={3}>
          <Typography>
            Use these settings to tweak how many articles are fetched for
            headlines and your custom feed
          </Typography>
        </Box>
        <Box></Box>
        <Box>
          <StyledFormControl>
            <InputLabel id="number-of-headlines-label">
              Number of headlines
            </InputLabel>
            <Select
              labelId="number-of-headlines-label"
              id={FormFields.NumberOfHeadlines}
              label="Number of headlines"
              onChange={handleSelectChange}
              value={headlinesCount.toString()}
              name={FormFields.NumberOfHeadlines}
            >
              {generateNumericOptions()}
            </Select>
          </StyledFormControl>
        </Box>
        <Box>
          <StyledFormControl>
            <InputLabel id="custom-feed-label">
              Number of custom feed articles
            </InputLabel>
            <Select
              labelId="custom-feed-label"
              id={FormFields.NumberOfCustom}
              label="Number of feed articles"
              onChange={handleSelectChange}
              value={feedCount.toString()}
              name={FormFields.NumberOfCustom}
            >
              {generateNumericOptions()}
            </Select>
          </StyledFormControl>
        </Box>
        <Box component={"footer"} mt={3}>
          {/* Save control */}
          <FormControl>
            <StyledButton
              textLabel="Save"
              id={"save"}
              buttonFillColor={pallet.WoodsGreen}
              buttonTextColor={pallet.White}
              onClick={handlePatchChanges}
            />
          </FormControl>
        </Box>
      </div>
    </Box>
  );
}

export default HeadlinesTopicsPanel;
