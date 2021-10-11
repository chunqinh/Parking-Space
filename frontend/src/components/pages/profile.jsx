import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountDetails from "../profile/account-overview";
import ProfilePasswordChange from "../profile/change-password";

//Vertical Tabs from MaterialUI https://mui.com/components/tabs/

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="profile-tabs" hidden={value !== index} id={`vertical-profile-tabs-${index}`} aria-labelledby={`vertical-tab-${index}`}{...other}>
            {value === index && (
                <Box className="profile-tab-panels" sx={{ p: 3 }}>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-profile-tabs-${index}`,
    };
}

export default function UserProfile() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="single-height-pages">
            <div className="row" style={{width:'1200px', alignItems:'center'}}>
                <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="Profile Tabs">
                    <Tab label="Account Details" {...a11yProps(0)} />
                    <Tab label="Edit Schedule" {...a11yProps(1)} />
                    <Tab label="Change Password" {...a11yProps(2)} />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <AccountDetails/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ProfilePasswordChange/>
                </TabPanel>
            </div>

        </div>
    );
}