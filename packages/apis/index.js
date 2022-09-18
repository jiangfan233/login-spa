import axios from "axios";

console.log(import.meta.env)

const baseUrl = import.meta.env.VITE_baseUrl;

export default function doRequest(options) {
  const { url, ...rest } = options;

  const config = Object.assign(
    {
        baseURL: baseUrl + url,
      "Access-Control-Allow-Origin": "*",
      // `timeout` 指定请求超时的毫秒数。
      // 如果请求时间超过 `timeout` 的值，则请求会被中断
      timeout: 1000, // 默认值是 `0` (永不超时)

      // `withCredentials` 表示跨域请求时是否需要使用凭证
      withCredentials: false, // default
    },
    rest
  );

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      return config;
    },

    function (error) {
      // 对请求错误做些什么
      console.error(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么

      if(response.status !== 0) {
        alert(response.message);            // 此处可用 antd中的message代替
      } 

      return response;
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );

  return axiosInstance(config);
}
