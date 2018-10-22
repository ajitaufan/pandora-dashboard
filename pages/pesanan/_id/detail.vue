<template>
  <div v-if="header" class="wrapper">
    <div class="animated fadein">
      <b-card header="<i class='fa fa-address-card'></i><strong> Pesanan Detail</strong>"> 
      <div> 
        <div class="row">
          <h2 class="col-lg-6"><Strong>Pesanan a.n. {{header.user.nama}}</Strong></h2> 
          <h2 class="col-lg-6">
            <div class="float-md-right"> 
              <div v-if='header.status.status=="Ordering"'>
                <b-badge variant="danger">{{header.status.status}} </b-badge>
              </div>
              <div v-if='header.status.status=="Confirmed"'>
                <b-badge variant="secondary">{{header.status.status}} </b-badge>
              </div>
              <div v-if='header.status.status=="Shipping"'>
                <b-badge variant="warning">{{header.status.status}} </b-badge>
              </div>
              <div v-if='header.status.status=="Done"'>
                <b-badge variant="success">{{header.status.status}} </b-badge>
              </div>
            </div>
          </h2>
        </div>
        <h6>(nomor: {{header.nomor}})</h6>
        <h6>Tanggal Pesanan: {{header.tanggal}}</h6>
        <h6>Ongkos Kirim: Rp {{header.ongkos_kirim}} </h6>
        <h6>Pembayaran <strong>Rp {{header.total}}</strong></h6> <br>
      </div>

        <h5><strong>Detail Pesanan</strong></h5>
        <table class="table table-hover">
          <thead>
            <tr class="table-active">
              <th scope="col">ID</th>
              <th scope="col">SKU</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Harga Barang</th>
            </tr>
          </thead>
          <tbody v-if="header">
            <tr v-for="pd in header.pesananDetail" :key="pd.id">              
              <th scope="row"> {{pd.id}}</th>
              <td>{{pd.sku}}</td>
              <td>{{pd.jumlah_barang}} </td>
              <td>
                <div v-if="pd.harga_promo==0"> {{ "Rp. "+ pd.harga }} </div>
                <div v-else>Rp. {{ pd.harga_promo }} </div>
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
    return {
      id: this.$route.params.id,
      header: null,
      detail: null
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch(id) {
      let vm = this;
      axios
        .get(
          process.env.myapi +
            "/graphql?query=query { pesananHeader(id:" +
            vm.id +
            "){ id nomor total tanggal ongkos_kirim status{ status tanggal } pesananDetail{ id sku jumlah_barang harga harga_promo } user{ nama } } }"
        )
        .then(function(result) {
          vm.header = result.data.data.pesananHeader[0];
        });
    }
  }
};
</script>
