import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import WorkIcon from '@material-ui/icons/Work';
import Avatar from '@material-ui/core/Avatar';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../shared/timeLineItemType';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useState } from 'react';

type timeLineitem = {
  datetime: string;
  topic: string;
  content: string;
  isLast: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));



export function CustomTimeLineItem(params: timeLineitem) {

  const [reportList, setreportList] = useState([]);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => (console.log(item.title)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  if (params.content.includes('\n')) {
    console.log(params.content.split('\n')[0]);
  }

  const classes = useStyles();
  if (!params.isLast) {
    return (
      <TimelineItem ref={drop}>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {params.datetime}
            {canDrop && isOver ? 'Release to drop' : ''}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <WorkIcon />
          </TimelineDot>
          <TimelineConnector></TimelineConnector>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {params.topic}
            </Typography>
            <Typography>{params.content}</Typography>
            <List>
              {reportList.map((value) => {
                <ListItemText primary={value} secondary={value}></ListItemText>
              })}
            </List>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    )
  }
  else {
    return (
      <TimelineItem ref={drop}>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {params.datetime}
            {canDrop && isOver ? 'Release to drop' : ''}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <WorkIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {params.topic}
            </Typography>
            <Typography>{params.content}</Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            </List>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    )
  }
}