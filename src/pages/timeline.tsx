import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CustomTimeLineItem } from '../components/timelinItem';
import RecipeReviewCard from '../components/eventCard';
import { createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { timeLineitemType } from '../shared/timeLineItemType';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function CustomizedTimeline() {
  const classes = useStyles();
  const nowDate = new Date(Date.now()).toISOString();

  const start: timeLineitemType = {
    datetime: nowDate,
    content: 'Project starts from here',
    topic: 'Start',
  }
  const end : timeLineitemType = {
    datetime: nowDate,
    content: 'Project ends here',
    topic: 'End',
  }
  // const startItem = <CustomTimeLineItem datetime={nowDate} content='Project starts from here' topic='Start'/>;
  // const endItem = <CustomTimeLineItem datetime={nowDate} content='Project ends here.' topic='End'/>
  const [itemList, setitemList] = useState([start, end]);
  var realList = itemList.map((item, index)=>{
    const isLast = (index == itemList.length - 1) ? true : false;
    return <CustomTimeLineItem datetime={item.datetime} content={item.content} topic={item.topic} isLast = {isLast}/>
  })
  console.log(realList)
  return (
    <div>
    
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Remeet
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    </div>
    <Timeline align="alternate">
      {realList}
    </Timeline>
    <div>
      <RecipeReviewCard />
    </div>
    </div>
  );
}
