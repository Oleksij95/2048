<template>
  <div class="wrapper">
    <menuIcon v-if="gameStatus !== 'menu'" />

    <Menu v-if="gameStatus === 'menu'" />
    <gameField v-if="gameStatus === 'new_game' || gameStatus === 'continue_game'" />
    <Record v-if="gameStatus === 'record'"/>
    <About v-if="gameStatus === 'about'" />
    <!-- <gameField></gameField> -->
  </div>
</template>

<script>

import menuIcon from './components/menuIcon'
import Menu from './components/menu'
import gameField from './components/gameField'
import Record from './components/record'
import About from './components/about'


export default {
  name: 'App',
  components: {
    Menu,
    gameField,
    Record,
    menuIcon,
    About
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
