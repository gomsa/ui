import request from '@/utils/request'

export function Exist(firm) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Firms.Exist',
      request: {
        firm: firm
      }
    }
  })
}
export function All() {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Firms.All',
      request: {
        firm: {}
      }
    }
  })
}

export function List(firm) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Firms.List',
      request: {
        firm: firm
      }
    }
  })
}

export function Get(id) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Firms.Get',
      request: {
        firm: {
          id: id
        }
      }
    }
  })
}

export function Create(firm) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Firms.Create',
      request: {
        firm: firm
      }
    }
  })
}
export function Update(firm) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Firms.Update',
      request: {
        firm: firm
      }
    }
  })
}
export function Delete(firm) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Firms.Delete',
      request: {
        firm: firm
      }
    }
  })
}
