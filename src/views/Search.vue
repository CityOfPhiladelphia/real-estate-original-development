<template>
  <div class="small-24 columns">
    <router-link to="/"
                 class="back-link"
    >
      <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
      Back
    </router-link>

		<p></p>

		<div class="medium-16 columns medium-centered">
      <form @submit.prevent="submitForm">
  			<label for="account">OPA account number</label>
  			<div>This can be found on your real estate tax bill. This was formerly known as the "BRT ID".</div>
        <div><em>Example: 883309050</em></div>
  			<input type="text"
               name="account"
               v-model="account"
               @keyup.enter="search"
        >

  			<p><strong>OR</strong></p>

  			<label for="address">Property address</label>
        <div><em>Example: 1234 Market St</em></div>
  			<input type="text"
               name="address"
               v-model="address"
               @keyup.enter="search"
        >

        <input type="submit"
               value="Search"
               class="button clearfix"
        >

        <span class="error"
              v-show="error && error.length > 0"
        >
          {{ error }}
        </span>
      </form>
		</div>
	</div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'search',
    data() {
      return {
        account: '',
        address: '',
        error: '',
      };
    },
    methods: {
      submitForm() {
        console.log('submit form');

        const { account = '', address = '' } = this;

        // make sure there's *some* search input
        if (!(account.length > 0 || address.length > 0)) {
          this.error = 'Please enter an account or address to continue.';
          return;
        }

        // remove hyphens and spaces from account, if any
        let accountClean;

        if (account) {
          accountClean = account.replace('-', '')
                                .replace(' ', '');
        }

        // if there's an account, validate it
        if (account.length > 0 && !accountClean.match(/[0-9]{9}/)) {
          this.error = 'Please enter a valid, 9-digit account number to continue.'
          return;
        }

        // form query
        const query = {};

        if (accountClean) {
          query.account = accountClean;
        } else {
          query.address = address;
        }

        // navigate
        this.$router.push({ path: 'account', query });
      },
    },
  };
</script>

<style>
  .error {
    padding-left: 1em;
    color: red;
    font-weight: bold;
  }
</style>
