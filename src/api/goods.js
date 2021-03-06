import request from '@/utils/request'

export function Exist(good) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Goods.Exist',
      request: {
        good: good
      }
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Goods.List',
      request: data
    }
  })
}

export function Get(good) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Goods.Get',
      request: {
        good: good
      }
    }
  })
}

export function Create(good) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Goods.Create',
      request: {
        good: good
      }
    }
  })
}
export function Update(good) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Goods.Update',
      request: {
        good: good
      }
    }
  })
}
export function Delete(id) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Goods.Delete',
      request: {
        good: {
          id: id
        }
      }
    }
  })
}
