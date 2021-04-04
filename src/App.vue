<template>
  <div class="main_wrapper" :class="this.gameTheme + '_theme'">
    <div class="wrapper">
      <menuIcon v-if="gameStatus !== 'menu'" />

      <Menu v-if="gameStatus === 'menu'" />
      <gameField v-if="gameStatus === 'new_game' || gameStatus === 'continue_game'" />
      <Record v-if="gameStatus === 'record'"/>
      <About v-if="gameStatus === 'about'" />
      <Settings v-if="gameStatus === 'settings'" />
    </div>
  </div>
</template>

<script>

import menuIcon from './components/menuIcon'
import Menu from './components/menu'
import gameField from './components/gameField'
import Record from './components/record'
import About from './components/about'
import Settings from './components/settings'


export default {
  name: 'App',
  components: {
    Menu,
    gameField,
    Record,
    menuIcon,
    About,
    Settings
  },
  computed: {
    gameStatus () {
      return this.$store.getters.game_status
    },
    gameTheme() {
      return this.$store.getters.game_theme
    }
  }
}
</script>

<style lang="scss">
body{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main_wrapper{
  background: rgb(250,248,239);
  height: 100vh;
  box-sizing: border-box;
  padding-top: 25px;
  transition: all .25s;
  &.black_theme{
    background: #252525;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .wrapper{
    width: 530px;
    margin: auto;
    padding: 0 15px;
  }
}
</style>
