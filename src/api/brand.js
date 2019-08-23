import request from '@/utils/request'

export function Exist(brand) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Brands.Exist',
      request: {
        brand: brand
      }
    }
  })
}
export function All() {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Brands.All',
      request: {
        brand: {}
      }
    }
  })
}

export function List(brand) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Brands.List',
      request: {
        brand: brand
      }
    }
  })
}

export function Get(id) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Brands.Get',
      request: {
        brand: {
          id: id
        }
      }
    }
  })
}

export function Create(brand) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Brands.Create',
      request: {
        brand: brand
      }
    }
  })
}
export function Update(brand) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Brands.Update',
      request: {
        brand: brand
      }
    }
  })
}
export function Delete(brand) {
  return request({
    method: 'post',
    data: {
      service: 'goods-api',
      method: 'Brands.Delete',
      request: {
        brand: brand
      }
    }
  })
}
