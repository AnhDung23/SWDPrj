import Vuex from 'vuex'
import Vue from 'vue'

import login from './Login/Login'
import workAssign from './Work/WorkAssign'
import account from './Account/AccountManagement'
import employee from './Employee/employee'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login: login,
    account: account,
    workAssign: workAssign,
    employee: employee
  }
})
