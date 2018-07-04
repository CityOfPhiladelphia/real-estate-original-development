<template>
  <div>
    <SearchBar/>

    <div class="row columns">
      <div v-if="isLoading">
        <PhilaLoadingIndicator/>
      </div>
      <div v-else-if="error">
        <b>Error:</b> {{ error }}
      </div>
      <div v-else>
        <h1>{{ property.opa_address }}</h1>

        <div class="row">
          <div class="columns medium-14">
            <dl>
              <dt>Owner(s)</dt>
              <dd>{{ owners }}</dd>

              <dt>Account number</dt>
              <dd>{{ property.opa_account_num }}</dd>
            </dl>
          </div>
          <div class="columns medium-10 center">
            <div class="call-to-action">
              <h5 class="alt">Total due</h5>
              <div class="strong total-due-amount">{{ totals.total | formatCurrency }}</div>

              <form
                :action="epayUrl"
                method="post">
                <input
                  name="billStmt"
                  type="hidden"
                  :value="epayPayload">
                <input
                  type="submit"
                  class="button external"
                  value="Pay now">
              </form>
            </div>
          </div>
        </div>

        <div class="row columns">
          <h3>Balance details</h3>
          <BalanceTable
            :years="taxBalance.years"
            :totals="totals"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import BalanceTable from '@/components/BalanceTable'
import api from '@/api'
import { formatCurrency, generateEpayPayload } from '@/util'
import { EPAY_URL } from '@/config'

export default {
  components: {
    SearchBar,
    BalanceTable
  },
  props: {
    account: {
      type: String,
      required: true
    }
  },
  filters: {
    formatCurrency
  },
  data () {
    return {
      isLoading: false,
      error: null,
      property: {},
      taxBalance: {},
      epayUrl: EPAY_URL
    }
  },
  computed: {
    owners () {
      return this.property.opa_owners ? this.property.opa_owners.join(', ') : ''
    },
    totals () {
      return this.taxBalance.years.reduce((accum, year) => ({
        principal: (accum.principal || 0) + year.principal,
        interest: (accum.interest || 0) + year.interest,
        penalty: (accum.penalty || 0) + year.penalty,
        other: (accum.other || 0) + year.other,
        total: (accum.total || 0) + year.total
      }), {})
    },
    epayPayload () {
      return generateEpayPayload({
        accountNumber: this.property.opa_account_num,
        totalDue: this.totals.total,
        itemDescription: 'Real Estate Tax',
        ownerName: this.taxBalance.property.ownerName, // use revenue's data
        addressStreet: this.property.opa_address,
        addressCity: 'Philadelphia',
        addressState: 'PA',
        addressZip: this.property.zip_code,
        addressCountry: 'USA'
      })
    }
  },
  watch: {
    account: 'fetch'
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.error = false
      this.isLoading = true
      try {
        const requests = [
          api.getPropertyInfo(this.account),
          api.getTaxBalance(this.account)
        ]
        // run requests in parallel
        const [ propertyInfo, taxBalance ] = await Promise.all(requests)
        this.property = propertyInfo.properties
        this.taxBalance = taxBalance
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.error = `Account ${this.account} not found.`
        } else {
          console.log(err.response)
          this.error = err.message
        }
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.call-to-action
  border: 1px solid #aaa
  background: rgba(0, 0, 0, 0.04)
  padding: 1em

.total-due-amount
  font-size: 2.5em
  font-weight: 700
</style>
