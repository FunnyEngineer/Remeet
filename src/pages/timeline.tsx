import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import Typography from '@material-ui/core/Typography';
import { CustomTimeLineItem } from '../components/timelinItem';
import RecipeReviewCard from '../components/eventCard';
import { createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { EventHandler, timeLineitemType } from '../shared/timeLineItemType';
import { Link } from 'react-router-dom';

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
    datetime: '',
    content: 'Project starts from here',
    topic: 'Start',
  }
  const end : timeLineitemType = {
    datetime: '',
    content: 'Project ends here',
    topic: 'End',
  }
  const [itemList, setitemList] = useState([start, end]);
  var realList = itemList.map((item, index)=>{
    const isLast = (index == itemList.length - 1) ? true : false;
    return <CustomTimeLineItem datetime={item.datetime} content={item.content} topic={item.topic} isLast = {isLast}/>
  })
  // handling react hook
  
  const handleEvent:EventHandler= {
    handler: (event :timeLineitemType) => {
    console.log(event);
    itemList.splice((itemList.length - 1), 0, event);
    console.log(itemList);
    setitemList([...itemList]);
  }};
  interface eventType {
    eventHandler: (event: timeLineitemType) => void
  }

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
        <Button component={ Link } to="/report" color="inherit" >Report</Button>
      </Toolbar>
    </AppBar>
    </div>
    <Timeline align="alternate">
      {realList}
    </Timeline>
    <div>
      <RecipeReviewCard handler={handleEvent.handler} />
    </div>
    </div>
  );
}
