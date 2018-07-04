<template>
  <div>
    <SearchBar/>

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
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import api from '@/api'

export default {
  components: {
    SearchBar
  },
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
  watch: {
    address: 'fetch'
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
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
          this.error = `No properties found with the address ${this.address}.`
        } else {
          this.error = err.message
        }
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
