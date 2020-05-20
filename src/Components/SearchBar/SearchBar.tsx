import React, { ReactElement } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./style";
import { Link } from "react-router-dom";

interface Props {
  onChange: (value: string) => void;
  onClick: () => void;
  setAllowSearch: boolean;
  handleKeyDown: (e: any) => void;
  search: string;
}

export default function SearchBar({
  onChange,
  handleKeyDown,
}: Props): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              className={classes.title}
            >
              Tv Show App
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              type="text"
              onKeyPress={(e: React.KeyboardEvent) => handleKeyDown(e)}
              onChange={(e: any) => onChange(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
