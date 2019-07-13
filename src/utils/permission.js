import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 * @判断角色
 */
export function checkRole(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value
    if (roles.indexOf('root') === -1) {
      return true
    }
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-role="['root','editor']"`)
    return false
  }
}

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 * @前端角色判断 FrontPermit
 */
export function checkPermit(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const front_permits = store.getters && store.getters.front_permits
    const permits = value
    if (roles.indexOf('root') === -1) {
      return true
    }
    const hasPermission = front_permits.some(role => {
      return permits.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need Front Permit! Like v-permit="['root','editor']"`)
    return false
  }
}
