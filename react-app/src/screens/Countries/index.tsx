import NumberFormat from 'react-number-format';
import React from 'react';
import GET_COUNTRY from '../../graphql/query/country';
import './styles.scss';
import SearchForm from '../../components/SearchForm';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateSearchInput } from '../../utils/validation';
import { ApolloConsumer } from 'react-apollo';
interface CountryState {
  [key: string]: any;
  countryName: string;
  baseAmount: number;
  countryData: any;
}

class CountriesData extends React.PureComponent<any, CountryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryName: '',
      baseAmount: 0,
      countryData: [],
    };
  }
  handleChange = (event: any) => {
    if (event.target.type === 'number' && event.target.value.length > 14) {
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = async (event: any, client: any) => {
    try {
      event.preventDefault();
      const { state } = this;
      if (validateSearchInput(state.countryName)) {
        const { data } = await client.query({
          query: GET_COUNTRY,
          variables: { ...state },
        });
        this.setState({ countryData: data?.countryList });
      } else {
        toast.error('Input minimum 3 characters');
      }
    } catch (error) {
      toast.error(error.message);
      this.props.history.replace('/');
    }
  };

  render() {
    const { state } = this;
    return (
      <ApolloConsumer>
        {client => (
          <div className="countries-container">
            <div className="searchPage-mainContainer">
              <Title></Title>
              <div className="searchPage-container">
                <div className="signout-container">
                  <Link to="/" className="signout-link">
                    Sign Out
                  </Link>
                </div>
                <SearchForm
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  state={state}
                />
                { state.countryData?.length > 0
                ? <div>
                  <div className="tbl-header">
                    <table>
                      <thead>
                        <tr>
                          <th className="column-small">#</th>
                          <th>Country Name</th>
                          <th>Population</th>
                          <th>Currency</th>
                          <th>Rate</th>
                          <th>Result</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="tbl-content">
                  <table>
                    <tbody>
                      {state.countryData?.length > 0 &&
                        state.countryData.map((data, index) => (
                          <tr>
                            <td className="column-small">{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.population}</td>
                            <td>
                              {data.currencies[0]?.name}{' '}
                              {data.currencies[0]?.code}
                            </td>
                            <td>{data.currencies[0]?.exchangeRate}</td>
                            <td>
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={data.currencies[0]?.symbol + ' '}
                                value={
                                  this.state.baseAmount
                                    ? (
                                        this.state.baseAmount *
                                        data.currencies[0]?.exchangeRate
                                      ).toFixed(2)
                                    : 0
                                }
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                </div>
                : <h3 className="empty-text">Please enter country name</h3>
              }
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default CountriesData;
