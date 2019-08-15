import request from '@/utils/request'

export function Exist(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goods.Exist',
      'request': data
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goods.List',
      'request': data
    }
  })
}

export function Get(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goods.Get',
      'request': data
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goods.Create',
      'request': data
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goods.Update',
      'request': data
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Goods.Delete',
      'request': data
    }
  })
}
