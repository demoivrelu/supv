<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Chart</router-link> |
    <router-link to="/flow">Flow</router-link> |
    <router-link to="/anim">Anim</router-link> |
    <router-link to="/supv">SupV</router-link>
  </nav>
  <span class="iconfont icon-jixiebi"></span>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
