import Vue from 'vue'
import Vuex from 'vuex'
import user from './Authuser/authuser'
import projects from './Projects/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    projects
  }
})
