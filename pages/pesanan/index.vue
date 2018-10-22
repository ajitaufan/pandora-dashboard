<template>
  <div v-if="pesanan" class="wrapper">
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
              <th style="width:10%">
                <center>Actions</center>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="p in pesanan" 
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
                <div v-if='p.status.status=="Ordering"'>
                  <h4><b-badge variant="danger">{{p.status.status}} </b-badge>
                    <b-dropdown variant="link" size="sm" no-caret>
                      <template slot="button-content">
                        <i class="icon-pencil"></i>
                      </template>
                      <div role="group" aria-lableledby="header1">
                        <b-dropdown-header id="header1">Ubah Status</b-dropdown-header>
                        <b-dropdown-item @click="onConfirmed(p)">Confirmed</b-dropdown-item>
                        <b-dropdown-item @click="onShipping(p)">Shipping</b-dropdown-item>
                        <b-dropdown-item @click="onDone(p)">Done</b-dropdown-item>
                      </div>
                    </b-dropdown>
                  </h4>
                  Tgl Ubah Status: 
                  <br>{{p.status.tanggal}}
                </div>
                <div v-if='p.status.status=="Confirmed"'>
                  <h4><b-badge variant="secondary">{{p.status.status}} </b-badge>
                    <b-dropdown variant="link" size="sm" no-caret>
                      <template slot="button-content">
                        <i class="icon-pencil"></i>
                      </template>
                      <div role="group" aria-lableledby="header1">
                        <b-dropdown-header id="header1">Ubah Status</b-dropdown-header>
                        <b-dropdown-item @click="onShipping(p)">Shipping</b-dropdown-item>
                        <b-dropdown-item @click="onDone(p)">Done</b-dropdown-item>
                      </div>
                    </b-dropdown>
                  </h4> 
                  Tgl Ubah Status: 
                  <br>{{p.status.tanggal}}
                </div>
                <div v-if='p.status.status=="Shipping"'>
                  <h4><b-badge variant="warning">{{p.status.status}} </b-badge>
                    <b-dropdown variant="link" size="sm" no-caret>
                      <template slot="button-content">
                        <i class="icon-pencil"></i>
                      </template>
                      <div role="group" aria-lableledby="header1">
                        <b-dropdown-header id="header1">Ubah Status</b-dropdown-header>
                        <b-dropdown-item @click="onDone(p)">Done</b-dropdown-item>
                      </div>
                    </b-dropdown>
                  </h4>
                  Tgl Ubah Status: 
                  <br>{{p.status.tanggal}}
                </div>
                <div v-if='p.status.status=="Done"'>
                  <h4><b-badge variant="success">{{p.status.status}} </b-badge></h4>
                  Tgl Ubah Status: 
                  <br>{{p.status.tanggal}}
                </div>
              </td>
              <td>Rp. {{p.total}} </td>
              <td>
                <center>
                  <nuxt-link class="btn btn-sm btn-primary" style="margin-right:3px" :to="{name: 'pesanan-id-detail', params: {id: p.id}}">Detail Pesanan</nuxt-link>
                </center>
              </td>
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
    return { pesanan: null };
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
            "/graphql?query=query { pesananHeader{ id nomor total tanggal status{ status tanggal } user{ nama id username } } }"
        )
        .then(function(result) {
          vm.pesanan = result.data.data.pesananHeader;
        });
    },
    onConfirmed(params) {
      if (confirm("Ubah status pesanan?")) {
        axios
          .post(
            process.env.myapi +
              '/graphql?query=mutation{ updateStatus(status:"Confirmed",id_pesanan_header:' +
              params.id +
              "){ id } }"
          )
          .then(res => window.location.reload(true))
          .catch(function(error) {
            console.log(error);
          });
      } else {
        // /graphiql?query=mutation{ updateStatus(status:"",id_pesanan_header:){ id } }
      }
    },
    onShipping(params) {
      if (confirm("Ubah status pesanan?")) {
        axios
          .post(
            process.env.myapi +
              '/graphql?query=mutation{ updateStatus(status:"Shipping",id_pesanan_header:' +
              params.id +
              "){ id } }"
          )
          .then(res => window.location.reload(true))
          .catch(function(error) {
            console.log(error);
          });
      } else {
      }
    },
    onDone(params) {
      if (confirm("Ubah status pesanan?")) {
        axios
          .post(
            process.env.myapi +
              '/graphql?query=mutation{ updateStatus(status:"Done",id_pesanan_header:' +
              params.id +
              "){ id } }"
          )
          .then(res => window.location.reload(true))
          .catch(function(error) {
            console.log(error);
          });
      } else {
      }
    }
  }
  //
};
</script>