import request from '@/utils/request'

export function CheckCreate(unspsc) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.CheckCreate',
      request: {
        unspsc: unspsc
      }
    }
  })
}

export function Exist(unspsc) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.Exist',
      request: {
        unspsc: unspsc
      }
    }
  })
}
export function All() {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.All',
      request: {
        unspsc: {}
      }
    }
  })
}

export function List(unspsc) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.List',
      request: {
        unspsc: unspsc
      }
    }
  })
}

export function Get(id) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.Get',
      request: {
        unspsc: {
          id: id
        }
      }
    }
  })
}

export function Create(unspsc) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.Create',
      request: {
        unspsc: unspsc
      }
    }
  })
}
export function Update(unspsc) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.Update',
      request: {
        unspsc: unspsc
      }
    }
  })
}
export function Delete(unspsc) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Unspscs.Delete',
      request: {
        unspsc: unspsc
      }
    }
  })
}
