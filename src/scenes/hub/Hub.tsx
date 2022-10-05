import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { BookmarksPanel } from "../../components/bookmarks-panel";
import { TopicsPanel } from "../../components/topics-panel";
import Feed from "../feed";

interface IHubPageProps {
  hasSession?: boolean;
}

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

/**
 * Headlines - custom feed - topics - bookmarks
 * @param props
 * @returns
 */
function HubPage(props: IHubPageProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="My feed" {...a11yProps(0)} />
          <Tab label="Headlines" {...a11yProps(1)} />
          <Tab label="My topics" {...a11yProps(2)} />
          <Tab label="Bookmarks" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Feed hasSession={props.hasSession} mode={"custom"} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Feed hasSession={props.hasSession} mode={"headlines"} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TopicsPanel hasSession={props.hasSession} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BookmarksPanel hasSession={props.hasSession} />
      </TabPanel>
    </Box>
  );
}

export default HubPage;
