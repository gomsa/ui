import request from '@/utils/request'

export function All(data) {
  return request({
    method: 'post',
    data: {
      'service': 'department-api',
      'method': 'Departments.All',
      'request': data
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'department-api',
      'method': 'Departments.List',
      'request': data
    }
  })
}

export function Get(data) {
  return request({
    method: 'post',
    data: {
      'service': 'department-api',
      'method': 'Departments.Get',
      'request': data
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'department-api',
      'method': 'Departments.Create',
      'request': data
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'department-api',
      'method': 'Departments.Update',
      'request': data
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'department-api',
      'method': 'Departments.Delete',
      'request': data
    }
  })
}
