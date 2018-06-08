/*
This mixin contains methods and computeds for handling address and account
search functionality.
*/

import axios from 'axios';

export default {
  methods: {
    /*
    INPUT HANDLING
    */

    searchByAddress(address) {
      console.log('search by address', address);

      // update state
      // REVIEW does this get used?
      this.inputAddress = address;
      this.message = `Searching for <strong>${address}</strong>...`;
      this.searchMethod = 'address';

      // fetch addresses
      this.fetchAddresses(
        address,
        (addresses = []) => {
          // console.log('did fetch addresses', addresses);
          // this.$store.commit('setAddresses', addresses);

          if (addresses.length === 1) {
            const [ address = {} ] = addresses;

            this.handleAddress(address);

          } else if (addresses.length > 1) {
            this.addressCandidates = addresses;
            this.message = '';
          }
        },
        (error) => {
          // TODO handle error
          console.log('error fetching addresses');
        }
      );
    },

    searchByAccount(account) {
      console.log('search by account', account);

      this.message = `Searching for account <strong>#${account}</strong>...`;
      this.searchMethod = 'account';

      this.fetchBalances(
        account,
        (response) => {
          console.log('got balances', response);

          const { data = {} } = response;
          const { data: balanceData = {} } = data;
          const { property = {} } = balanceData;
          const { address } = property;

          if (!address) {
            // TODO
          }

          this.balances = balanceData;

          this.message = `Getting some more information about <strong>${address}</strong>...`;

          // now get address
          this.fetchAddresses(
            address,
            (addresses = []) => {
              console.log('got addresses', response);

              const [ address ] = addresses;

              if (!address) {
                // TODO
              }

              this.handleAddress(address);
            },
            this.fetchAddressesError
          )
        },
        (error) => {
          // TODO
        }
      )
    },

    // takes an address feature and puts the necessary attributes in state,
    // and then fetches balances if this was an address search
    handleAddress(address) {
      console.log('handle address', address);

      const { properties = {} } = address;

      // put street address and zip code in state
      const { street_address: streetAddress, zip_code: zipCode } = properties;
      Object.assign(this.address, { streetAddress, zipCode });

      // get and validate account number
      const { opa_account_num: account } = properties;

      if (!account) {
        // TODO better error. feed back user input.
        this.message = `
          We weren't able to find a real estate tax account for that address.
          Please try again.
        `;

        return;
      }

      // if this was an address search
      if (this.searchMethod === 'address') {
        // get tax balances

        this.message = `Getting details for account <strong>#${account}</strong>...`;
        this.addressCandidates = [];

        this.fetchBalances(
          account,
          (response) => {
            const { data = {} } = response;
            const { data: balanceData = {} } = data;

            this.balances = balanceData;
            this.message = '';
          },
          (error) => {
            // TODO
            console.error('error getting balances for address search');
          }
        );
      // otherwise it was an account search
      } else {
        // and we don't need to do any more data fetching, so empty out the
        // message
        this.message = '';
      }
    },

    /*
    DATA FETCHING
    */

    // returns a promise for one page of addresses from ais
    fetchAddressesByPage(address, page) {
      console.log(`fetch addresses (page ${page})`, address);

      // configure
      const { url: urlFn, params: baseParams = {} } = this.$config.addresses;
      const url = urlFn(address);
      const params = Object.assign({}, baseParams, { page });

      // return a promise
      return axios.get(url, { params });
    },

    // takes an address and returns an array of ais features
    fetchAddresses(address, callback, errorCallback) {
      console.log('fetch addresses', address);

      // get first page
      this.fetchAddressesByPage(address, 1)
        .then((response) => {
          const { data = {} } = response;
          let { features = [] } = data;
          const pageCount = data.page_count;

          // if there's just one page of results, we're done
          if (pageCount === 1) {
            callback(features);
          // otherwise, get remaining pages
          } else {
            this.message = `
              Please wait while we get more details about <strong>
              ${address}</strong>...
            `;

            // this holds the axios promises to fire off in parallel
            const remainingPageRequests = [];

            // make promises for remaining pages
            for (let i = 2; i <= pageCount; i++) {
              const pageRequest = this.fetchAddressesByPage(address, i);
              remainingPageRequests.push(pageRequest);
            }

            // execute promises in parallel and concat results
            axios.all(remainingPageRequests)
              .then((responses) => {
                for (let response of responses) {
                  const { data={} } = response;
                  const pageFeatures = data.features || [];

                  features = features.concat(pageFeatures);
                }

                callback(features);
              });
          }
        })
        .catch(this.fetchAddressesError);
    },

    fetchAddressesError(error) {
      console.log('fetch addresses error', error);
    },

    fetchBalances(account, callback, errorCallback) {
      console.log('fetch balances', account);

      const config = this.$config.balances;
      const urlFn = config.url;
      const url = urlFn(account);
      const { params = {} } = config;

      axios.get(url, { params })
        .then(callback)
        .catch(errorCallback);
    },
  },
};
