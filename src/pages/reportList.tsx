import React, { useState } from 'react';
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

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    position: 'relative',
    height: 400,
    width: 400,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    position: 'relative',
    top: 50,
    height: 140,
    width: 100,
    padding: '6px 16px',
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
    height: 100,
    width: 100,
  },
  media: {
    width: 400,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    padding: 24,
  },
  grid: {
    padding: '50px 50px',
  },
  timeLine:{
    width: window.innerWidth / 2,
  }
}));

export default function ReportItemList() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const ItemTypes = {
    CARD: 'card'
  }

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD },
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
  const { innerWidth: width, innerHeight: height } = window;
  console.log(width);
  return (
    <div>
        <Grid container spacing={4} className={classes.grid}>
          <Grid item>
            <Card ref={drop} elevation={5} className={classes.card}>
              {canDrop && isOver ? 'Release to drop' : 'Drag a garbage here'}
            </Card>
          </Grid>
          <Grid item>
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
                <Typography gutterBottom variant="h5" component="h2">
                  Edit 1
              </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Modified 1: Element 35126... locaiton:....
              </Typography>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
    </div>
  );
}