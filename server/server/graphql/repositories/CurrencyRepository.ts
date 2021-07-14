import axios, { AxiosRequestConfig } from 'axios';
import { ErrorHelper } from '../../helpers/error';
import Currency from '../../models/currency';

export default class CurrencyRepository {
    public async get(symbols: string[]): Promise<Currency> {
        const url: string = 'http://data.fixer.io/api/latest?';
        const params = {
            access_key: process.env.CURRENCY_ACCESS_KEY,
            symbols: symbols.join(',')
        };
        const options: AxiosRequestConfig = {
            method: 'GET',
            baseURL: url,
            params,
            timeout: 5000
        };

        const response = await axios.request(options);
        if (response?.data?.success === true) {
            const result = this.adaptData(response.data);
            return result;
        }
        throw new ErrorHelper('CURRENCY_SERVER_ERROR', 500);
    }
public adaptData = (data): Currency => {
    const result = new Currency();
    result.rates = data.rates;
    return result;
}
}
