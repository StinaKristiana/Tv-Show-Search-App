import React, { ReactElement } from "react";
import { useStyles } from "../style";
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer(): ReactElement {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Stina Kristiana Kalnina
      </Typography>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
        
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
              className={classes.root}
            >
              <Link to="">
              <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} />
              <BottomNavigationAction
                label="LinkedIn"
                icon={<LinkedInIcon />}
              />
            </Link>
            </BottomNavigation>
        </Grid>
      </div>
    </footer>
  );
}
