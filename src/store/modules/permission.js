import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has Permit
 * @param roles
 * @param route
 */
function hasPermit(permits, route) {
  if (route.meta && route.meta.permits) {
    return permits.some(permit => route.meta.permits.includes(permit))
  } else {
    return true
  }
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param permits
 */
export function filterAsyncPermits(routes, permits) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermit(permits, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncPermits(tmp.children, permits)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('root')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generatePermits({ commit }, { roles, permits }) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('root')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncPermits(asyncRoutes, permits)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
