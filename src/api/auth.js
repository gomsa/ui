import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Auth.Auth',
      'request': data
    }
  })
}

export function getInfo() {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Users.Info',
      'request': {}
    }
  })
}

export function logout() {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Auth.Logout',
      'request': {}
    }
  })
}
