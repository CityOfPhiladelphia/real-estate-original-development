<template>
  <div class="row expanded mtl bg-ghost-gray">
    <div class="row">
      <div class="columns small-18 small-centered">
        <h3 class="form-title">Search for a property by address or account number</h3>

        <form @submit.prevent="onSubmitAddress">
          <label for="address">Search by property address</label>
          <div class="search">
            <input
              type="text"
              id="address"
              name="address"
              ref="address"
              placeholder="e.g. 1234 Market St"
              class="search-field"
              required>
            <input
              type="submit"
              value="submit"
              class="search-submit">
          </div>
        </form>

        <p><strong>OR</strong></p>

        <form @submit.prevent="onSubmitAccount">
          <label for="account">Search by account number</label>
          <span role="alert">
            This can be found on your real estate tax bill. This was formerly known as the "BRT Number."
          </span>
          <div class="search">
            <input
              type="text"
              id="account"
              name="account"
              ref="account"
              placeholder="e.g. 883309050"
              class="search-field"
              required>
            <input
              type="submit"
              value="submit"
              class="search-submit">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmitAddress (event) {
      const address = this.$refs.address.value.trim()
      this.$router.push({
        path: '/search',
        query: { address }
      })
    },
    onSubmitAccount (event) {
      const account = this.$refs.account.value.trim()
      this.$router.push(`/account/${account}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.form-title
  margin: 1rem
  text-align: center
</style>
