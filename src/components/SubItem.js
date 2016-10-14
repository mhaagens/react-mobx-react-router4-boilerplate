import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router'

import DataWrapper from './DataWrapper'
import Protected from './Protected'

@DataWrapper @Protected @inject("store") @observer
export default class Subitem extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store
	}
	render() {
		return (
			<div className="page post">
				<Link to="/posts">&larr; Back to Posts</Link>
				{this.store.item ? <article>
					<h1>{this.store.item.title}</h1>
					<p>{this.store.item.body}</p>
				</article> : null}

			</div>
		)
	}
}