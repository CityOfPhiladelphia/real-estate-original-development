<template>
  <header>
    <div class="hero-content" :style="heroStyle">
      <div class="hero-wrap">
        <div class="row expanded pvxl">
          <div class="medium-14 small-centered columns text-overlay">
            <h1><slot/></h1>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    heroStyle () {
      return this.img ? `background-image: url(${this.img})` : ''
    }
  }
}
</script>
