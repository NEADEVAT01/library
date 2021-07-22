<template> 
  <nav class="navbar navbar-expand-md navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand"><img src="@\assets\logo.png" alt="logo" class="m-1 navbar-brand"></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link active">Главная</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/favorites" class="nav-link active">Избранное</router-link>
        </li> 
        <li class="nav-item">
          <router-link to="/search" class="nav-link active">Поиск</router-link>
        </li>        
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Поиск по названию" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Поиск</button>
      </form>
    </div>
  </div>
</nav>
  <router-view />
</template>

<style scoped>
  img {
    height: 100px;
  }
  .nav-link {
    font-size: 1.5em;
  }
</style>