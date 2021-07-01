
    <template>
      <q-page class="">

      <div style="height: 500px; width: 100%">
        <div style="height: 200px; overflow: auto;">
          <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
          <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
          <button @click="showLongText">
            Toggle long popup
          </button>
          <button @click="showMap = !showMap">
            Toggle map
          </button>
        </div>
        <l-map
          v-if="showMap"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 80%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
<!--          <l-marker :lat-lng="withPopup">-->
<!--            <l-popup>-->
<!--              <div @click="innerClick">-->
<!--                INAGE-->
<!--                <p v-show="showParagraph">-->
<!--                  Instituto NAcional de Governo Electronico-->
<!--                </p>-->
<!--              </div>-->
<!--            </l-popup>-->
<!--          </l-marker>-->
          <l-marker  v-for="institution in institutions" :lat-lng="institution.latLng">
            <l-popup>
              <div @click="innerClick">
                {{ institution.name }}
                <p v-show="showParagraph">
                  Instituto NAcional de Alguma coisa
                </p>
              </div>
            </l-popup>
          </l-marker>
<!--          <l-marker :lat-lng="withTooltip">-->
<!--            <l-tooltip :options="{ permanent: true, interactive: true }">-->
<!--              <div @click="innerClick">-->
<!--                I am a tooltip-->
<!--                <p v-show="showParagraph">-->
<!--                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque-->
<!--                  sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.-->
<!--                  Donec finibus semper metus id malesuada.-->
<!--                </p>-->
<!--              </div>-->
<!--            </l-tooltip>-->
<!--          </l-marker>-->
        </l-map>
      </div>
      </q-page>
    </template>

    <script>
      import { latLng } from "leaflet";
      import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

      export default {
        name: "Example",
        components: {
          LMap,
          LTileLayer,
          LMarker,
          LPopup,
          LTooltip
        },
        data() {
          return {
            zoom: 13,
            center: latLng(-25.968583107412186, 32.57765489790811),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            withPopup: latLng(-25.968583107412186, 32.57765489790811),
            withPopup2: latLng(-25.970975189698915, 32.56606775551046),
            withTooltip: latLng(47.41422, -1.250482),
            currentZoom: 11.5,
            // currentCenter: latLng(47.41322, -1.219482),
            currentCenter: latLng(-25.968583107412186, 32.57765489790811),
            showParagraph: false,
            mapOptions: {
              zoomSnap: 0.5
            },
            showMap: true,
            institutions: {
              1: {
                latLng: latLng(-25.968583107412186, 32.57765489790811),
                name: "INAGE"
              },
              2: {
                latLng: latLng(-25.97101859384871, 32.56607848432902),
                name: "INATTER"
              },
            }
          };
        },
        methods: {
          zoomUpdate(zoom) {
            this.currentZoom = zoom;
          },
          centerUpdate(center) {
            this.currentCenter = center;
          },
          showLongText() {
            this.showParagraph = !this.showParagraph;
          },
          innerClick() {
            alert("Click!");
          }
        }
      };
    </script>


<!--<script>-->
<!--  import db from '../boot/sqlite'-->
<!--  import { Notify } from 'quasar'-->

<!--  import Vue from 'vue'-->
<!--  // import WebRTC from 'vue-webrtc'-->
<!--  // import WebRTC from 'vue-we'-->

<!--  // Vue.use(WebRTC)-->


<!--  export default {-->
<!--    name: "PageIndex",-->
<!--    data() {-->
<!--      return {-->
<!--        nome: null,-->
<!--        idade: null,-->
<!--        id: null,-->

<!--        accept: false-->
<!--      }-->
<!--    },-->
<!--    created() {-->
<!--      db.transaction(function (tx) {-->
<!--        tx.executeSql('CREATE TABLE pessoas (id Integer primary key autoincrement, nome TEXT, idade INTEGER)');-->
<!--      });-->
<!--      // db.transaction(function(tx) {-->
<!--      //   tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', ["Ernesto Argentina", 23],function (tx, resultado) {-->
<!--      //     console.log("Sqlite save: ", resultado)-->
<!--      //-->
<!--      //   });-->
<!--      //   console.log("Sqlite save: ", tx)-->
<!--      // })-->
<!--    }-->
<!--    ,-->

<!--    methods: {-->
<!--      onSubmit() {-->
<!--        // if (this.accept !== true) {-->
<!--        var nome = this.nome;-->
<!--        var idade = this.idade;-->
<!--        var id = this.id;-->
<!--        var reset = () => this.onReset();-->
<!--        db.transaction(function(tx) {-->
<!--          // tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', [nome,idade]);-->
<!--          if(id){-->
<!--              tx.executeSql('UPDATE pessoas SET nome=?, idade=? WHERE id=?', [nome,idade,id],null);-->
<!--              this.$q.notify({-->
<!--                color: 'green-4',-->
<!--                textColor: 'white',-->
<!--                icon: 'cloud_done',-->
<!--                message: 'Submitted'-->
<!--              })-->
<!--            }else{-->
<!--              tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', [nome,idade]);-->
<!--              // tx.executeSql('INSERT INTO pessoas (nome,idade) VALUES (?, ?)', ["Ernesto Argentina",23]);-->
<!--              // tx.executeSql('INSERT INTO pessoas ("Ernesto Argentina","23") VALUES (?, ?)');-->
<!--              // this.$q.notify({-->
<!--              //   color: 'green-4',-->
<!--              //   textColor: 'white',-->
<!--              //   icon: 'cloud_done',-->
<!--              //   message: 'Submitted'-->
<!--              // })-->
<!--              console.log("Sqlite save: ", tx)-->
<!--              Notify.create({-->
<!--                message: 'Danger, Will Robinson! Danger!',-->
<!--                icon: 'cloud_done',-->
<!--                color: 'green-4',-->
<!--                textColor: 'white',-->
<!--              })-->
<!--            reset()-->
<!--            }-->
<!--          });-->
<!--          // this.$q.notify({-->
<!--          //   color: 'red-5',-->
<!--          //   textColor: 'white',-->
<!--          //   icon: 'warning',-->
<!--          //   message: 'You need to accept the license and terms first'-->
<!--          // })-->
<!--        // } else {-->
<!--        //   this.$q.notify({-->
<!--        //     color: 'green-4',-->
<!--        //     textColor: 'white',-->
<!--        //     icon: 'cloud_done',-->
<!--        //     message: 'Submitted'-->
<!--        //   })-->
<!--        // }-->
<!--      },-->

<!--      onReset() {-->
<!--        this.nome = null-->
<!--        this.idade = null-->
<!--        this.accept = false-->
<!--      }-->
<!--    }-->
<!--  };-->
<!--</script>-->
