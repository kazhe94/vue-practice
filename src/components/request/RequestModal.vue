<template>
  <form @click.prevent="onSubmit">
    <div class="form-control" :class="{invalid: nError}">
      <label for="name">ФИО</label>
      <input type="text" id="name" v-model="name" @blur="nBlur">
      <small v-if="nError">{{ nError }}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div class="form-control" :class="{invalid: sError}">
      <label for="sum">Сумма</label>
      <input type="number" id="sum" v-model.number="sum" @blur="sBlur">
      <small v-if="sError">{{ sError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершён</option>
        <option value="cancelled">Отменён</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать заявку</button>
  </form>
</template>

<script>

import {useRequestForm} from "../../use/request-form";
import {useStore} from "vuex";
export default {
  name: "RequestModal",
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()
    const submit = async (values)=> {
      await store.dispatch('request/create', values)
      emit('created')
    }
    return {
      ...useRequestForm(submit)
    }
  }
}
</script>

<style scoped>

</style>