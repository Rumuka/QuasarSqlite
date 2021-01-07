<template>
  <q-page>

        <p v-for="pessoa in pessoas"> {{pessoa.nome}}</p>

    <q-table
      title="Pessoas"
      :data="pessoas"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
    />


<!--    <h1 v-for="pessoa in pessoas">pessoas</h1>-->
<!--    <p v-for="pessoa in pessoas"> {{pessoa.nome}}</p>-->
  </q-page>
</template>

<script>
  import db from '../boot/sqlite'
  import {mapActions, mapState} from 'vuex'

  var lista = [];

  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM pessoas', [], function (tx, resultado) {
      var rows = resultado.rows;
      var tr = '';
      for (var i = 0; i < rows.length; i++) {
        lista[i] = {
          id: rows[i].id,
          nome: rows[i].nome,
          idade: rows[i].idade
        }
      }
    }, null);
  });

  export default {
    name: "list",
    data() {
      return {
        // pessoas: lista,
        initialPagination: {
          sortBy: 'desc',
          descending: false,
          page: 0,
          rowsPerPage: 5
          // rowsNumber: xx if getting data from a server
        },

        columns: [
          {
            name: 'id',
            required: true,
            label: 'ID',
            align: 'left',
            field: 'id',
            sortable: true
          },
          {name: 'nome', align: 'center', label: 'Nome', field: 'nome', sortable: true},
          {name: 'idade', label: 'Idade', field: 'idade', sortable: true}
        ],
      }
    },
    methods: {
      ...mapActions("pessoa",['getPessoas'])
    },
    beforeCreate() {
      // this.pessoas = lista;
      // this.getPessoas();
    },
    created() {
      this.getPessoas();

      console.log("a lista: ", this.pessoas)
    },
    computed: {
      ...mapState("pessoa",["pessoas"])
      // pessoas(){
      //   return lista;
      // }
    }
  }
</script>

<style scoped>

</style>
