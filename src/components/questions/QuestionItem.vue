<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{question.title}}</div>
    <div class="question-body" v-show="isOpen">{{question.text}}</div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "QuestionItem",
  props: ['question'],
  setup() {
    const isOpen = ref(false)

    return {
      isOpen
    }
  }
}
</script>

<style scoped>

</style>