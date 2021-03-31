import { createStore } from 'vuex'

export default createStore({
  state: {
    game_status: "menu",
    game_size: 4,
    best_score: 0,
    current_score: 0,
    close_position: []
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
    }
  },

  actions: {
    startNewGame({commit}, game_status) {
      commit('setGameStatus', game_status)
    },
    setPosition({commit}, position) {
      commit('setElPosition', position)
    },
    celarGame({commit}) {
      commit('resetGame')
    }
  },

  getters: {
    game_status: s => s.game_status,
    game_size: s => s.game_size,
    best_score: s => s.best_score,
    current_score: s => s.current_score,
    close_position: s => s.close_position
  },

  modules: {

  }

})
