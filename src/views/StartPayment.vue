<template>
  <div class="small-24 columns">
    <router-link to="/account"
                 class="back-link"
    >
      <i class="fa fa-long-arrow-left back-link" aria-hidden="true"></i>
      Back
    </router-link>

    <div class="medium-16 columns medium-centered">
      <form>
        <label for="email">Email</label>

        Please enter your email address to continue.

        <input type="email"
               name="email"
               v-model="email"
        >

        <div class="callout">
          Next, you'll be taken to Official Payments Corp., the official payment
          processing agent for the City of Philadelphia.
        </div>

        <p>
          <em>Official Payments Corp. charges a User's Fee to process on-line credit and debit card payments. This fee is paid directly to Official Payments Corporation and is not refundable. The City of Philadelphia does not receive any portion of this fee. Electronic Checks (eCheck) payments are free and have no User Fee charged. Official Payments will display the User Fee prior to entering credit card/bank account information.</em>
        </p>

        <a class="button external"
                @click="didClickContinue"
        >
          Continue
        </a>
      </form>
    </div>
  </div>
</template>

<script>
  import js2xmlparser from 'js2xmlparser';
  import axios from 'axios';

  const INITIATE_PURCHASE_URL = '//api.phila.gov/epay/Gateway1/InitiatePurchase.aspx';

  export default {
    data() {
      return {
        email: 'robert.martin@phila.gov',
      };
    },
    methods: {
      didClickContinue() {
        console.log('did click continue');

        // TODO finish this

        // axios.post(INITIATE_PURCHASE_URL, { billStmt: dataXml });
      },
    },
  };
</script>
