<template>
  <div>
    <p>Enter new value:</p>
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
  },
}
</script>
