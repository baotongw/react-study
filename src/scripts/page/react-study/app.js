import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Show from './show'
import SK from './sk'
import Utils from './utils'

class App extends Component {
    constructor() {
        super()

        this.state = {
            name: 'baotong.wang',
            isShow: true
        }
        Utils.logTitle('Component Constructor')
        Utils.log(this.props)
        Utils.log(this.state)
        this.toggle = this.toggle.bind(this)
        this.updateName = this.updateName.bind(this)
        this.doUpdate = this.doUpdate.bind(this)
    }

    doUpdate() {
        this.setState()
    }

    // getDefaultProps() {
    //     Utils.log('getDefaultProps')
    // }
 
    getInitialState() {
        Utils.logTitle('getInitialState')
    }

    componentWillMount() {
        Utils.logTitle('componentWillMount')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
    }

    componentDidMount() {
        Utils.logTitle('componentDidMount')
        Utils.log(arguments)      
        Utils.log(this.props)
        Utils.log(this.state)  
    }

    shouldComponentUpdate() { 
        Utils.logTitle('shouldComponentUpdate')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
        return true
    }

    componentWillReceiveProps() {
        Utils.logTitle('componentWillReceiveProps')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
    }

    componentWillUpdate() {
        Utils.logTitle('componentWillUpdate')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
    }

    componentDidUpdate() {
        Utils.logTitle('componentDidUpdate')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
    }

    componentWillUnmount() {
        Utils.logTitle('componentWillUnmount')
        Utils.log(arguments)
        Utils.log(this.props)
        Utils.log(this.state)
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
            <a href="javascript:;" onClick={this.doUpdate}>执行setState</a>
            <SK />
            {element}
            <a href="javascript:;" onClick={this.toggle}>切换显示</a>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('container'))