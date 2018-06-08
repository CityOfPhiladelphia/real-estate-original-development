import Vue from 'vue';

const config = {
  addresses: {
    // url: address => `//api.phila.gov/ais_brt/v1/addresses/${address}`,
    url: address => `//api.phila.gov/ais_dev/v1/addresses/${address}`,
    params: {
      include_units: true,
      opa_only: true,
    },
  },
  balances: {
    url: account => `//api.phila.gov/tips/account/${account}`,
  },
};

// global config mixin (so all vue components can access config as
// `this.$config`)
Vue.mixin({
  created() {
    this.$config = config;
  }
})
