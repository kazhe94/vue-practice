<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <h3>{{title}}</h3>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  emits: ['close'],
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>