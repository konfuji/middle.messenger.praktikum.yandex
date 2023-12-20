enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

type options = {
  timeout?: number,
  data?: Document | XMLHttpRequestBodyInit,
  method?: string,
  headers?: Object
} & Record<string, unknown>;

export default class HTTPTransport {
  get(url: string, options: options = {}) {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  post(url: string, options: options = {}) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put(url: string, options: options = {}) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete(url: string, options: options = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request(url: string, options: options, timeout: number = 5000) {
    const { method, headers = {}, data = {} } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('Method is not specified'));
        return;
      }
      const isGet = method === METHODS.GET;
      const IsDataProvided = Boolean(Object.keys(data));

      if (isGet && IsDataProvided) {
        url = `${url}?${this.queryStringify(data as Object)}`;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !IsDataProvided) {
        xhr.send();
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit);
      }
    });
  }

  queryStringify(data: Object) {
    const query: string[] = [];
    Object.entries(data).forEach(([key, value]) => {
      query.push(`${key}=${value}`);
    });
    return query.join('&');
  }
}
