import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router'

export default function DataWrapper(Component) {
	@inject(['store']) @observer
	class DataFetcher extends Component {
		constructor(props) {
			super(props)
			this.store = this.props.store
		}

		componentDidMount() {
			let pathname = this.props.location.pathname
			let id = this.props.params.id ? this.props.params.id : null
			this.store.fetchData(pathname, id)
		}

		componentWillUnmount() {
			this.store.clearItems()
		}

		render() {
			return <Component {...this.props} />
		}

	}
	return DataFetcher
}