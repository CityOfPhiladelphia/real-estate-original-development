<template>
  <div class="row expanded search-container bg-ghost-gray">
    <div class="row">
      <div class="columns medium-18 small-centered">
        <form @submit.prevent="onSubmit">
          <label for="input">Property address or account number</label>
          <div class="search">
            <input
              type="text"
              id="input"
              name="input"
              ref="input"
              placeholder="e.g. 1234 Market St or 883309050"
              class="search-field"
              required>
            <input
              type="submit"
              value="submit"
              class="search-submit">
          </div>
          <span role="alert">
            Your account number can be found on your real estate tax bill.
            It was formerly known as the "BRT Number."
          </span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit (event) {
      const input = this.$refs.input.value.trim()
      if (isNumeric(input)) {
        this.$router.push(`/account/${input}`)
      } else {
        this.$router.push({
          path: '/search',
          query: {
            address: input
          }
        })
      }
    }
  }
}

function isNumeric (string) {
  return /^\d+$/.test(string)
}
</script>

<style lang="sass" scoped>
.search-container
  margin: 2rem 0
  padding: 2rem

.search-field
  margin-bottom: 3px

.form-title
  text-align: center
  padding-bottom: 1rem

.class-field
  margin-bottom: 0
</style>
