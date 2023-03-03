import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { makeStyles } from "@material-ui/core/styles";
import { Card } from '@mui/material';
import { StyledMultiInput } from "../components/styledMulInput"
import Editor from './codeEditor';
import EditorPython from './codeEditorPython';
import { handlerPyExampleQiskit, handlerPyExampleBraket, handlerPyExampleQsharp, handlerPyExampleCirq } from "data/createPage";

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


export default function CreateEditorTab(props) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs sx={{ backgroundColor: '#0f1434' }} onChange={handleChange} value={value} aria-label="Create Function Tab">
                    <Tab label="handler.py" {...a11yProps(0)} />
                    {props.template && props.template === 'qsharp' && (
                        <Tab label="handler.qs" {...a11yProps(1)} />
                    )}
                    <Tab label="requirements.txt" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Card>
                    <EditorPython code={props.handlerPy} codeChanger={props.handlerPyChanger} />
                </Card>
            </TabPanel>
            {props.template && props.template === 'qsharp' && (
                <TabPanel value={value} index={1}>
                    <Card>
                        <EditorPython code={props.handlerQs} codeChanger={props.handlerQsChanger} />
                    </Card>
                </TabPanel>
            )}
            <TabPanel value={value} index={2}>
                <Card>
                    <EditorPython code={props.requirementTxt} codeChanger={props.requirementTxtChanger} />
                </Card>
            </TabPanel>
        </Box>
    );
}