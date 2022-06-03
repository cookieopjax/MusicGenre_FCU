import { createApp } from 'vue'
import App from './App.vue'

//axios import
import axios from 'axios'
import VueAxios from 'vue-axios'

//Element UI import
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(VueAxios, axios);
app.use(ElementPlus);
app.mount('#app');