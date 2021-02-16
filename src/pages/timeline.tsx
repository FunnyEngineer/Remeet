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
import { Divider, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import ReportItemList from './reportList';


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
  timeLine: {
    width: window.innerWidth / 2,
  },
  fullTimeLine: {
    flexGrow: 1,
  },
  addIcon: {
    position: 'fixed',
    bottom: 30,
    right: 30,
  },
  table: {
    height: window.outerHeight,
    paddingTop: 10,
  }
}));

export default function CustomizedTimeline() {
  const classes = useStyles();
  const nowDate = new Date(Date.now()).toISOString();

  const start: timeLineitemType = {
    datetime: '',
    content: 'Project starts from here',
    topic: 'Start',
  }
  const end: timeLineitemType = {
    datetime: '',
    content: 'Project ends here',
    topic: 'End',
  }
  const [cardShow, setCardShow] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [itemList, setitemList] = useState([start, end]);

  var realList = itemList.map((item, index) => {
    const isLast = (index == itemList.length - 1) ? true : false;
    return <CustomTimeLineItem datetime={item.datetime} content={item.content} topic={item.topic} isLast={isLast} index={index} />
  })

  // handling react hook
  const handleEvent: EventHandler = {
    handler: (event: timeLineitemType) => {
      itemList.splice((itemList.length - 1), 0, event);
      setitemList([...itemList]);
    },
    showHandler: (show: boolean) => {
      setCardShow(!show);
    }
  };

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
            <div>
            <Button color="inherit" onClick={() => {setReportShow(!reportShow)}} >
              {reportShow ? 'Report off' : 'Report on'}
            </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Grid container className={classes.table} >
        <div className={reportShow ? classes.timeLine : classes.fullTimeLine}>
          <Timeline align="alternate">
            {realList}
          </Timeline>
        </div>
        { reportShow &&
          <Divider orientation="vertical" flexItem />
        }
        { reportShow &&
          <div>
          <ReportItemList />
          </div>
        }
        
      </Grid>

      <div>
        <IconButton aria-label="add" className={classes.addIcon} onClick={() => { setCardShow(!cardShow); }}>
          <AddIcon color='primary' fontSize='large' />
        </IconButton>
      </div>
      {cardShow &&
        <RecipeReviewCard handler={handleEvent.handler} showHandler={handleEvent.showHandler} />
      }

    </div>
  );
}
