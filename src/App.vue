<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { defineComponent, ref } from '@vue/composition-api';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data()
    {
    return{

    }
  }
}
</script>
