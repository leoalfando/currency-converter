import axios, { AxiosRequestConfig } from 'axios';
import { ErrorHelper } from '../../helpers/error';
import Country from '../../models/country';

export default class CountryRepository {
    public async getList(name: string): Promise<Country[]> {
        const url: string = 'https://restcountries.eu/rest/v2';
        const options: AxiosRequestConfig = {
            method: 'GET',
            baseURL: `${url}/name/${name}`,
            timeout: 5000
        };
        const response = await axios.request(options);
        if (response.status === 200) {
            const result = response?.data.map((country: any) => {
                return this.adaptData(country);
            });
            return result;
        }
        throw new ErrorHelper('COUNTRY_SERVER_ERROR', 500);
    }

  public adaptData = (data): Country => {
      const result = new Country();
      result.name = data.name;
      result.population = data.population;
      result.currencies = data.currencies;
      return result;
  }
}
