import request from '@/utils/request'

export function Exist(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goodss.Exist',
      'request': data
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goodss.List',
      'request': data
    }
  })
}

export function Get(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goodss.Get',
      'request': data
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goodss.Create',
      'request': data
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goodss.Update',
      'request': data
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goodss.Delete',
      'request': data
    }
  })
}
