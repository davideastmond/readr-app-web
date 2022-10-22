import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { NewsSourcesPanel } from "../../components/news-sources-panel";
import { UserSettingsPanel } from "../../components/user-settings-panel";

interface ISettingsProps {
  hasSession: boolean;
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

function Settings(props: ISettingsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="hub tabs">
          <Tab label="Password & Profile" {...a11yProps(0)} />
          <Tab label="News Sources" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserSettingsPanel hasSession={props.hasSession} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewsSourcesPanel hasSession={props.hasSession} />
      </TabPanel>
    </Box>
  );
}

export default Settings;
