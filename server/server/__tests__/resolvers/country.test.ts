import * as sinon from 'sinon';
import { assert } from 'chai'
import CountryRepository from '../../graphql/repositories/CountryRepository';
import CurrencyRepository from '../../graphql/repositories/CurrencyRepository';
import {CountryQueries} from '../../graphql/resolvers/country';
import Country from '../../models/country';
import Currency from '../../models/currency';

describe('Test resolvers', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => {
    sandbox.restore();
  });
  const sampleCountryData:Country = {
    name: 'samoa',
    population : 100000,
    currencies: [
      {
        code: "WST",
        name: "Samoan tālā",
        symbol: "T",
        exchangeRate: null
      }
    ]
  }
  const sampleRate:Currency = {
    rates:{ WST:0.856309 }
  }

  it('should return expected values', async () => {
    const req = { isAuth: true };
    const countryRepoStub = sandbox.stub(CountryRepository.prototype, 'getList').resolves([sampleCountryData]);
    const currencyRepoStub = sandbox.stub(CurrencyRepository.prototype, 'get').resolves(sampleRate);
    const result = await CountryQueries.countryList(null, {name: 'ind'}, req);
    assert.isNotNull(result);
    assert.isNotEmpty(result);
    sinon.assert.calledOnce(countryRepoStub);
    sinon.assert.calledOnce(currencyRepoStub);
  });

  it('should return empty when country not found', async () => {
    const req = { isAuth: true };
    const countryRepoStub = sandbox.stub(CountryRepository.prototype, 'getList').resolves();
    const currencyRepoStub = sandbox.stub(CurrencyRepository.prototype, 'get');
    const result = await CountryQueries.countryList(null, {name: 'ind'}, req);
    assert.isNotNull(result);
    sinon.assert.calledOnce(countryRepoStub);
    sinon.assert.notCalled(currencyRepoStub);
  });

  it('should throw error when input less than 3 characters', async () => {
    const req = { isAuth: true };
    const countryRepoStub = sandbox.stub(CountryRepository.prototype, 'getList');
    const currencyRepoStub = sandbox.stub(CurrencyRepository.prototype, 'get');
    const result = await CountryQueries.countryList(null, {name: '11'}, req);
    assert.isNotNull(result);
    assert.deepEqual(result.message, 'COUNTRY_NAME_MIN_LIMIT');
    sinon.assert.notCalled(countryRepoStub);
    sinon.assert.notCalled(currencyRepoStub);
    expect(CountryQueries.countryList).toThrowError();
  });

  it('should throw error when input less than 3 characters', async () => {
    const req = { isAuth: false };
    const countryRepoStub = sandbox.stub(CountryRepository.prototype, 'getList');
    const currencyRepoStub = sandbox.stub(CurrencyRepository.prototype, 'get');
    const result = await CountryQueries.countryList(null, {name: '11'}, req);
    assert.isNotNull(result);
    assert.deepEqual(result.message, 'AUTHENTICATION_MISSING')
    sinon.assert.notCalled(countryRepoStub);
    sinon.assert.notCalled(currencyRepoStub);
    expect(CountryQueries.countryList).toThrowError();
  });
});
