<template>
  <app-page back title="Помощь">
    <question-item
        v-for="q in questions"
        :question="q"
        :key="q.title"
    ></question-item>
  </app-page>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import QuestionItem from "../components/questions/QuestionItem";
import {ref} from 'vue'

export default {
  components: {
    AppPage,
    QuestionItem
  },
  setup() {
    const questions = [
      {title: 'Что есть в данной системе?', text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'},
      {title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase'}
    ]
    return {
      questions
    }
  }
}
</script>

<style scoped>

</style>
