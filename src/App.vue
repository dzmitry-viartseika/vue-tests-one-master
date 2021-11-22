<template>
  <div class="app">
    {{ counter }}
    <button
      class="button button_plus"
      @click="counter++"
    >
      +
    </button>
    <button
      class="button button_minus"
      @click="counter--"
    >
      -
    </button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      counter: 0,
    }
  }
};
</script>
