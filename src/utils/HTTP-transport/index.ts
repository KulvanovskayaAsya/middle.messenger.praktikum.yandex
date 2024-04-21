const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: HttpMethods;
  headers?: Record<string, string>;
  data?: Record<string, string>;
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

function queryStringify(data: Record<string, string>): string {
  let result = '?';

  for (const [key, value] of Object.entries(data)) {
    result += `${key}=${value.toString()}&`;
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
    const {
      method, headers = {}, data, timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const xhrUrl = this.baseUrl + url + (method === HttpMethods.GET && data ? `?${queryStringify(data)}` : '');
      
      xhr.open(method, xhrUrl);

      Object.keys(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(xhr.response?.reason));
        }
      };
      
      xhr.onabort = () => reject(new Error("Запрос был прерван"));
      xhr.onerror = () => reject(new Error("Сетевая ошибка"));
      xhr.ontimeout = () => reject(new Error("Время запроса истекло"));

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

// function fetchWithRetry(url: string, options: Options): unknown {
//   const { retries = 2 } = options;

//   if (retries === 0) {
//     throw new Error('The number of attempts has been exhausted');
//   }

//   return new HTTPTransport()
//     .get(url, options)
//     .catch(() => fetchWithRetry(url, { ...options, retries: retries - 1 }));
// }

// export { fetchWithRetry };
