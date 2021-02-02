<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Заявка" v-else-if="request">
    <p><strong>Имя владельца: </strong>{{request.name}}</p>
    <p><strong>Телефон владельца:</strong> {{request.phone}}</p>
    <p><strong>Сумма заявки:</strong> {{currency(request.sum)}}</p>
    <p><strong>Статус:</strong> <app-status :type="request.status"></app-status></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="removeRequest">Удалить</button>
    <button class="btn primary" @click="update" v-if="isUpdated">Обновить</button>
  </app-page>
  <h3 class="text-white text-center" v-else>Заявки с ID {{$route.params.id}} нет</h3>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted, computed, watch} from "vue";
import {useStore} from "vuex";
import AppLoader from "../components/ui/AppLoader";
import AppStatus from "../components/ui/AppStatus";
import {currency} from "../utils/currency";


export default {
  name: "Request",
  components: {
    AppPage,
    AppLoader,
    AppStatus
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const request = ref()
    const status = ref()

    onMounted(async ()=> {
      request.value = await store.dispatch('request/loadOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const isUpdated = computed(()=> {
      return request.value.status !== status.value
    })

    const removeRequest = async ()=> {
        await store.dispatch('request/remove', route.params.id)
        router.push('/')
    }

    const update = async ()=> {
      const newStatus = request.value.status = status.value
      const data = {...request.value, status: newStatus, id: route.params.id}
      await store.dispatch('request/update', data)
    }

    watch(request, value => console.log(value.status))

    return {
      loading,
      request,
      status,
      currency,
      update,
      removeRequest,
      isUpdated
    }
  }
}
</script>

<style scoped>

</style>