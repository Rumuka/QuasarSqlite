import db from '../../boot/sqlite'
import Vue from 'vue'


const state = {
  pessoas: [],

}

const mutations = {
  addPessoa(state, payload) {
    Vue.set(state.pessoas, payload.id, payload.object)
  },

}

const actions = {
  getPessoas({commit,state}){
    console.log("Chegou ao actions")
    // var lista = [];

    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM pessoas', [], function (tx, resultado) {
        var rows = resultado.rows;
        console.log("A lisat: ", rows)
        for (var i = 0; i < rows.length; i++) {
          commit('addPessoa', {
            id: rows[i].id,
            object: {
              id: rows[i].id,
              nome: rows[i].nome,
              idade: rows[i].idade
            }
          })
          // lista[i] = {
          //   id: rows[i].id,
          //   nome: rows[i].nome,
          //   idade: rows[i].idade
          // }
        }
      }, null);
    });

  }

}
//
// const getters = {
//
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters
}
