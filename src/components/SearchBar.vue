<template>
  <div>
    <select ref="select" v-model="searchMethod">
      <option value="account">Account</option>
      <option value="address">Address</option>
    </select>
    <input type="text"
           class="float-left"
           @keyup.enter="search"
           v-model="input"
    >
    <button class="float-left"
            @click="search"
    >
      Search
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      searchMethod: {
        type: String,
      },
    },
    data() {
      return {
        input: '',
      }
    },
    computed: {
      mode() {
        return this.$refs.select.value;
      },
      query() {
        const query = {};
        query[this.mode] = this.input;

        return query;
      },
    },
    methods: {
      search() {
        const { query } = this;
        this.$router.push({ path: 'account', query });
      },
    },
  };
</script>

<style scoped>
  select {
    width: 100px;
    float: left;
    line-height: 1.2em;
  }

  input {
    width: 250px;
  }

  button {
    /* ¯\_(ツ)_/¯ */
    line-height: 1.3em;
  }
</style>
