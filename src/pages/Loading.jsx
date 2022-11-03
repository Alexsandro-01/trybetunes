import React, { Component } from 'react';
import '../styles/loadin.css';

class Loading extends Component {
  render() {
    return (
      <div className="dot" data-testid="loadin">
        <div />
        <div />
        <div />
      </div>
    );
  }
}

export default Loading;
