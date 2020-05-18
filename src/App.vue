<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <Button icon="arrow">lees verder</Button>
      </div>
      <div class="col-md-6">
        <Button
          as="div"
          class="extra--class"
          type="bordered"
          href="#"
          target="_blank"
          icon="arrow"
        >
          bekijk meer nieuws
        </Button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <Button
          type="anchor"
          icon="arrow"
        >
          Lees verder
        </Button>
      </div>
      <div class="col-md-6">
        <Button
          type="anchor"
          href="#"
        >
          bekijk meer nieuws
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './components/Button.vue';

export default {
  name: 'App',

  components: { Button },
};
</script>

<style scoped>
  .row {
    margin-top: 50px;
  }
</style>
