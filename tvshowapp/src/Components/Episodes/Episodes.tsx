import React, { ReactElement, useState, useEffect } from "react";
import { Episode } from "../ShowInterface";
import { useStyles } from "./style";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import _ from "lodash";
import notfound from "../../assets/img/notfound.png";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";

export default function Episodes(): ReactElement {
  const classes = useStyles();
  const { id } = useParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((err) => console.log(err));
  }, [id]);

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  const seasons = episodes.map((episode) => episode.season).filter(onlyUnique);

  const getSeasons = () => {
    let tempSeasons: any = [];

    for (let i = 1; i < seasons.length; i++) {
      const season = episodes.filter((res: Episode) => res.season === i);
      tempSeasons.push(season);
    }
    return tempSeasons;
  };

  return (
    <Grid>
      {getSeasons().map((res: any, index: number) => (
        <div key={`${index}`}>
          <h2>Season: {index + 1}</h2>

          <Card className={classes.broot}>
            <Grid container spacing={4}>
              {res.map((it: Episode) => (
                <Grid item key={_.uniqueId("id_")} xs={12} sm={6} md={4}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={it.image ? it.image.original : notfound}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {it.name}
                      </Typography>
                      <Typography> Air Date: {it.airdate}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <ReactMarkdown source={it.summary} escapeHtml={false} />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Card>
        </div>
      ))}
    </Grid>
  );
}
