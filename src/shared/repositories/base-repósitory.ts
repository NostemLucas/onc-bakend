/* eslint-disable @typescript-eslint/no-explicit-any */

import type { HttpClient } from "../data-sources/base-datasource";

export abstract class BaseRepository<T> {
  protected client: HttpClient;
  protected endpoint: string;

  constructor(client: HttpClient, endpoint: string) {
    this.client = client;
    this.endpoint = endpoint;
  }

  async getAll(params?: any): Promise<T[]> {
    return this.client.get<T[]>(this.endpoint, { params });
  }

  async getById(id: string | number, params?: any): Promise<T> {
    return this.client.get<T>(`${this.endpoint}/${id}`, { params });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.client.post<T, Partial<T>>(this.endpoint, data);
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    return this.client.put<T, Partial<T>>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string | number): Promise<void> {
    return this.client.delete(`${this.endpoint}/${id}`);
  }
}
