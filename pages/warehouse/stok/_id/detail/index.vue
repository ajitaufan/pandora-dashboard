<template>
<div v-if="datash" class="wrapper">
  <div class="animated fadeIn">
    <b-card header="<i class='fa fa-archive'></i><strong> Daftar Stok Detail Barang</strong> ">
    <div> 
      <div class="row">
        <h2 class="col-lg-6"><Strong>Stok {{stokh.id}}</Strong></h2> 
        <h2 class="col-lg-6"><div class="float-md-right"> (nomor: {{datash.nomor}})</div></h2>
      </div>
      <h6>Jenis: {{datash.jenis}}</h6>
      <h6>Tanggal terdaftar: {{datash.tanggal}}</h6>
      <h6>Terdapat di gudang <strong>{{datash.gudang.nama}}</strong></h6>
      <p align='right'>
        <nuxt-link class="btn btn-sm btn-success btn" :to="{path: './detail/add-barang-stok', params:{id: stokh.id}}">
        <span class="fa fa-plus"></span>
        Tambah Kuantitas
        </nuxt-link>  
      </p>
    </div>
    
      <table class="table table-hover">
        <thead>
          <tr class="table-active">
            <th scope="col">ID</th>
            <th scope="col">Gambar</th>
            <th scope="col">Nama Barang</th>
            <th scope="col">SKU</th>
            <th scope="col">Kuantitas</th>
            <th scope="col">Satuan</th>
            <th style="width:15%">
              <center>Actions</center>
            </th>   
          </tr>
        </thead>
        <tbody v-if="datash">
          <tr v-for="stok in datash.stokDetail" :key="stok.id">
            <th scope="row"  > {{stok.id}}</th>
            <td><img class="img" :src="stok.barang.image[0].thumbnail"></td>
            <td>{{stok.barang.nama}} </td>
            <td>{{stok.barang.sku}}</td>
            <td>{{stok.kuantitas}}</td>
            <td>{{stok.satuan}}</td>
            <td> 
            <center>
              <nuxt-link class="btn btn-sm btn-warning" :to="{name: 'warehouse-stok-id-detail-editKuantitas', 
              params: {id: stokh.id, stok:stok}}">Ubah Kuantitas</nuxt-link>
            </center>
          </td>
          </tr>
        </tbody>
        <tbody >
          
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
      stokh: {
        id: this.$route.params.id
      },
      datash: null
    };
  },
  mounted(stokh) {
    axios
      .get(
        process.env.myapi +
          "/graphql?query=query{stokHeader(id:" +
          this.stokh.id +
          "){ nomor jenis tanggal gudang{ id nama } stokDetail{ id_barang id_stok_header id satuan kuantitas barang{ id nama sku image{thumbnail}} } } }"
      )
      .then(res => (this.datash = res.data.data.stokHeader[0]));
  }
};
</script>

<style scoped>
.img {
  height: 60px;
  width: 60px;
}
</style>