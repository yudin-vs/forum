import React from 'react';
import {useTheme} from "@material-ui/core/styles/index";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ToolBars from './ToolBars';


export default function Menu(props)
{
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'), {noSsr: true});

    return <ToolBars isSm={isSm} logo={props.logo}/>
}