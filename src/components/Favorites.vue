<template>
  <div class="container-fluid px-5">
    <h1 class="text-center m-5 display-3">Избранное</h1>
    <div class="row" v-if="data != []">
      <div class="col-lg-3 col-sm-12 border" v-for="data in data" :key=data.id>
        <img :src="data.cover_url" alt="cover" class="w-50 rounded mx-auto my-2 d-block">
        <p class="h5 my-2">{{ data.name }}</p>
        <p class="my-1"><span class="text-muted">Автор: </span>{{ data.author }}</p>
        <p class="my-1"><span class="text-muted">Издательство: </span>{{ data.publisher }}</p>
        <p class="my-1"><span class="text-muted">Год издания: </span>{{ data.publication_date }}</p>
        <p class="my-1"><span class="text-muted">Рейтинг: </span><button class="btn btn-outline-success"
            v-on:click="Rating(1,data.id)">+</button> {{ data.rating }}
          <button class="btn btn-outline-danger" v-on:click="Rating(-1,data.id)">-</button></p>
        <button class="my-2 btn btn-outline-danger" v-on:click="deleteFavorite(data.id)">Удалить из избранного</button>
      </div>
    </div>
    <div v-if="data = []" class="text-center">
    <p class="text-muted display-4">К сожелению вы не добавили ничего в избранное :(</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'favorites',
    data() {
      return {
        data: []
      }
    },
    created() {
      if (localStorage.favorites != null) {
        this.data = JSON.parse(localStorage.favorites)
        this.data = this.data.filter(a => a != null)
      }
    },
    methods: {
      Rating(score, id) {
        this.data[this.data.findIndex(el => el.id === id)].rating += score
      },
      deleteFavorite(id) {
        this.data.splice(this.data.findIndex(el => el.id === id), 1)
        localStorage.favorites = JSON.stringify(this.data)
        return 0;
      },
    }
  }
</script>

<style scoped>

</style>