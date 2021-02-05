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

type timeLineitem =  {
    datetime : string;
    topic : string;
    content : string;
    isLast : boolean;
}

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '6px 16px',
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));

export function CustomTimeLineItem(params:timeLineitem) {
    const classes = useStyles();
    if (params.isLast) {
      return (<TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
          {params.datetime}
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
          </Paper>
        </TimelineContent>
      </TimelineItem>
      )  
    }
    else{
    return (
        <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
          {params.datetime}
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