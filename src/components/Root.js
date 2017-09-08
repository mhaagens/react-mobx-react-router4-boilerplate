import React, {Component} from "react";
import {inject} from 'mobx-react';
import App from "./App";

@inject('routing')
export default class Root extends Component {
    render() {
        return <App location={this.props.routing.location}/>
    }
}