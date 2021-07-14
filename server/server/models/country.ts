export default class Country {
  public name: string;
  public population: number;
  public currencies: Array<{
    code;
    name;
    symbol;
    exchangeRate: number;
  }>;
}
