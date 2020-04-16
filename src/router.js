import Vue from 'vue';
import Router from 'vue-router';
import Formulario from './components/Formulario'
import Planos from './components/Planos'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Formulario
    },
    {
      name: 'planos',
      path: '/planos',
      component: Planos,
      props: true,
    }
  ],
});