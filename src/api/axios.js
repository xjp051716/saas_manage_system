import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import { nextTick } from "vue";
import router from "../router";

let options = {
  timeout: 60000,
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    "access-control-allow-origin": "*"
  }
}
const axiosInstance = axios.create(options)
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem("token");
const loadings = {
  target: document.querySelector("#el-scrollbar"),
  fullscreen: false,
  text: '加载中，请耐心等待',
  // spinner: '', //自定义加载图标
  // background: '', //遮罩背景色
  // custom-class: '', //Loading的自定义类名
}
let loadingInstance;

//请求拦截
axiosInstance.interceptors.request.use(
  config => {
    if(config.data) {
      for(let item in config.data) {
        if(typeof(config.data[item]) === 'string') {
          config.data[item] = config.data[item].trim();
        }
      }
    }
    loadingInstance = ElLoading.service(loadings)
    return config;
  },
  error => {
    nextTick(()=> {
      loadingInstance.close()
    })
    return Promise.reject(error);
  }
);

//响应拦截
axiosInstance.interceptors.response.use(
  response => {
    nextTick(()=> {
      loadingInstance.close()
    })
    return Promise.resolve(response);
  },
  error => {
    nextTick(()=> {
      loadingInstance.close()
    })
    let { response } = error;
    let msg = JSON.parse(error.request.responseText).detail
    if(response.status == 401) {
      localStorage.setItem("token", '');
      ElMessage.error(msg);
      router.push('/login');
    }else {
      ElMessage.error(msg);
    }
    return Promise.reject(error);
  }
)

export default function request(url, data={}, method='post', download) {
  return new Promise((resolve, reject)=> {
    const options = {
      url,
      method
    }
    if(method.toLowerCase() === 'get') {
      options.params = data
    }else {
      options.data = data
    }
    if(download) {
      options.responseType = 'blob'
    }
    axiosInstance(options).then(res=> {
      if(download) {
        resolve(res)
      }else {
        resolve(res.data)
      }
    }).catch(error=> {
      reject(error)
    })
  })
}
