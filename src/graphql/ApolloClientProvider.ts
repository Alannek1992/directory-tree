import ApolloClient from "apollo-boost";

class ApolloClientProvider {
  private _client: ApolloClient<any>;

  constructor() {
    this._client = new ApolloClient({
      uri: "https://react-test.atlasconsulting.cz/"
    });
  }

  get client() {
    return this._client;
  }
}

export default new ApolloClientProvider();
