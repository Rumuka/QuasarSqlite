<template>
  <q-page class="">
<!--    <div class="text-center">-->

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md full-width"
      >
        <q-input hidden v-model="id"></q-input>
        <q-input
          filled
          v-model="nome"
          label="Seu nome *"
          hint="Nome e apelido"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="idade"
          label="Tua idade *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms"/>

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>


<!--    </div>-->
  </q-page>
</template>

<script>
  import db from '../boot/sqlite'
  import { Notify } from 'quasar'

  import Vue from 'vue'
  // import WebRTC from 'vue-webrtc'
  // import WebRTC from 'vue-we'

  // Vue.use(WebRTC)


  export default {
    name: "PageIndex",
    data() {
      return {
        nome: null,
        idade: null,
        id: null,

        accept: false
      }
    },
    created() {
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE pessoas (id Integer primary key autoincrement, nome TEXT, idade INTEGER)');
      });
      // db.transaction(function(tx) {
      //   tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', ["Ernesto Argentina", 23],function (tx, resultado) {
      //     console.log("Sqlite save: ", resultado)
      //
      //   });
      //   console.log("Sqlite save: ", tx)
      // })
    }
    ,

    methods: {
      onSubmit() {
        // if (this.accept !== true) {
        var nome = this.nome;
        var idade = this.idade;
        var id = this.id;
        var reset = () => this.onReset();
        db.transaction(function(tx) {
          // tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', [nome,idade]);
          if(id){
              tx.executeSql('UPDATE pessoas SET nome=?, idade=? WHERE id=?', [nome,idade,id],null);
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
              })
            }else{
              tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', [nome,idade]);
              // tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', ["Ernesto Argentina",23]);
              // tx.executeSql('INSERT INTO pessoas ("Ernesto Argentina","23") VALUES (?, ?)');
              // this.$q.notify({
              //   color: 'green-4',
              //   textColor: 'white',
              //   icon: 'cloud_done',
              //   message: 'Submitted'
              // })
              console.log("Sqlite save: ", tx)
              Notify.create({
                message: 'Danger, Will Robinson! Danger!',
                icon: 'cloud_done',
                color: 'green-4',
                textColor: 'white',
              })
            reset()
            }
          });
          // this.$q.notify({
          //   color: 'red-5',
          //   textColor: 'white',
          //   icon: 'warning',
          //   message: 'You need to accept the license and terms first'
          // })
        // } else {
        //   this.$q.notify({
        //     color: 'green-4',
        //     textColor: 'white',
        //     icon: 'cloud_done',
        //     message: 'Submitted'
        //   })
        // }
      },

      onReset() {
        this.nome = null
        this.idade = null
        this.accept = false
      }
    }
  };
</script>
