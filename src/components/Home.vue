<template>
  <div class="home">
    <div class="container-fluid px-5">
      <h1 class="text-center m-5">Наши книги</h1>
      <div class="text-center mb-3">
        <div>
          <p>Сортировка</p>
          <button v-on:click="Sort_year_desc" class="mx-1">Год ▼</button>
          <button v-on:click="Sort_year_asc" class="mx-1">Год ▲</button>
          <button v-on:click="Sort_name_desc" class="mx-1">Название ▼</button>
          <button v-on:click="Sort_name_asc" class="mx-1">Название ▲</button>
          <button v-on:click="Sort_rating_desc" class="mx-1">Рейтинг ▼</button>
          <button v-on:click="Sort_rating_asc" class="mx-1">Рейтинг ▲</button>
        </div>
        <div class="my-3">
          <p>Фильтры</p>
          <select v-model="filter.publisher" class="mx-2">
            <option v-for="publisher in publishers" :key=publisher>{{publisher}}</option>
          </select>
          <select v-model="filter.author" class="mx-2">
            <option v-for="author in authors" :key=author>{{author}}</option>
          </select>
          <select v-model="filter.year" class="mx-2">
            <option v-for="year in years" :key=year>{{year}}</option>
          </select>
          <button v-on:click="Filter">Поиск</button>
        </div>
        <button v-on:click="Default" v-if="hasFilters" class="mx-1">✖</button>
        <div class="d-flex justify-content-center my-3">
          <input class="form-control me-2 w-25" type="search" placeholder="Поиск по названию" aria-label="Search"
            v-model="searchRequest" v-on:keyup.enter="Search">
          <button class="btn btn-outline-primary" v-on:click="Search">Поиск</button>
        </div>
      </div>
      <div class="row" v-if="!search">
        <div class="col-lg-3 col-sm-12 border" v-for="data in data" :key=data.id>
          <img :src="data.cover_url" alt="cover" class="w-50 rounded mx-auto my-2 d-block">
          <p class="h5 my-2">{{ data.name }}</p>
          <p class="my-1"><span class="text-muted">Автор: </span>{{ data.author }}</p>
          <p class="my-1"><span class="text-muted">Издательство: </span>{{ data.publisher }}</p>
          <p class="my-1"><span class="text-muted">Год издания: </span>{{ data.publication_date }}</p>
          <p class="my-1"><span class="text-muted">Рейтинг: </span><button>+</button> {{ data.rating }}
            <button>-</button></p>
          <button class="my-2">В Избранное</button>
        </div>
      </div>
      <div class="row" v-if="search">
        <div class="col-3 border" v-for="searchResult in searchResult" :key=searchResult.id>
          <img :src="searchResult.cover_url" alt="cover" class="w-50 rounded mx-auto my-2 d-block">
          <p class="h5 my-2">{{ searchResult.name }}</p>
          <p class="my-1"><span class="text-muted">Автор: </span>{{ searchResult.author }}</p>
          <p class="my-1"><span class="text-muted">Издательство: </span>{{ searchResult.publisher }}</p>
          <p class="my-1"><span class="text-muted">Год издания: </span>{{ searchResult.publication_date }}</p>
          <p class="my-1"><span class="text-muted">Рейтинг: </span><button>+</button> {{ searchResult.rating }}
            <button>-</button></p>
          <button class="my-2">В Избранное</button>
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
        hasFilters: false,
        search: false,
        searchRequest: '',
        searchResult: [],
        years: [],
        publishers: [],
        authors: [],
        filter: []
      }
    },
    created() {
      fetch("books.json")
        .then(response => response.json())
        .then(data => (this.data = data));

    },
    beforeUpdate() {
      this.years = this.data.map(item => item.publication_date).sort((a, b) => a - b).filter((val, i, ar) => ar.indexOf(
        val) === i);
      this.publishers = this.data.map(item => item.publisher).sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }).filter((val, i, ar) => ar.indexOf(val) === i)
      this.authors = this.data.map(item => item.author).sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }).filter((val, i, ar) => ar.indexOf(val) === i)
    },
    methods: {
      Sort_year_asc() {
        this.data.sort((a, b) => a.publication_date - b.publication_date);
        this.hasFilters = true
      },
      Sort_year_desc() {
        this.data.sort((a, b) => b.publication_date - a.publication_date);
        this.hasFilters = true

      },
      Sort_name_asc() {
        this.data.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.hasFilters = true
      },
      Sort_name_desc() {
        this.data.sort(function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
        this.hasFilters = true
      },
      Sort_rating_asc() {
        this.data.sort((a, b) => a.rating - b.rating);
        this.hasFilters = true
      },
      Sort_rating_desc() {
        this.data.sort((a, b) => b.rating - a.rating);
        this.hasFilters = true
      },
      Sort_by_year() {
        this.searchResult = this.data.filter((a) => a.publication_date.includes(this.years))
        this.search = true
        this.hasFilters = true
      },
      Search() {
        if (this.searchRequest != '') {
          this.searchResult = this.data.filter((a) => a.name.toLowerCase().includes(this.searchRequest.toLowerCase()));
          this.search = true
          this.hasFilters = true
        }
      },
      Filter() {
         this.searchResult = this.data
        if  (this.filter.publisher != null) {
          this.searchResult = this.searchResult.filter((a) => a.publisher.includes(this.filter.publisher))
        } 
        if  (this.filter.author != null) {
          this.searchResult = this.searchResult.filter((a) => a.author.includes(this.filter.author))
        } 
        if  (this.filter.year != null) {
          this.searchResult = this.searchResult.filter((a) => a.publication_date.includes(this.filter.year))
        } 

        this.search = true
        this.hasFilters = true
      },
      Default() {
        fetch("books.json")
          .then(response => response.json())
          .then(data => (this.data = data));
        this.searchRequest = ""
        this.hasFilters = false
        this.search = false
        this.filter = []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>