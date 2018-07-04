<template>
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
        v-for="year in collapsedYears"
        :key="year.year">
        <td>
          <span class="year-start">{{ year.year }}</span>
          <span
            v-if="year.endYear"
            class="year-end">
            – {{ year.endYear }}
          </span>
        </td>
        <td>{{ year.principal | formatCurrencyUnlessZero }}</td>
        <td>{{ year.interest | formatCurrencyUnlessZero }}</td>
        <td>{{ year.penalty | formatCurrencyUnlessZero }}</td>
        <td>{{ year.other | formatCurrencyUnlessZero }}</td>
        <td>{{ year.total | formatCurrencyUnlessZero }}</td>
        <td>{{ year.lienNum }}</td>
        <td>{{ year.solicitor }}</td>
        <td>{{ year.status }}</td>
      </tr>
      <tr class="strong">
        <td>TOTAL</td>
        <td>{{ totals.principal | formatCurrency }}</td>
        <td>{{ totals.interest | formatCurrency }}</td>
        <td>{{ totals.penalty | formatCurrency }}</td>
        <td>{{ totals.other | formatCurrency }}</td>
        <td>{{ totals.total | formatCurrency }}</td>
        <td colspan="3"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { formatCurrency } from '@/util'

export default {
  props: {
    years: {
      type: Array,
      required: true
    },
    totals: {
      type: Object,
      required: true
    }
  },
  filters: {
    formatCurrency,
    formatCurrencyUnlessZero (input) {
      return input === 0 ? '—' : formatCurrency(input)
    }
  },
  computed: {
    collapsedYears () {
      return this.years.reduce((accum, item) => {
        const prevItem = accum[accum.length - 1] || {}
        const areSequential = (prevItem.year === item.year - 1 || prevItem.endYear === item.year - 1)
        if (areSequential && prevItem.total === 0 && item.total === 0) {
          prevItem.endYear = item.year // mutates :(
        } else {
          accum.push(item)
        }
        return accum
      }, [])
    }
  }
}
</script>

<style lang="sass">
.strong
  font-weight: bold
</style>
