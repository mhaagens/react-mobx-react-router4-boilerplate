import React, { Component } from 'react'
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import { Provider, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import TopBar from './TopBar'

@observer
export default class App extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store
	}
	componentDidMount() {
		this.authenticate()
		
	}
	authenticate(e) {
		if (e) e.preventDefault();
		this.props.store.authenticate()
	}
	render() {
		const { authenticated, authenticating, timeToRefresh, refreshToken } = this.store
		return (
			<BrowserRouter>
				<Provider store={this.store}>
					<div className="wrapper">
						{/*<DevTools />*/}
						<TopBar />

						<Match exactly pattern="/" component={require('react-router?name=home!./Home')} />
						<Match exactly pattern="/posts" component={require('react-router?name=subpage!./Subpage')} />
						<Match pattern="/posts/:id" component={require('react-router?name=subitem!./Subitem')} />
						<Match exactly pattern="/login" component={require('react-router?name=login!./Login')} />
						<Miss component={require('react-router?name=notfound!./NotFound')} />
						{timeToRefresh && timeToRefresh <= 4 ? this.store.refreshToken() : null}
					<footer>
						Cobbled together by <a href="https://twitter.com/mhaagens" target="_blank">@mhaagens</a> | github: <a href="https://github.com/mhaagens" target="_blank">mhaagens</a>
					</footer>
					</div>
				</Provider>
			</BrowserRouter>
		)
	}
}