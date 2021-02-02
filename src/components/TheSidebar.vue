<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>
    <div class="sidebar-content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aut dolores fugiat ipsam laudantium nemo obcaecati omnis sed sit. At atque est minus nobis placeat sunt tempore. Asperiores aspernatur at culpa dolore ea eaque eos, inventore iusto magni mollitia nemo nihil provident quisquam, reiciendis sequi, ut voluptas voluptate voluptates.</p>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "TheSidebar",
  setup() {
    const store = useStore()
    const sidebar = computed(()=> store.state.sidebar)

    return {
      sidebar,
      close: ()=> store.commit('closeSidebar')
    }
  }
}
</script>

<style scoped>

</style>