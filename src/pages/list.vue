<template>
  <q-page>

    <!--        <p v-for="pessoa in pessoas"> {{pessoa.nome}}</p>-->

    <q-table
      title="Pessoas"
      :data="pessoas"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
    />

    <q-btn @click="print_pdf()"> Imprimir </q-btn>

    <div style="display: none">
      <div id="pdf">
        <table>
          <thead>
          <tr>
            <td>Nome</td>
            <td>Idade</td>
          </tr>
          </thead>
          <tbody>
          <template  v-if="pessoas.length != 0">
<!--            {{pessoas}}-->

            <tr v-for="pessoa in pessoas">
              <template v-if="pessoa != null">
                              <td>{{pessoa.nome}}</td>
                              <td>{{pessoa.idade}}</td>
              </template>

            </tr>
          </template>
          </tbody>
        </table>
      </div>

    </div>


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
      ...mapActions("pessoa", ['getPessoas']),
      print_pdf(){
        var documento = document.getElementById("pdf").innerHTML
        var janela = window.open("","","width=800,height=600")
        janela.document.write("<html><header><title>PDF</title></header><body>")
        janela.document.write(documento)
        janela.document.write("</body></html>")
        janela.document.close()
        janela.print()
      }
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
      ...mapState("pessoa", ["pessoas"])
      // pessoas(){
      //   return lista;
      // }
    },
    watch: {
      pessoas(){

      }
    }
  }
</script>

<style scoped>

</style>
