import request from '@/utils/request'

export function All() {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Permissions.All',
      'request': {}
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Permissions.List',
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
      'method': 'Permissions.Get',
      'request': {
        'permission': data
      }
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Permissions.Create',
      'request': {
        'permission': data
      }
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Permissions.Update',
      'request': {
        'permission': data
      }
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Permissions.Delete',
      'request': {
        'permission': data
      }
    }
  })
}
