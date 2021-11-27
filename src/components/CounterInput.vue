<template>
  <div>
    <p>Enter new value:</p>
    <input
      type="text"
      :value="value"
      @input="$emit('change', $event.target.value)"
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
  // позволяет переопределить имя свойство и имя события которое мы используем
  model: {
    prop: 'value',
    event: 'change'
  },
}
</script>
