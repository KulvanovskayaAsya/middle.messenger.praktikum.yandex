const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: HttpMethods;
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

class HTTP implements IHTTP {
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

      if (method === HttpMethods.GET && data) {
        url += `?${queryStringify(data)}`;
      }

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === HttpMethods.GET || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

function fetchWithRetry(url: string, options: Options): unknown {
  const { retries = 2 } = options;

  if (retries === 0) {
    throw new Error('The number of attempts has been exhausted');
  }

  return new HTTP()
    .get(url, options)
    .catch(() => fetchWithRetry(url, { ...options, retries: retries - 1 }));
}

export default HTTP;

export { fetchWithRetry };
