import request from '@/utils/request'

export function GetRoles(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Casbin.GetRoles',
      'request': data
    }
  })
}

export function UpdateRoles(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Casbin.UpdateRoles',
      'request': data
    }
  })
}

export function GetPermissions(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Casbin.GetPermissions',
      'request': data
    }
  })
}

export function UpdatePermissions(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Casbin.UpdatePermissions',
      'request': data
    }
  })
}

