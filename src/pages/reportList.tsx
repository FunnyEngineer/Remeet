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
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: 'relative',
    top: 200,
    height: 140,
    width: 200,
    padding: '6px 16px',
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
}));

export default function ReportItemList() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const ItemTypes = {
    KNIGHT: 'knight'
  }

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: () => ({ name: 'knight' }),
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
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Remeet
        </Typography>
          <Button component={Link} to="/" color="inherit" >TimeLine</Button>
        </Toolbar>
      </AppBar>

      <Paper
        ref={drop}
        className={
          classes.root
        }
        elevation={5}
      >
        {canDrop && isOver ? 'Release to drop' : 'Drag a garbage here'}
      </Paper>
      <Grid container spacing={4}>

        <Paper
          ref={drag}
          className={classes.paper}
          style={{
            opacity: isDragging ? 0.5 : 1,
          }}
          elevation={5}
        >
          123
      </Paper>
      </Grid>
    </div>
  );
}