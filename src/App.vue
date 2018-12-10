<template>
  <div>
    <!-- REVIEW should this go into index.html? -->
		<div class="row mtl mbm">
			<div class="columns">
        <router-view></router-view>
			</div>
		</div>

		<transition name="slide-fade" duration="2000">
			<popover :html="popover"
							 v-if="popover.length > 0"
			>
			</popover>
		</transition>
	</div>
</template>

<script>
  import Popover from './components/Popover.vue';
  
  export default {
    components: {
      Popover,
    },
    computed: {
      popover() {
				return this.$store.state.popover;
			},
    },
  };
</script>

<style>
  .strong {
		font-weight: bold;
	}

	.alt {
		text-transform: uppercase;
	}

  .back-link {
    padding-bottom: 2em;
    font-weight: normal !important;
  }
</style>
