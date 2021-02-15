import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { grey, red } from '@material-ui/core/colors';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { EventHandler, timeLineitemType } from '../shared/timeLineItemType';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
      position: 'absolute',
      bottom: 10,
      right: 10,
      '& > *':{
        margin: theme.spacing(1),
        width: '25ch',
      },
      backgroundColor: grey[100],
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    textField: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);


function onAddEvent(params:timeLineitemType) {
  return 
}

export default function RecipeReviewCard(handleEvent: EventHandler) {
  const classes = useStyles();

  const [targetDate, setDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const event : timeLineitemType = {
    datetime: (targetDate as any).toLocaleDateString('en-US'),
    topic : title,
    content : content,
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" paragraph={true} >
          Here are the input form that could help you create the event
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container  className = {classes.textField} >
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={targetDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          
          <TextField label="Topic" onChange={(event)=>{
            setTitle(event.target.value);
            console.log(title);}}></TextField>
          <TextField multiline label="Content" rows={4} onChange={(event) => {
            setContent(event.target.value)}
            }/>
        </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
      <Grid container justify="flex-end">
        <Button variant="contained" color="primary" 
        onClick={(prop) => handleEvent.handler(event) }>
        Add Event
        </Button>
     </Grid>
    </Card>
  );
}
