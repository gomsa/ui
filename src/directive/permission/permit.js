import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const front_permits = store.getters && store.getters.front_permits
    const roles = store.getters && store.getters.roles
    // 角色不包含root角色  开始检测
    if (roles.indexOf('root') === -1) {
    // value存在 value是数组 value长度大于0
      if (value && value instanceof Array && value.length > 0) {
        const permits = value

        const hasPermission = front_permits.some(role => {
          return permits.includes(role)
        })

        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`need roles! Like v-permit="['ui_user_list','ui_user_update']"`)
      }
    }
  }
}
