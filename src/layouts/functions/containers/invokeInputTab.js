import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/core/styles";
import { Card } from '@mui/material';
import InvokeInputFormUI from "./invokeInputFormUI"
import InvokeInputFormJson from "./invokeInputFormJson"

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTabs-root": {
            backgroundColor: "#0f1535 !important"
        },
    }
}));

function TabPanel(props) {
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {

    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function InvokeInputTab(props) {

    const [value, setValue] = React.useState(0);
    const [recentInput, setRecentInput] = React.useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs sx={{ backgroundColor: '#0f1434' }} value={value} onChange={handleChange} aria-label="basic tabs example1">
                    <Tab label="Forms" {...a11yProps(0)} />
                    <Tab label="JSON" {...a11yProps(1)} />
                </Tabs>

            </Box>
            <TabPanel value={value} index={0}>
                <Card>
                    <InvokeInputFormUI recentInputChanger={setRecentInput} recentFunc={props.recentFunc} />
                </Card>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Card>
                    <InvokeInputFormJson recentInputChanger={setRecentInput} recentFunc={props.recentFunc} />
                </Card>
            </TabPanel>
        </Box>
    );
}