import React, { Component } from 'react'
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import { Provider, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'
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

						<Match 
						  exactly
						  pattern="/"
						  render={(props) => <LazyRoute {...props} component={System.import('./Home')} />}
						/>
						<Match 
						  exactly
						  pattern="/posts"
						  render={(props) => <LazyRoute {...props} component={System.import('./Subpage')} />}
						/>
						<Match 
						  exactly
						  pattern="/posts/:id"
						  render={(props) => <LazyRoute {...props} component={System.import('./Subitem')} />}
						/>
						<Match 
						  exactly
						  pattern="/login"
						  render={(props) => <LazyRoute {...props} component={System.import('./Login')} />}
						/>
						<Miss 
						  render={(props) => <LazyRoute {...props} component={System.import('./NotFound')} />}
						/>
						{!!(timeToRefresh && timeToRefresh <= 4) && this.store.refreshToken()}
					<footer>
						Cobbled together by <a href="https://twitter.com/mhaagens" target="_blank">@mhaagens</a> | github: <a href="https://github.com/mhaagens" target="_blank">mhaagens</a>
					</footer>
					</div>
				</Provider>
			</BrowserRouter>
		)
	}
}