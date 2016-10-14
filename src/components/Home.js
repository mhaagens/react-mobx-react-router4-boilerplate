import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject("store") @observer
export default class Home extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store
	}

	render() {
		const store = this.store
		return (
			<div className="page home">
				<header>
					<div className="hero-unit">
						<div className="react-logo"></div>
						<h1>React MobX React-Router 4 Boilerplate</h1>
					</div>
					<div className="hero-subunit">
						<h4>A simple starting point for React with routing, data-fetching and state management.</h4>
					</div>
					<div className="github-buttons">
						<a href="https://github.com/mhaagens/react-mobx-react-router4-boilerplate" target="_blank">Download from GitHub</a>
					</div>
				</header>
				<main>
					<div className="section-header">
						<h3>Included libraries</h3>
						<hr/>
					</div>
					<div className="boilerplate-item">
						<div className="boilerplate-logo react"></div>
						<div className="boilerplate-item-content">
							<a href="https://facebook.github.io/react/" target="_blank"><h4>React</h4></a>
							<small>UI Library</small>
							<p>React makes it painless to create <br/>interactive UIs.</p>
						</div>
					</div>
					<div className="boilerplate-item">
						<div className="boilerplate-logo mobx"></div>
						<div className="boilerplate-item-content">
							<a href="http://mobxjs.github.io/mobx/" target="_blank"><h4>MobX</h4></a>
							<small>Reactive State Management</small>
							<p>MobX is a battle tested library that makes state management simple and scalable.</p>
						</div>
					</div>
					<div className="boilerplate-item">
						<div className="boilerplate-logo reactrouter"></div>
						<div className="boilerplate-item-content">
							<a href="https://react-router.now.sh/" target="_blank"><h4>React Router 4</h4></a>
							<small>Routing Library</small>
							<p>React Router is a declarative way to render, at any location, any UI that you and your team can think up.</p>
						</div>
					</div>
					<div className="boilerplate-item">
						<div className="boilerplate-logo webpack"></div>
						<div className="boilerplate-item-content">
							<a href="http://webpack.github.io/" target="_blank"><h4>Webpack 2</h4></a>
							<small>Module Bundler</small>
							<p>Webpack takes modules with dependencies and generates static assets representing those modules.</p>
						</div>
					</div>
				</main>
			</div>
		)
	}

}