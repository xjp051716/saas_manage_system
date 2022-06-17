import axios from "axios";
import router from "../router";

let options = {
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
}
const axiosInstance = axios.create(options)
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem("token");
const loadings = {
  target: document.querySelector("#el-scrollbar"),
  fullscreen: false,
  text: '加载中，请耐心等待',
  // spinner: '', //自定义加载图标
  // background: '',
  // custom-class: '',
}
let loadingInstance;
let showLoadingCount = 0;
const startLoading = ()=> {
  if(showLoadingCount == 0) loadingInstance = ElLoading.service(loadings)
  showLoadingCount++
}
const endLoading = ()=> {
  if(showLoadingCount <= 0) return
  showLoadingCount--
  if(showLoadingCount == 0) loadingInstance.close()
}

//请求拦截
axiosInstance.interceptors.request.use(
  config => {
    if(!config.headers.Authorization) config.headers.Authorization = localStorage.getItem("token")
    if(config.data) {
      for(let item in config.data) {
        if(typeof(config.data[item]) === 'string') {
          config.data[item] = config.data[item].trim();
        }
      }
    }
    if(config.method == 'get') startLoading()
    return config;
  },
  error => {
    nextTick(()=> {
      if(loadingInstance) loadingInstance.close()
    })
    return Promise.reject(error);
  }
);

//响应拦截
axiosInstance.interceptors.response.use(
  response => {
    nextTick(()=> {
      if(loadingInstance) endLoading()
    })
    return Promise.resolve(response);
  },
  error => {
    nextTick(()=> {
      if(loadingInstance) loadingInstance.close()
    })
    let { response } = error;
    let msg = JSON.parse(error.request.responseText).msg
    // console.log(response.status, msg)
    if(response.status == 600) {
      localStorage.setItem("token", '');
      ElMessage({
        type: 'error',
        message: msg
      });
      router.push('/login');
    }else {
      ElMessage({
        type: 'error',
        message: msg
      });
    }
    return Promise.reject(error);
  }
)

export default function request(url, method='post', data={}, download) {
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
