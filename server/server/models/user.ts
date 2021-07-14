export default class User {
  public url: string = 'https://restcountries.eu/rest/v2';
  public async get(username, password) {
    try {
      return {username};
    } catch (exception) {
        throw exception;
    }
  }
}
