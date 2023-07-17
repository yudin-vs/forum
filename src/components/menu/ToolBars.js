import React, { useEffect } from 'react';
import {useTheme} from "@material-ui/core/styles/index";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function ToolBars(props)
{
    const [isSm, setIsSm] = React.useState(props.isSm);
    const [open, setOpen] = React.useState(!isSm);

    useEffect(() => {
        if (isSm !== props.isSm) {
            setIsSm(props.isSm);
            setOpen(!props.isSm);
        }
    });

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <TopBar open={open} handleDrawerOpen={handleDrawerOpen} logo={props.logo}/>
            <SideBar open={open} handleDrawerOpen={handleDrawerOpen} logo={props.logo}/>
        </>
    )
}