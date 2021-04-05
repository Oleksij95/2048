import { createStore } from 'vuex'

export default createStore({
  state: {
    game_status: "menu",
    game_size: 4,
    game_theme: 'white',
    best_score: 0,
    current_score: 0,
    close_position: [],
  },

  mutations: {
    setGameStatus(state, new_status) {
      state.game_status = new_status
    },
    setElPosition(state, position) {
      state.close_position.push(position)
    },
    resetGame(state) {
      state.close_position = [],
      state.current_score = 0
    },
    changeELPosition(state, value){
      state.close_position = value
    },
    setCurrentScore(state, score) {
      state.current_score += score
    },
    setBestScore(state, best_score) {
      state.best_score = best_score
    },
    setElements(state, elements){
      state.close_position = [];
      state.close_position = elements
    },
    setGame(state, game){
      state.current_score = game.score
      state.best_score = game.best_score
    },
    setGameTheme(state, theme){
      state.game_theme = theme
    }
  },

  actions: {
    setGameStatus({commit}, game_status) {
      commit('setGameStatus', game_status)
    },
    setPosition({commit}, position) {
      commit('setElPosition', position)
    },
    celarGame({commit}) {
      commit('resetGame')
    },
    setNewStateElements({commit}, elements_array) {
      commit('setElements', elements_array)
    },
    setSaveGame({commit}, game) {
      commit('setGame', game)
    },
    changeGameTheme({commit}, theme){
      commit('setGameTheme', theme)
    }
  },

  getters: {
    game_status: s => s.game_status,
    game_size: s => s.game_size,
    game_theme: s => s.game_theme,
    best_score: s => s.best_score,
    current_score: s => s.current_score,
    close_position: s => s.close_position,
  },

  modules: {

  }

})
