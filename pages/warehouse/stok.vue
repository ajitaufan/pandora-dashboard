<template>
<div class="wrapper">
  <div class="animated fadeIn">
    <b-card header="<i class='fa fa-building'></i><strong> Daftar Stok</strong> ">
    <p align='right'><a class='btn-sm btn-success' href='./addA' role='button'><i class ='fa fa-plus'></i></a> </p>
    <table class="table table-hover">
      <thead>
        <tr class="table-active">
          <th scope="col">ID Stok</th>
          <th scope="col">Nama Barang</th>
          <th scope="col">Nomor</th>
          <th scope="col">Jenis</th>
          <th scope="col">Tanggal</th>
          <th scope="col">Nama Gudang</th>
          <th scope="col">Kuantitas</th>
          <th scope="col">Satuan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stok in data" :key="stok.id">
          <th scope="row"  > {{stok.stokHeader.id}}</th>
          <td>{{stok.barang.nama}}</td>
          <td>{{stok.stokHeader.nomor}}</td>
          <td>{{stok.stokHeader.jenis}}</td>
          <td>{{stok.stokHeader.tanggal}}</td>
          <td>{{stok.stokHeader.gudang.nama}}</td>
          <td>{{stok.kuantitas}}</td>
          <td>{{stok.satuan}}</td>
        </tr>
      </tbody>
    </table> 
    </b-card>
  </div>
</div>
</template>


<script>

import axios from "axios"

export default {

    async asyncData() {
    const { data } = await axios.get(
      "http://53f86dad.ngrok.io/graphql?query=%7B%0A%20%20stokDetail%20%7B%0A%20%20%20%20id_stok_header%0A%20%20%20%20id_barang%0A%20%20%20%20satuan%0A%20%20%20%20kuantitas%0A%20%20%20%20stokHeader%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20jenis%0A%20%20%20%20%20%20tanggal%0A%20%20%20%20%20%20nomor%0A%20%20%20%20%09gudang%7B%0A%20%20%20%20%20%20%20%20nama%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20barang%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20nama%0A%20%20%20%20%20%20deskripsi%0A%20%20%20%20%20%20sku%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A"
    );
    return{data: data.data.stokDetail }
  }
};
</script>