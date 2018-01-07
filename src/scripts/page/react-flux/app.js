import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './component/header'
import List from './component/list'
import Filter from './component/filter'
import Status from './component/status'
import assign from 'object-assign'
import Store from './store/store'

class App extends Component {

    constructor() {
        super()

        this.state = Store.getAll()
    }

    componentDidMount() {
        Store.addChangeHandler(this._onChange.bind(this))
    }

    componentWillUnmount() {
        Store.removeChangeHandler(this._onChange.bind(this))
    }

    _onChange() {
        this.setState(Store.getAll())
    }

    render() {
        return <div>
            <header className="p-hd">
                TODO MVC - React-Flux
            </header>
            <section className="content">
                <div className="box">
                    <Header states={this.state} />
                    <List list={this.state.list} filter={this.state.filter} />
                    <Filter filter={this.state.filter} />
                </div>
            </section>
            <footer className="p-ft">Copyright Baotong.wang 2017.</footer>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('container'))