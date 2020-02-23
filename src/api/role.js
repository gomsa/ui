import request from '@/utils/request'

export function All() {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.All',
      'request': {}
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.List',
      'request': {
        'list_query': data
      }
    }
  })
}

export function Get(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Get',
      'request': {
        'role': data
      }
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Create',
      'request': {
        'role': data
      }
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Update',
      'request': {
        'role': data
      }
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Delete',
      'request': {
        'role': data
      }
    }
  })
}
