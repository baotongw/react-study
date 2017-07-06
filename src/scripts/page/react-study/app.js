import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Show from './show'

function logTitle(text) {
    console.log(`%c ${text}`, 'font-size:13px; color: red');
}

class App extends Component {
    constructor() {
        super()

        this.state = {
            name: 'baotong.wang',
            isShow: true
        }
        logTitle('Component Constructor')
        console.log(this.props)
        console.log(this.state)
        this.toggle = this.toggle.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    // getDefaultProps() {
    //     console.log('getDefaultProps')
    // }
 
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

    toggle() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    updateName(e) {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        let element = null;
        
        if(this.state.isShow) {
            element = <div><input type="text" value={this.state.name} onChange={this.updateName} />
                <Show name={this.state.name} />
                <br />
            </div>
        }

        return <div>
            {element}
            <a href="javascript:;" onClick={this.toggle}>切换显示</a>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('container'))