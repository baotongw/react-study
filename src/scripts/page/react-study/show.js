import React, {Component} from 'react'

function logTitle(text) {
    console.log(`%c SubComponent ${text}`, 'font-size:13px; color: red');
}

class Show extends Component {
    constructor() {
        super()

        this.state = {
            placeHolder: 'nothing'
        }

        logTitle('Component Constructor')
        console.log(this.props)
        console.log(this.state)
    }
 
    getInitialState() {
        logTitle('getInitialState')
    }

    componentWillMount() {
        logTitle('componentWillMount')
        console.log(arguments)
        console.log(this.props)
        console.log(this.state)
    }

    componentDidMount() {
        logTitle('componentDidMount')
        console.log(arguments)      
        console.log(this.props)
        console.log(this.state)  
    }

    shouldComponentUpdate() { 
        logTitle('shouldComponentUpdate')
        console.log(arguments)
        console.log(this.props)
        console.log(this.state)
        return true
    }

    componentWillReceiveProps() {
        logTitle('componentWillReceiveProps')
        console.log(arguments)
        console.log(this.props)
        console.log(this.state)
    }

    componentWillUpdate() {
        logTitle('componentWillUpdate')
        console.log(arguments)
        console.log(this.props)
        console.log(this.state)
    }

    componentDidUpdate() {
        logTitle('componentDidUpdate')
        console.log(arguments)
        console.log(this.props)
        console.log(this.state)
    }

    componentWillUnmount() {
        logTitle('componentWillUnmount')
        console.log(arguments)
        console.log(this.props)
        console.log(this.state)
    }

    render() {
        return <h1>{this.props.name}</h1>
    }
}

export default Show;