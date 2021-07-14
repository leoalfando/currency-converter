import { ErrorHelper } from '../../helpers/error';
// import Currency from '../../models/currency';
import CountryRepository from '../repositories/CountryRepository';
import CurrencyRepository from '../repositories/CurrencyRepository';
import * as _ from 'lodash';
// import config from '../../../config';
/**
 * User Queries
 */
//  const currencyModel = new Currency();
 const countryRepository = new CountryRepository();
 const currencyRepository = new CurrencyRepository();

const CountryQueries = {
  countryList: async (parent, { name }, context) => {
    try {
      if (!context.isAuth) {
        throw new ErrorHelper('AUTHENTICATION_MISSING', 403);
      }
      if (name?.length < 3) {
        throw new ErrorHelper('COUNTRY_NAME_MIN_LIMIT', 400);
      }
      const result = await countryRepository.getList(name);
      const currencyCodes = result?.reduce((previousVal,currentVal)=>{
        previousVal = _.union(previousVal,(_.map(currentVal.currencies, 'code')));
        return previousVal;
      },[]);
      const exchangeRates = currencyCodes? await currencyRepository.get(currencyCodes) : null;

      const promises = result?.map(async (data) => {
        const currencyCodes = data?.currencies.map((cur) => cur.code);
        if(currencyCodes.length > 0){
          data.currencies.map((currency) => {
            currency.exchangeRate = exchangeRates?.rates[currency.code];
          });
        }
      });
      if(promises){
        await Promise.all(promises);
      }
      return result;
    } catch (err) {
      return err;
    }
  }
};

export { CountryQueries };


