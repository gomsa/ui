import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    // 角色不包含root角色  开始检测
    if (roles.indexOf('root') === -1) {
      if (value && value instanceof Array && value.length > 0) {
        const permissionRoles = value

        const hasPermission = roles.some(role => {
          return permissionRoles.includes(role)
        })
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`need roles! Like v-role="['root','admin']"`)
      }
    }
  }
}
