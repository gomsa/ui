import request from '@/utils/request'

export function Exist(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Exist',
      'request': data
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.List',
      'request': data
    }
  })
}

export function Get(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Get',
      'request': data
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Create',
      'request': data
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Update',
      'request': data
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Roles.Delete',
      'request': data
    }
  })
}
