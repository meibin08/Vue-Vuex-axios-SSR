
import Vue from 'vue'
import fetchApi from 'src/utils/fetch'
import App from 'src/components/App/index.vue'
import { createStore } from 'src/store'
import { createRouter } from 'src/pages/routes'
import { sync } from 'vuex-router-sync'
import {clientTitleMixin} from 'src/utils/bridge'
import * as filters from 'src/utils/filters'

// mixin for handling title
Vue.mixin(clientTitleMixin)
Vue.prototype.axios = fetchApi;
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
