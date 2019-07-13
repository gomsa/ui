import permit from './permit'
import role from './role'

const install = function(Vue) {
  Vue.directive('permit', permit)
  Vue.directive('role', role)
}

if (window.Vue) {
  window['permit'] = permit
  window['role'] = role
  Vue.use(install); // eslint-disable-line
}

export default install
