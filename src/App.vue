<template>
  <div class="app">
    <CounterInput
      v-model="counter"
      Current value of
    >
      Current value of counter2 is {{ counter2 }}
      <template #warning>
        BETA
      </template>
    </CounterInput>
    {{ counter }} / {{ counter2 }}
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
    <button
      v-if="counter < 0"
      @click="counter = 0"
      data-test-id="reset"
      class="button button_reset"
    >
      Reset
    </button>
    <hr>
    <button
      class="button button_plus2"
      @click="counter2++"
    >
      +
    </button>
    <button
      class="button button_minus2"
      @click="counter2--"
    >
      -
    </button>
  </div>
</template>

<script>

import CounterInput from './components/CounterInput';

export default {
  name: 'App',
  components: { CounterInput },
  props: {
    initialValue: {
      type: Number,
      default: 0,
    }
  },
  watch: {
    initialValue: {
      immediate: true,
      handler(newValue) {
        this.counter = newValue;
      }
    }
  },
  data() {
    return {
      counter: 0,
      counter2: 0
    };
  },
  methods: {
    handleKeyPress(e) {
      if (e.key === '-') {
        this.counter -= 1;
      }
      if (e.key === '+') {
        this.counter += 1;
      }
    }
  },
  mounted() {
    document.addEventListener(('keyup'),  this.handleKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener(('keyup'),  this.handleKeyPress);
  }
};
</script>
