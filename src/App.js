import React, { Component } from 'react';
import './App.css'
import Header from './Component/Header';
import Analyze from './Component/Analyze';
import Compare from './Component/Compare';
import Footer from './Component/Footer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnalyze: false,
      showCompare: false,
    };
  }

  handleAnalyzeClick = () => {
    this.setState({ showAnalyze: true, showCompare: false });
  };

  handleCompareClick = () => {
    this.setState({ showAnalyze: false, showCompare: true });
  };

  render() {
    return (
      <>
        <div className="App">
          <div>
            <div>
              <Header />
            </div>
            <div>
              <button className='btn' onClick={this.handleAnalyzeClick}>Analyze your Profile</button>
              <button className='btn' onClick={this.handleCompareClick}>Compare your Profile</button>
              {this.state.showAnalyze && <Analyze />}
              {this.state.showCompare && <Compare />}
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default App;
