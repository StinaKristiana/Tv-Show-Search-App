import React, { ReactElement, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import _ from "lodash";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Grid,
} from "@material-ui/core";
import { useStyles } from "./style";
import Hero from "./Hero/Hero";
import Footer from "./Footer/Footer";
import { Show } from "../component";
import { Link } from "react-router-dom";

export default function ShowCards(): ReactElement {
  const classes = useStyles();
  const [shows, setShows] = useState<Show[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => setShows(data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>

      <main>
        <Hero />
        <div className={classes.heroContent}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {shows.slice(0, 21).map((it) => (
              <Grid item key={_.uniqueId("id_")} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={it.image.original}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {it.name}
                    </Typography>
                    <Typography>
                      <ReactMarkdown
                        source={it.summary.slice(0, 150) + "..."}
                        escapeHtml={false}
                      />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/show/${it.id}`} style={{textDecoration: 'none'}} >
                      <Button size="small" color="primary"  >
                        Read More
                      </Button>
                    </Link>
                    <Link to={`/show/${it.id}/episodes`} style={{textDecoration: 'none'}} >
                      <Button size="small" color="secondary">
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
      </main>
      <Footer />
    </React.Fragment>
  );
}
