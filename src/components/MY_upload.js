import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Buttons from "../views/Buttons";
import {Button, CardActions, colors} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  thumb: {
    width: 150,
    height: 150,
    padding: 4,
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
  cards: {
    position: 'relative',
    '&:hover': {
      opacity: 0.3,
      background: "#f00",
    },
  },
  overlays: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    // color: 'black',
    // backgroundColor: 'white'
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function MyDropzone(props) {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
      <Grid
        key={file.name}
        item
        md={2}
        xs={6}
      >
        <Card className={classes.cards}>

        <div className={classes.thumb} key={file.name}>
        <img
          src={file.preview}
          className={classes.img}
          alt="ddd"/>
        <div className={classes.overlays}>
          <Button
            color="primary"
            variant="contained"
            size="small"
          >
            결재요청
          </Button>
        </div>
        </div>
        {/*</div>*/}
        </Card>
      </Grid>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        {thumbs}
      </Grid>
    </section>
  );
}
