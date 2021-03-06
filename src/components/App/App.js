import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import {connect} from 'react-redux'

class App extends Component {
  // Renders the entire app on the DOM
  componentDidMount = () => {
    this.getGiphys();
  }
  getGiphys = () => {
    this.props.dispatch({ type: 'SET_RANDOM', payload:'' })
    Axios.get('/random')
    .then (response => {
      console.log(response)
      this.props.dispatch({type: 'SET_RANDOM', payload: response.data.data})
    }).catch(error => {
      console.log('error on client', error)
    })
  }
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Random Giphy API</h1>
          <button onClick={this.getGiphys}>Refresh</button>
        </header>
        
        <img src={this.props.reduxState.random.image_original_url} />
      </div>
    );
  }
}

const putStateOnProps = (reduxState) => ({
  reduxState
})
export default connect(putStateOnProps)(App);
