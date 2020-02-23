import request from '@/utils/request'

export function UpdateOrCreate(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.UpdateOrCreate',
      'request': {
        'front_permit': data
      }
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
      'method': 'FrontPermits.Get',
      'request': {
        'front_permit': data
      }
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.Create',
      'request': {
        'front_permit': data
      }
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.Update',
      'request': {
        'front_permit': data
      }
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'FrontPermits.Delete',
      'request': {
        'front_permit': data
      }
    }
  })
}
