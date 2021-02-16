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
import Checkbox from '@material-ui/core/Checkbox';
import { useDrop } from 'react-dnd';
import { DragItem, ItemTypes } from '../shared/timeLineItemType';
import { IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

type timeLineitem = {
  datetime: string;
  topic: string;
  content: string;
  isLast: boolean;
  index: number;
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

  const [reportList , setreportList] = useState<DragItem[]>([]);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: DragItem) => (handleReport(item)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  //handle report
  const handleReport = (item: DragItem) => {
    console.log(item);
    setreportList(reportList.concat([item]));
    console.log(reportList);
  }
  const reportRender = reportList.map((value, index) => {
    return (
      <ListItem alignItems="flex-start">
        <ListItemText primary={value.editType} secondary={<Typography>{value.report}</Typography>} />
      </ListItem>
    )
  })

  const [reportCBList, setreportCBList] = useState(params.content.split('\n').map(() => false));
  const contentList = params.content.split('\n').map((value, index) => {

    const labelId = value;
    return (
      <ListItem key={value} role={undefined} dense button onClick={() => {
        reportCBList[index] = !reportCBList[index];
        setreportCBList([...reportCBList]);
      }}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={reportCBList[index]}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={value} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments">
            <CancelIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  })

  const classes = useStyles();
  if (!params.isLast) {
    if (params.index != 0) {
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
              <List>
              {contentList}
              {reportRender}
              </List>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      )
    }

    else {
      return (<TimelineItem ref={drop}>
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
            </List>
          </Paper>
        </TimelineContent>
      </TimelineItem>)

    }
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
          </Paper>
        </TimelineContent>
      </TimelineItem>
    )
  }
}