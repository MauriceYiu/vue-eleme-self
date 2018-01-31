import Vue from 'vue'
import Router from 'vue-router'
import SelectSite from '@/views/selectSite/SelectSite'
import Main from '@/views/main/Main'
import City from '@/views/city/City'
import Loading from '@/components/loading/Loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SelectSite',
      component: SelectSite
    },
    {
      path: '/city/:id',
      name: 'City',
      component: City
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
