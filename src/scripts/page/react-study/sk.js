import React, {Component} from 'react'
import Utils from './utils'

class SK extends Component { 
    componentDidMount() {
        Utils.logTitle('SK-componentDidMount.')
        Utils.log('Send Page SK Done.', true)
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        Utils.logTitle('SK-componentWillReceiveProps')
    }

    componentWillUpdate() {
        Utils.logTitle('SK-componentWillUpdate')
    }

    componentWillUnmount() {
        Utils.logTitle('SK-componentWillUnmount')
        Utils.log(this.props)
        Utils.log(this.state)
    }

    render() {
        return null
    }
}

export default SK