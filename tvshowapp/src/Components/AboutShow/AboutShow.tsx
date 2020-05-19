import React, { ReactElement, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { useStyles } from "./style";
import { Show } from "../component";
import { CircularProgress, Tooltip } from "@material-ui/core";
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
    <Card className={classes.root} style={{ margin: "5vh auto" }}>
      <CardHeader
        title={show.name}
        subheader={
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
        }
      />
      <CardMedia
        className={classes.media}
        image={show.image.original}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <ReactMarkdown source={show.summary} escapeHtml={false} />
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <CircularProgress color="secondary" />
  );
}
