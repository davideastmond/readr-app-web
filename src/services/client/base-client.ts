import axios from "axios";
import { AUTH_HEADER, API_URL } from "../../environment";

export abstract class BaseClient {
  private api;

  constructor(headers?: { [keyof: string]: string }) {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        ...AUTH_HEADER,
        ...headers,
      },
    });
  }
  protected async getData<T>(url: string): Promise<T> {
    const response = await this.api.get(url);
    return response.data;
  }

  protected async postData<T, D>(url: string, data?: D): Promise<T> {
    const response = await this.api.post(url, data);
    return response.data;
  }

  protected async patchData<T, D>(url: string, data?: D): Promise<T> {
    const response = await this.api.patch(url, data);
    return response.data;
  }

  protected async putData<T, D>(url: string, data?: D): Promise<T> {
    const response = await this.api.put(url, data);
    return response.data;
  }

  protected async deleteData<T, D>(url: string, data?: D): Promise<T> {
    const response = await this.api.delete(url, { data: data });
    return response.data;
  }
}
