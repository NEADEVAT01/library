<template>
  <div class="search">
    <Search/>
    <Popup/>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import Popup from '@/components/Popup.vue'

export default {
  name: 'search',
  components: {
    Search,
    Popup   
  }
}
</script>