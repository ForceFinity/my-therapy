import axios, { AxiosRequestConfig } from 'axios'

export const API_BASE = "https://my-therapy-aaoikglfla-ez.a.run.app/api"

export interface ResponseData<T> {
  data?: T;
  status: string;
}

export const post = async <T>(url: string, formData?: FormData, config?: AxiosRequestConfig): Promise<ResponseData<T>> => {
  let data = undefined
  let status = "200"

  try {
    const response = await axios.post(url, formData, config)

    data = response.data
    // _.mapKeys(response.data, (v: any, k: any) => _.camelCase(k)) as T
    // console.log(response.data)
  } catch (e: any) {
    status = e.response ? e.response.status.toString() : "400"
  }

  return {data, status}
}

export const fetchLogged = async <T>(url: string, token: string): Promise<ResponseData<T>> => {
  try {
    // noinspection JSAnnotator
    const response = await axios.get<T>(
        url,
        {
          headers: {
            "Authorization": token
          }
        }
    );

    return {data: response.data, status: response.status.toString()};
  } catch (error: any) {
    console.error('Error setting up request: ', error.message);

    const status: string = error.response?.status.toString() || '500';

    return {data: undefined, status};
  }
};