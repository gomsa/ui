import request from '@/utils/request'

export function Exist(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Users.Exist',
      'request': {
        'user': data
      }
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Users.List',
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
      'method': 'Users.Get',
      'request': {
        'user': data
      }
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Users.Create',
      'request': {
        'user': data
      }
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Users.Update',
      'request': {
        'user': data
      }
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Users.Delete',
      'request': {
        'user': data
      }
    }
  })
}
