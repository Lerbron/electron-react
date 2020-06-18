import axios from 'axios';
import Cookies from 'js-cookie';
import { message } from 'antd';
import Qs from 'qs'

const http = axios.create({
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'repeat'})
  }
});
http.interceptors.request.use(config=>{
  
	return config;
}, (error)=> {
  // 对请求错误做些什么
  console.log('err:', error)
  return Promise.reject(error);
});

http.interceptors.response.use(response => {
  return response.data;
}, err => {
  let errResponse = err.response
  if (errResponse.status == '401') {
    // message.warning('Current user did not login to the application!');
    curTime = new Date();
    if (curTime - time > intervalTime) {
      time = curTime;
      sessionStorage.removeItem('redirect');
      const pathname = location.pathname
      if (pathname != '/login') {
        const redirect = encodeURI(location.pathname + location.search)
        sessionStorage.setItem('redirect', redirect)
      }
      setTimeout(() => location.href = '/login', 300)
    }
    return Promise.reject(errResponse);
  }

  console.log('errObj:', errResponse)

  message.error(errResponse.data && errResponse.data.error && errResponse.data.error.message || errResponse.statusText || '网络异常，请稍后再试！');
  return Promise.reject(errResponse);

})
export default http
