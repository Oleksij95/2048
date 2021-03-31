<template>
  <div class="wrapper">

    <!-- <Menu v-if="gameStatus === 'menu'"/> -->
    <!-- <gameField v-if="gameStatus === 'new_game'"/> -->
    <gameField></gameField>
  </div>
</template>

<script>

import Menu from './components/menu'
import gameField from './components/gameField'

export default {
  name: 'App',
  components: {
    Menu,
    gameField
  },
  computed: {
    gameStatus () {
      return this.$store.getters.game_status
    }
  }
}
</script>

<style lang="scss">
body{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: rgb(250,248,239);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .wrapper{
    width: 530px;
    margin: auto;
  }
}
</style>
