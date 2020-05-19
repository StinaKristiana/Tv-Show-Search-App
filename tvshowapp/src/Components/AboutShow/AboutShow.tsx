import React, { ReactElement, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useParams, Link } from "react-router-dom";
import { useStyles } from "./style";
import { Show } from "../component";
import {
  CircularProgress,
  Tooltip,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import Rating from "@material-ui/lab/Rating";

export default function AboutShow(): ReactElement {
  const classes = useStyles();

  const [show, setShow] = useState<Show>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setShow(data))
      .catch((err) => console.log(err));
  }, [id]);
  return show !== undefined ? (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={{ backgroundImage: show.image ? `url(${show.image.original})` : `url(${show.image})` }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h3" color="textSecondary">
            {show.name}
          </Typography>
          <Tooltip
            placement="right"
            title={`IMDB rating: ${show.rating.average}`}
            aria-label="rating"
          >
            <div style={{ width: "fit-content" }}>
              <Rating
                name="read-only"
                value={show.rating.average / 2}
                readOnly
              />
            </div>
          </Tooltip>
          <Typography variant="body2" color="textSecondary" component="p">
            <ReactMarkdown source={show.summary} escapeHtml={false} />
          </Typography>
          <Link
            to={`/show/${show.id}/episodes`}
            style={{ textDecoration: "none", marginRight: "auto" }}
          >
            <Button variant="outlined">Episodes</Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  ) : (
    <CircularProgress color="secondary" />
  );
}
