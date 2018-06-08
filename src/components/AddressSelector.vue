<template>
  <div>
    <h3 v-html="header" />

    <select ref="addressSelect">
      <option v-for="(address, index) in addressesWithAccounts"
              :value="address.address"
      >
        {{ address.address }} : Account #{{ address.account }}
      </option>
    </select>
    <div class="pull-right">
      <button @click="didClickContinue">Continue</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      candidates: Array,
      inputAddress: String,
    },
    computed: {
      header() {
        const { inputAddress, candidates } = this;
        return `
          We found ${candidates.length} results for <strong>${inputAddress}</strong>.
        `;
      },
      addresses() {
        return this.candidates.map((candidate) => {
          return candidate.properties.street_address;
        });
      },
      addressesWithAccounts() {
        return this.candidates.map((candidate) => {
          const {
            street_address: address,
            opa_account_num: account
          } = candidate.properties;

          return { address, account };
        });
      },
    },
    methods: {
      didClickContinue() {
        const { value: address } = this.$refs.addressSelect;

        const candidate = this.candidates.filter((candidate) => {
          return candidate.properties.street_address === address;
        })[0];

        this.$emit('did-select-address', candidate);
      },
    },
  };
</script>

<style scoped>

</style>
