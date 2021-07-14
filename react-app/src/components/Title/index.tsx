import React from 'react';
import './styles.scss';
interface CountryState {
  [key: string]: any;
}

class Title extends React.PureComponent<any, CountryState> {
  render() {
    const { state } = this;
    return (
      <div className="title-text-container">
        <h1 color="#fff">Currency Converter(SEK)</h1>
      </div>
    );
  }
}

export default Title;
