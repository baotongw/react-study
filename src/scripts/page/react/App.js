import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './component/header'
import List from './component/list'
import Filter from './component/filter'
import Status from './component/status'

class App extends Component {

    constructor() {
        super()

        this.state = {
            updateId: -1,
            updateVal: '',
            count: 0,
            filter: Status.All,
            list: []
        }

        this.updateState = this.updateState.bind(this);
    }

    updateState(newState) {
        let state = Object.assign({}, this.state, newState)
        console.log(state)
        this.setState(state)
    }

    render() {
        return <div>
            <header className="p-hd">
                TODO MVC - React
            </header>
            <section className="content">
                <div className="box">
                    <Header states={this.state} updateState={this.updateState} />
                    <List list={this.state.list} filter={this.state.filter} updateState={this.updateState} />
                    <Filter filter={this.state.key} updateState={this.updateState} />
                </div>
            </section>
            <footer className="p-ft">Copyright Baotong.wang 2017.</footer>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('container'))