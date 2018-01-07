import React, {Component} from 'react'
import Utils from './utils'

class Show extends Component {
    constructor() {
        super()

        this.state = {
            count: 0,
            placeHolder: 'nothing'
        }

        Utils.logTitle('Show-Component Constructor')
        Utils.log(this.props)
        Utils.log(this.state)

        this.addCount = this.addCount.bind(this)
    }

    addCount() {
        let count = this.state.count + 1

        this.setState({
            count: this.state.count
        })
    }
 
    getInitialState() {
        Utils.logTitle('Show-getInitialState')
    }

    componentWillMount() {
        Utils.logTitle('Show-componentWillMount')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
    }

    componentDidMount() {
        Utils.logTitle('Show-componentDidMount')
        Utils.log(arguments)      
        Utils.log(this.props)
        Utils.log(this.state)  
    }

    shouldComponentUpdate(nextProps, nextState) { 
        Utils.logTitle('Show-shouldComponentUpdate')

        Utils.log(this.props, 0)
        Utils.log(this.state, 0)
        Utils.log(this.props === nextProps, 0)
        Utils.log(this.state === nextState, 0)

        return true
    }

    componentWillReceiveProps(nextProps) {
        Utils.logTitle('Show-componentWillReceiveProps')
        Utils.log(arguments, 1)
        Utils.log(this.props, 1)
        Utils.log(this.state, 1)
        Utils.log(this.props === nextProps, 0)
    }

    componentWillUpdate(nextProps, nextState) {
        Utils.logTitle('Show-componentWillUpdate')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
    }

    componentDidUpdate(prevProps, prevState) {
        Utils.logTitle('Show-componentDidUpdate')
        Utils.log(arguments, 0)
        Utils.log(this.props, 0)
        Utils.log(this.state, 0)
    }

    componentWillUnmount() {
        Utils.logTitle('Show-componentWillUnmount')
        // no arguments here
        // Utils.log(arguments, true)
        Utils.log(this.props, 0)
        Utils.log(this.state, 0)
    }

    render() {
        return <div>
            <h1>{this.props.name}</h1>

            <p>Button Click Count: {this.state.count}</p>
            <button onClick={this.addCount}>Click Me!</button>
        </div>
    }
}

export default Show;