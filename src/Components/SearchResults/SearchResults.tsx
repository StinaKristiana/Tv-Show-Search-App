import React, { ReactElement, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { useStyles } from "../ShowCards/style";
import _ from "lodash";
import notfound from "../../assets/img/notfound.png";
import { Show } from "../../types/Show";
interface Props {
  search: boolean;
  searchingFor: string;
}

export default function SearchResults(): ReactElement {
  const { name } = useParams();
  const [shows, setShows] = useState<Show[]>();
  const classes = useStyles();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
      .then((res) => res.json())
      .then((data) =>
        setShows(data.map((res: { score: number; show: Show }) => res.show))
      )
      .catch((err) => console.log(err));
  }, []);
  console.log(shows);

  return shows !== undefined ? (
    <div>
      <h2 style={{ margin: "5vh" }}>
        Searching for:{" "}
        <span style={{ color: "#ec407a", margin: "5vh auto" }}>{name}</span>
      </h2>

      <Container maxWidth="md">
        <Grid container spacing={4}>
          {shows.map((res) => (
            <Grid item key={_.uniqueId("id_")} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={res.image !== null ? res.image.original : notfound}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {res.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/show/${res.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small" color="primary">
                      Read More
                    </Button>
                  </Link>
                  <Link
                    to={`/show/${res.id}/episodes`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small" color="primary">
                      Episodes
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  ) : (
    <div className={classes.cardsroot}>
      <CircularProgress color="secondary" />
    </div>
  );
}
