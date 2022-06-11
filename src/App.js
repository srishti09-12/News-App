import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import Newscontainer from './components/Newscontainer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey= "8cd71b6bfb5b4afa981c0e40c2e7cc51";
  // apiKey='fc9d8d209f994c52aec560db2ae803f0'
  state={progress:10}

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div>
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
              />
            <Routes>
              <Route exact path="/" element={<Newscontainer apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={9} country="in" category="general" />} />
              <Route exact path="business" element={<Newscontainer apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={9} country="in" category="business" />} />
              <Route exact path="entertainment" element={<Newscontainer apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={9} country="in" category="entertainment" />} />
              <Route exact path="science" element={<Newscontainer apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={9} country="in" category="science" />} />
              <Route exact path="sports" element={<Newscontainer apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={9} country="in" category="sports" />} />
              <Route exact path="health" element={<Newscontainer apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={9} country="in" category="health" />} />
              <Route exact path="technology" element={<Newscontainer apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={9} country="in" category="technology" />} />
            </Routes>
          </div>
        </div>
      </Router>
    )
  }
}
