const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: HttpMethods;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  withCreditals?: boolean;
  timeout?: number;
  retries?: number;
};

type HTTPMethod = (url: string, options: Options) => Promise<unknown>;

interface IHTTP {
  get: HTTPMethod;
  post: HTTPMethod;
  put: HTTPMethod;
  delete: HTTPMethod;
  request: HTTPMethod;
}

function queryStringify(data: Record<string, unknown>): string {
  let result = '?';

  for (const [key, value] of Object.entries(data)) {
    result += `${key}=${String(value)}&`;
  }

  return result.slice(0, result.length - 1);
}

class HTTPTransport implements IHTTP {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: HttpMethods.GET });

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: HttpMethods.POST });

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: HttpMethods.PUT });

  delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: HttpMethods.DELETE });

  request: HTTPMethod = (url, options) => {
    const { method = HttpMethods.GET, headers = {}, data, withCreditals = true, timeout = 1000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const xhrUrl = this.baseUrl + url + (method === HttpMethods.GET && data && !(data instanceof FormData) ? `?${queryStringify(data)}` : '');
      
      xhr.open(method, xhrUrl);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.withCredentials = withCreditals;

      xhr.onload = () => {
        const responseData = xhr.response;

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      };
      
      xhr.onabort = () => reject(new Error('Запрос был прерван'));
      xhr.onerror = () => reject(new Error('Сетевая ошибка'));
      xhr.ontimeout = () => reject(new Error('Время запроса истекло'));

      if (method === HttpMethods.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
export default HTTPTransport;
