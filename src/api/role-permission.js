import request from '@/utils/request'

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

