// src/shared/data-sources/base-datasource.ts
export interface FetchOptions {
  headers?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}

export interface HttpClient {
  get<T>(url: string, options?: FetchOptions): Promise<T>;
  post<T, B>(url: string, body: B, options?: FetchOptions): Promise<T>;
  put<T, B>(url: string, body: B, options?: FetchOptions): Promise<T>;
  delete<T>(url: string, options?: FetchOptions): Promise<T>;
}

export class NuxtHttpClient implements HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private buildUrl(url: string): string {
    return `${this.baseUrl}${url}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private createOptions(options?: FetchOptions): any {
    const token = useCookie("auth_token");

    return {
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : "",
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      params: options?.params,
    };
  }

  async get<T>(url: string, options?: FetchOptions): Promise<T> {
    const fullUrl = this.buildUrl(url);
    const fetchOptions = this.createOptions(options);

    return useAsyncData<T>(url, () =>
      $fetch(fullUrl, {
        method: "GET",
        ...fetchOptions,
      })
    ).then((response) => {
      if (response.error.value) throw response.error.value;
      return response.data.value as T;
    });
  }

  async post<T, B>(url: string, body: B, options?: FetchOptions): Promise<T> {
    const fullUrl = this.buildUrl(url);
    const fetchOptions = this.createOptions(options);

    return $fetch<T>(fullUrl, {
      method: "POST",
      body,
      ...fetchOptions,
    });
  }

  async put<T, B>(url: string, body: B, options?: FetchOptions): Promise<T> {
    const fullUrl = this.buildUrl(url);
    const fetchOptions = this.createOptions(options);

    return $fetch<T>(fullUrl, {
      method: "PUT",
      body,
      ...fetchOptions,
    });
  }

  async delete<T>(url: string, options?: FetchOptions): Promise<T> {
    const fullUrl = this.buildUrl(url);
    const fetchOptions = this.createOptions(options);

    return $fetch<T>(fullUrl, {
      method: "DELETE",
      ...fetchOptions,
    });
  }
}

// Ejemplo de fábrica para crear clientes HTTP
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HttpClientFactory {
  static createNuxtClient(baseUrl?: string): HttpClient {
    return new NuxtHttpClient(baseUrl);
  }

  // Podrías añadir más métodos para otros clientes en el futuro
  // static createAxiosClient(baseUrl?: string): HttpClient { ... }
}
