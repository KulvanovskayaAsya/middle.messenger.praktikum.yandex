import HTTPTransport from '@utils/HTTP-transport';

class BaseAPI {
  http: HTTPTransport;

  constructor(APIBasePath: string) {
    this.http = new HTTPTransport(`https://ya-praktikum.tech/api/v2${APIBasePath}`);
  }
}

export default BaseAPI;
