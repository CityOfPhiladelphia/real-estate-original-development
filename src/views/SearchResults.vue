<template>
  <div class="row columns">
    <div v-if="isLoading">
      <i class="fa fa-spinner"></i>
    </div>
    <div v-else-if="error">
      <b>Error:</b> {{ error }}
    </div>
    <div v-else>
      <h1>Search results</h1>
      <ul>
        <li
          v-for="result in results"
          :key="result.properties.opa_account_num">
          <router-link :to="`/account/${result.properties.opa_account_num}`">
            {{ result.properties.opa_address}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      results: [],
      error: null,
      isLoading: false
    }
  },
  async created () {
    this.error = null
    this.isLoading = true
    try {
      this.results = await api.searchAddress(this.address)

      if (this.results.length === 1) {
        const account = this.results[0].properties.opa_account_num
        this.$router.replace(`/account/${account}`)
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.error = 'No properties found with that address'
      } else {
        this.error = err.message
      }
    } finally {
      this.isLoading = false
    }
  }
}
</script>
