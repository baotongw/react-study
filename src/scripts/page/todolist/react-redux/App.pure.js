import React, { Component } from 'react'
import Header from './component/header'
import List from './component.pure/list'
import Filter from './component.pure/filter'
import Status from './component.pure/status'
import store from './reducer/index'

function App(props) {
  return (
    <div>
      <header className="p-hd">TODO List - react + redux-react</header>
      <section className="content">
        <div className="box">
          <Header />
          <List />
          <Filter />
        </div>
      </section>
      <footer className="p-ft">Copyright Baotong.Wang 2018.</footer>
    </div>
  )
}

// class App extends Component {

//   componentDidMount() {
//     console.log('App did Mount.')
//   }

//   componentWillUnmount() {
//     console.log('App did update.')
//   }

//   render() {
//     return (
//       <div>
//         <header className="p-hd">TODO List - react + redux-react</header>
//         <section className="content">
//           <div className="box">
//             <Header />
//             <List />
//             <Filter />
//           </div>
//         </section>
//         <footer className="p-ft">Copyright Baotong.Wang 2018.</footer>
//       </div>
//     )
//   }
// }

export default App
