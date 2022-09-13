import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'element-plus/dist/index.css'

// 处理提示消息
import ElementPlus,{ ElMessage } from 'element-plus'


// 不用api文件封装方法的方式  组件this.$xxx方式
import Axios from 'axios';
const app = createApp(App);
// 作为标识让webpack代理这个请求
Axios.defaults.baseURL = '/api';
// 请求拦截器
Axios.interceptors.request.use(function(config){
    const token = window.sessionStorage.getItem('token') || '';
    if (token) {
        config.headers.token = token; // 添加token请求头
    }
    return config;
})

// 响应拦截器
Axios.interceptors.response.use(function(response){
    const {token,code } =  response.data;
    if (code === 200) {
        if (token)
            window.sessionStorage.setItem('token',token);
    }
    return response;
})
// vue2
// Vue.prototype.$ajax = Axios
// Vue3
app.config.globalProperties.$ajax = Axios;




app
    .use(ElementPlus)
    .use(store).use(router).mount('#app')
