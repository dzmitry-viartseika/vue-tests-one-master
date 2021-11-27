<template>
  <div>
    <p>Enter new value:</p>
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <hr/>
    <slot></slot>
    <hr/>
    <slot name="warning"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    otherValue: {
      type: Number,
      required: false
    },
  },
}
</script>
