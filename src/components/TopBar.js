import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Link, withRouter} from "react-router-dom";

import TopNav from "./TopNav";
import Button from "./ui/Button";

@withRouter
@inject("store")
@observer
export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
    this.authenticate = this.authenticate.bind(this);
  }
  
  authenticate(e) {
    if (e) e.preventDefault();
    this.store.authenticate();
  }
  
  render() {
    const {authenticated} = this.store;
    return (
      <div className="topbar">
        <TopNav location={this.props.location}/>
        <Button
          onClick={this.authenticate}
          title={authenticated ? "Log out" : "Sign in"}
        />
      </div>
    );
  }
}
