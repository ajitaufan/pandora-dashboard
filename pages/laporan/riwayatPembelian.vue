<template>
  <div v-if="pesanand" class="wrapper">
    <div class="animated fadeIn">

      <b-card header="<i class='fa fa-handshake-o'></i><strong> Daftar Pesanan</strong> ">
        <table class="table table-hover mt-3">
          <thead>
            <tr class="table-secondary">
              <th scope="col">ID</th>
              <th style="width:15%" scope="col">Pemesan</th>
              <th scope="col">Nomor</th>
              <th scope="col">Tgl Pesanan</th>
              <th scope="col">Status</th>
              <th scope="col">Harga Total</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="p in pesanand" 
            :key="p.id" 
            :nama="p.nama" 
            :id="p.id">
              <th scope="row">{{p.id}}</th>
              <td><strong>Nama: </strong> {{p.user.nama}} <br>
                  Username: {{p.user.username}}
              </td>
              <td>{{p.nomor}}</td>
              <td>{{p.tanggal}}</td>
              <td>
                <div v-if='p.status.status=="Done"'>
                  <h4><b-badge variant="success">{{p.status.status}} </b-badge></h4>
                  Tgl Ubah Status: 
                  <br>{{p.status.tanggal}}
                </div>
              </td>
              <td>Rp. {{p.total}} </td>
            </tr>
          </tbody>
        </table>
      </b-card>

    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return { pesanand: null };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    fetch() {
      let vm = this;
      axios
        .get(
          process.env.myapi +
            "/graphql?query=query{ pesananHeaderDone{ id nomor total tanggal status{ status tanggal } user{ id nama username } } }"
        )
        .then(function(result) {
          vm.pesanand = result.data.data.pesananHeaderDone;
        });
    }
  }
  //
};
</script>