import React, { FC, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { useDrag, useDrop } from 'react-dnd';
import BuildIcon from '@material-ui/icons/Build';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import image from './construction.jpeg';
import CustomizedTimeline from './timeline';
import { DragItem, ItemTypes, ReportType } from '../shared/timeLineItemType';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    position: 'relative',
    height: 200,
    width: 200,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    position: 'absolute',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  icon: {
    position: 'relative',
    top: -50,
    opacity: 0.5,
    height: 30,
    width: 30,
  },
  media: {
    width: 300,
    paddingTop: '40.25%', // 16:9
  },
  content: {
    padding: 24,
  },
  grid: {
    padding: '50px 50px',
  },
  timeLine: {
    width: window.innerWidth / 2,
  }
}));

let ReportCard: FC<DragItem> = ({ author, report, editType }) => {
  const classes = useStyles();
  const [{ isDragging }, drag] = useDrag({
    item: { author:author , report:report, editType:editType, type: ItemTypes.CARD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <Card
      ref={drag}
      className={classes.card}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      elevation={5}
    >
      <CardMedia className={classes.media}
        title='Test'
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          {author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {report}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function ReportItemList() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const example1: ReportType = {
    author: 'Kevin',
    report: '2021/2/19 element variables...',
    type: 'Modified',
  }
  const example2: ReportType = {
    author: 'Ting-Yu',
    report: '2021/2/21 element id: 35962...',
    type: 'Deleted',
  }
  const example3: ReportType = {
    author: 'Tim',
    report: '2021/2/22 element id: 94562...',
    type: 'Created',
  }
  const [reportList, setReportList] = React.useState([example1]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const [{ isDragging }, drag] = useDrag({
    item: { title: 'test', content: 'make a list', type: ItemTypes.CARD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: 'card' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  enum OverlayType {
    IllegalMoveHover = 'Illegal',
    LegalMoveHover = 'Legal',
    PossibleMove = 'Possible',
  }
  interface OverlayProps {
    type: OverlayType
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={6} sm={3}>
          <ReportCard author={example1.author} report={example1.report} editType={example1.type} type={ItemTypes.CARD} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ReportCard author={example2.author} report={example2.report} editType={example2.type} type={ItemTypes.CARD} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ReportCard author={example3.author} report={example3.report} editType={example3.type} type={ItemTypes.CARD} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ReportCard author={example1.author} report={example1.report} editType={example1.type} type={ItemTypes.CARD} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ReportCard author={example2.author} report={example2.report} editType={example2.type} type={ItemTypes.CARD} />
        </Grid>
      </Grid>
    </div>
  );
}