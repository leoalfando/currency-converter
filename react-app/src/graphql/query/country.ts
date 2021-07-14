import gql from 'graphql-tag';

const GET_COUNTRY = gql`
  query countryList($countryName: String!) {
    countryList(name: $countryName) {
      name
      population
      currencies {
        symbol
        code
        name
        exchangeRate
      }
    }
  }
`;

export default GET_COUNTRY;
