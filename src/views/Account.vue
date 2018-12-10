<template>
  <div class="row">
		<div class="small-24 columns">
      <div class="row">
        <div class="medium-13 columns">
          <router-link to="/search"
                       class="back-link"
          >
            <i class="fa fa-long-arrow-left back-link" aria-hidden="true"></i>
            Back
          </router-link>
        </div>

        <div class="medium-11 columns"
        >
          <search-bar v-if="subview === 'main'"
                      :search-method="searchMethod"
          />
        </div>
      </div>

      <!-- message box for displaying loading statuses and errors -->
      <div v-if="subview === 'message'"
           class="medium-16 columns medium-centered"
      >
        <h3 v-html="message"></h3>
      </div>

      <address-selector v-show="subview === 'address-selector'"
                        :candidates="addressCandidates"
                        :input-address="inputAddress"
                        class="medium-16 columns medium-centered"
                        @did-select-address="handleAddress"
      />

      <!-- main "account" subview -->
      <div v-if="subview === 'main'" style="margin-top: 1em" class="clearfix">
        <h2 class="center mbl">Account Information</h2>

        <div class="row mvm">
          <div class="medium-15 columns">

            <h5 class="alt strong">Customer(s)</h5>
            <p>{{ this.balances.property.ownerName }}</p>

            <h5 class="alt strong">Account</h5>
            <p>{{ this.balances.accountNum }}</p>

            <h5 class="alt strong">Address</h5>
            <p>
              <a :href="`//atlas.phila.gov/#/${address.streetAddress}/property`" class="external" target="_blank">
                <!-- More about this address -->
                {{ address.streetAddress }}
              </a>
              <br>
              PHILADELPHIA, PA {{ address.zipCode }}
              <br>
            </p>
          </div>

          <div class="medium-8 columns call-to-action-panel">
            <div class="row center">
              <h5 class="alt">Total Due</h5>
              <div class="strong total-due-amount">{{ formatCurrency(this.totalDue) }}</div>
              <!-- <h5 class="alt">By</h5>
              <div class="strong total-due-date">April 11, 2018</div> -->

              <!-- this has to be a form, for epay reasons -->
              <form action="https://test-secure.phila.gov/PaymentCenter/Gateway1/InitiatePurchase.aspx"
                    method="post"
              >
                <input name="billStmt"
                       type="hidden"
                       :value="billingXml"
                >
                <!-- REVIEW external class is not adding an icon -->
                <input type="submit"
                       class="button external"
                       value="Pay Now"
                >

                <p style="text-align: left; margin-bottom: 0" class="phs">
                  There are other payment options and assistance plans
                  available. <a href="#">Click here</a> for more
                  information.
                </p>
              </form>
            </div>
          </div>
        </div>

        <h2 class="center mbl mtxl">Balance Details</h2>

        <table>
          <thead>
            <th scope="col">Year</th>
            <th scope="col">Principal</th>
            <th scope="col">Interest</th>
            <th scope="col">Penalty</th>
            <th scope="col">Other</th>
            <th scope="col">Total</th>
            <th scope="col">Lien #</th>
            <th scope="col">Solicitor</th>
            <th scope="col">Status</th>
          </thead>
          <tbody>
            <tr v-for="year in balances.years">
              <td>{{ year.year }}</td>
              <td>{{ formatCurrency(year.principal) }}</td>
              <td>{{ formatCurrency(year.interest) }}</td>
              <td>{{ formatCurrency(year.penalty) }}</td>
              <td>{{ formatCurrency(year.other) }}</td>
              <td>{{ formatCurrency(year.total) }}</td>
              <td>{{ year.lienNum }}</td>
              <td>{{ year.solicitor }}</td>
              <!-- <td>{{ year.status }}</td> -->
              <td>
                <a class="popover-link"
                  @click="didClickPopoverLink"
                  >
                  {{ year.status }}
                  <!-- {{ balance.status }} -->
                </a>
              </td>

            </tr>
            <tr class="strong">
              <td>TOTAL</td>
              <td>{{ formatCurrency(this.totalDueForType('principal')) }}</td>
              <td>{{ formatCurrency(this.totalDueForType('interest')) }}</td>
              <td>{{ formatCurrency(this.totalDueForType('penalty')) }}</td>
              <td>{{ formatCurrency(this.totalDueForType('other')) }}</td>
              <td>{{ formatCurrency(this.balances.amountDue) }}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div class="row">
          <div class="small-24 columns medium-centered center">
            <!-- uncomment this to use the start-payment view again -->
            <!-- <router-link to="start-payment" class="button">Pay Now</router-link> -->
          </div>
        </div>
      </div><!-- end not-is-loading -->
    </div><!-- end small-24 columns -->
	</div><!-- end row -->
</template>

<script>
  import axios from 'axios';
  import accounting from 'accounting';
  import AddressSelector from '../components/AddressSelector';
  import SearchBar from '../components/SearchBar';
  import searchMethodsMixin from '../mixins/search-methods';
  import generateBillingXml from '../util/generate-billing-xml';

  const BALANCE_PARTS = [
    'principal',
    'interest',
    'penalty',
    'other',
  ];

	export default {
    // props: ['address', 'account'],
    mixins: [searchMethodsMixin],
    components: {
      AddressSelector,
      SearchBar,
    },
		data() {
			return {
        // ui stuff
        message: '',
        inputAddress: '',
        searchMethod: '',

        // addresses
        addressCandidates: [],
        address: {
          streetAddress: '',
          zipCode: '',
        },

        // balances response
        balances: {},
      };
		},
    created() {
      this.handleRouteChange(this.$route);
    },
    watch: {
      '$route': 'handleRouteChange',
    },
		computed: {
      subview() {
        if (this.hasMessage) {
          return 'message';
        } else if (this.hasAddressCandidates) {
          return 'address-selector';
        }
        return 'main';
      },
      hasMessage() {
        return this.message.length > 0;
      },
      hasAddressCandidates() {
        return this.addressCandidates.length > 1;
      },
      totalDue() {
        return this.balances.years.reduce((acc, year) => {
          const yearTotal = this.totalForYear(year);
          return acc + yearTotal;
        }, 0);
      },
      billingXml() {
        return generateBillingXml(this);
      },
		},
		methods: {
      handleRouteChange(route) {
        const { query = {} } = route;
        const { account, address } = query;

        if (account) {
          this.searchByAccount(account)
        } else if (address) {
          this.searchByAddress(address);
        } else {
          // TODO handle no query - navigate to start
        }
      },
			formatCurrency(amount) {
				return accounting.formatMoney(amount);
			},
      totalForYear(year) {
        const amounts = BALANCE_PARTS.map(part => year[part]);
        return amounts.reduce((acc, amount) => acc + amount, 0);
      },
      totalDueForType(type) {
        const { years = [] } = this.balances;

        return years.reduce((acc, year) => {
          return acc + year[type];
        }, 0);
      },
			// TODO all the popover stuff (this and css) should come out of here and
			// go into its own component.
			didClickPopoverLink(e) {
				this.$store.commit('setPopover', `<i class="fa fa-info-circle" aria-hidden="true"></i> <strong>SEQR</strong>: This charge has a tax lien that is in the Sequestration Program. For more information regarding the status of the sequestration proceedings, you may call 215-686-3629, or search the Philadelphia Court's civil docket at <a href="http://fjdefile.phila.gov/efsfjd/zk_fjd_public_qry_00.zp_disclaimer">Civil Docket Access</a>. You may enter the property owner's name in the Court’s “Caption” search box.`);
			},
		},
	};
</script>

<style>
	.call-to-action-panel {
		border: 1px solid #aaa;
		background: rgba(0, 0, 0, 0.04);
		float: left !important;
    padding: 1em;
	}

  .call-to-action-panel input[type="submit"] {
    margin: 1em;
  }

	.total-due-amount {
		font-size: 2.5em;
	}

	.total-due-date {
		font-size: 1.5em;
	}

	.popover-link {
		border-bottom: 1px dotted;
		font-weight: bold;
		color: #444;
	}
</style>
