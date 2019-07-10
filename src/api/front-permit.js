import request from '@/utils/request'

export function UpdateOrCreate(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.UpdateOrCreate',
      'request': data
    }
  })
}

export function All() {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.All',
      'request': {}
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.List',
      'request': data
    }
  })
}

export function Get(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.Get',
      'request': data
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.Create',
      'request': data
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.Update',
      'request': data
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.Delete',
      'request': data
    }
  })
}
