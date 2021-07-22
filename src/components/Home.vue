<template>
  <div class="home">
  
    <div class="container">
    <h1 class="text-center m-5">Наши книги</h1>
      <div class="row">
        <div class="col-2 m-1 border d-block" v-for="data in data" :key=data.id>
          <img :src="data.cover_url" alt="cover" class="w-50 rounded mx-auto my-2 d-block">
          <p class="h5 my-2">{{ data.name }}</p>
          <p class="my-1"><span class="text-muted">Автор: </span>{{ data.author }}</p>
          <p class="my-1"><span class="text-muted">Издательство: </span>{{ data.publisher }}</p>
          <p class="my-1"><span class="text-muted">Год издания: </span>{{ data.publication_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        data: [],        
      }
    },
    mounted() {
      fetch("books.json")
        .then(response => response.json())
        .then(data => (this.data = data));
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>