import React, { ReactElement } from "react";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "../style";
export default function Hero(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          All Your Favorite Shows
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Don't spend another night endlessly browsing for something to watch...
          it's time to dive into your new favorite show. We have recommendations
          for the best new and returning shows, all in one handy spot. Stop
          browsing, start watching
        </Typography>
      </Container>
    </div>
  );
}
