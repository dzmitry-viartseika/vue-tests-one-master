<template>
  <div>
    <p>Enter new value:</p>
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
