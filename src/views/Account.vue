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
              <div class="strong total-due-amount">{{ totals.total | currency }}</div>

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

          <table role="grid" class="stack">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Principal</th>
                <th scope="col">Interest</th>
                <th scope="col">Penalty</th>
                <th scope="col">Other</th>
                <th scope="col">Total</th>
                <th scope="col">Lien #</th>
                <th scope="col">Solicitor</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="year in taxBalance.years"
                :key="year.year">
                <td>{{ year.year }}</td>
                <td>{{ year.principal | currency }}</td>
                <td>{{ year.interest | currency }}</td>
                <td>{{ year.penalty | currency }}</td>
                <td>{{ year.other | currency }}</td>
                <td>{{ year.total | currency }}</td>
                <td>{{ year.lienNum }}</td>
                <td>{{ year.solicitor }}</td>
                <td>{{ year.status }}</td>
              </tr>
              <tr class="strong">
                <td>TOTAL</td>
                <td>{{ totals.principal | currency }}</td>
                <td>{{ totals.interest | currency }}</td>
                <td>{{ totals.penalty | currency }}</td>
                <td>{{ totals.other | currency }}</td>
                <td>{{ totals.total | currency }}</td>
                <td colspan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import api from '@/api'
import { generateEpayPayload } from '@/util'
import { EPAY_URL } from '@/config'

export default {
  components: {
    SearchBar
  },
  props: {
    account: {
      type: String,
      required: true
    }
  },
  filters: {
    currency (input) {
      return input.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
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

.strong
  font-weight: bold
</style>
