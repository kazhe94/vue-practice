<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal
          v-if="modal"
          title="Создать заявку"
          @close="modal = false"
      >
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import RequestTable from "../components/request/RequestTable";
import {computed, ref, onMounted} from 'vue'
import AppModal from "../components/ui/AppModal";
import RequestModal from "../components/request/RequestModal";
import {useStore} from "vuex";
import AppLoader from "../components/ui/AppLoader";
import RequestFilter from "../components/request/RequestFilter";

export default {
  name: 'Home',
  components: {
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter
  },
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})

    onMounted( async ()=> {
      loading.value = true
      await store.dispatch('request/loadRequests')
      loading.value = false
    })

    const requests = computed(()=> {
      return store.getters['request/requests'].filter((r)=> {
        if(filter.value.name) {
         return r.name.includes(filter.value.name)
        }
        return r
      })
      .filter((r)=> {
        if(filter.value.status) {
          return r.status === filter.value.status
        }
        return r
      })
    })
    return {
      modal,
      requests,
      loading,
      filter
    }
  }
}
</script>
