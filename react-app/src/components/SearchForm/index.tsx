import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import './styles.scss';

interface SearchFormState {
  [key: string]: any;
}

class SearchForm extends React.PureComponent<any, SearchFormState> {
  render() {
    const { state } = this;
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <form
              onSubmit={e => this.props.handleSubmit(e, client)}
              className="search-form">
              <input
                type="text"
                placeholder="Enter country name"
                name="countryName"
                value={this.props.state.countryName}
                onChange={this.props.handleChange}
                className="search-input-box"
                required
              />
              <input
                type="number"
                placeholder="input amount..."
                name="baseAmount"
                value={this.props.state.baseAmount}
                onChange={this.props.handleChange}
                className="search-input-box"
              />
              <button hidden type="submit">
                1111
              </button>
            </form>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default SearchForm;
