import request from '@/utils/request'

export function Get(code) {
  return request({
    method: 'post',
    data: {
      'service': 'goods-api',
      'method': 'Barcodes.Get',
      'request': {
        'goods': {
          'barcode': code
        }
      }
    }
  })
}
