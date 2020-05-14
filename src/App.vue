<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <Button>lees verder</Button>
      </div>
      <div class="col-md-6">
        <Button
          type="bordered"
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
