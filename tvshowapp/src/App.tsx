import React, { ReactElement, useState } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import { Grid, CssBaseline } from "@material-ui/core";
import ShowCards from "./Components/ShowCards/ShowCards";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResults from "./Components/SearchResults/SearchResults";
import Episodes from "./Components/Episodes/Episodes";
import AboutShow from "./Components/AboutShow/AboutShow";


function App(): ReactElement {
  const [searchBar, setSearchBar] = useState<string>("");
  const [, setIsSearching] = useState(false);
  const [allowsearch, setAllowSearch] = useState(false);
  
  const validateForm = () => {
    if (searchBar === "") {
      setAllowSearch(false);
    } else setAllowSearch(true);
  };

  const searchRequest = () => {
    if (allowsearch) {
      setIsSearching(true);
    }
  };

  function handleSearch() {
    window.location.href = `/search/${searchBar}`;
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
    <Router>
    
      <div>
        <Grid>
          <SearchBar
            handleKeyDown={(e) => handleKeyDown(e)}
            setAllowSearch={allowsearch}
            onChange={(e) => {
              setSearchBar(e);
              validateForm();
            }}
            onClick={() => searchRequest()}
            search={searchBar}
          />
        </Grid>

        <Grid>
          <Switch>
            <Route path="/show/:id/episodes" component={Episodes} />
            <Route path="/show/:id" component={AboutShow} />
            <Route path="/search/:name" component={SearchResults} />
            <Route path="/">
              <ShowCards />
            </Route>
          </Switch>
        </Grid>
      </div>
    
    </Router>
    </React.Fragment>
  );
}
export default App;
