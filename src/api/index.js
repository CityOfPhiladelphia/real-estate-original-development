import axios from 'axios'

import {
  AIS_ENDPOINT,
  AIS_API_KEY,
  TAX_BALANCE_ENDPOINT,
  TAX_BALANCE_API_KEY
} from '@/config'

export default {
  async searchAddress (address) {
    const opts = {
      method: 'get',
      url: `/addresses/${address}`,
      baseURL: AIS_ENDPOINT,
      params: {
        gatekeeperKey: AIS_API_KEY,
        include_units: true,
        opa_only: true
      }
    }
    const response = await axios(opts)
    return response.data.features
  },

  async getPropertyInfo (account) {
    const opts = {
      method: 'get',
      url: `/account/${account}`,
      baseURL: AIS_ENDPOINT,
      params: {
        gatekeeperKey: AIS_API_KEY,
        include_units: true,
        opa_only: true
      }
    }
    const response = await axios(opts)
    return response.data.features[0]
  },

  async getTaxBalance (account) {
    const opts = {
      method: 'get',
      url: `/account/${account}`,
      baseURL: TAX_BALANCE_ENDPOINT,
      params: {
        gatekeeperKey: TAX_BALANCE_API_KEY
      }
    }
    const response = await axios(opts)
    return response.data.data
  }
}
