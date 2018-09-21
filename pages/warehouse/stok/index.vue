<template>
<div class="wrapper">
  <div class="animated fadeIn">
    <b-card header="<i class='fa fa-archive'></i><strong> Daftar Stok Barang</strong> ">
    <p align='right'>
      <nuxt-link class="btn btn-sm btn-success btn" :to="{path: './stok/add-stok'}">
        <span class="fa fa-plus"></span>
        Tambah Stok Header
      </nuxt-link>
    </p>
    <table class="table table-hover">
      <thead>
        <tr class="table-active">
          <th scope="col">ID Stok</th>
          <th scope="col">Nomor</th>
          <th scope="col">Jenis</th>
          <th scope="col">Tanggal</th>
          <th scope="col">Nama Gudang</th>
          <th style="width:15%">
            <center>Actions</center>
          </th>          
        </tr>
      </thead>
      <tbody>
        <tr v-for="stokh in data" :key="stokh.id">
          <th scope="row"  > {{stokh.id}}</th>
          <td>{{stokh.nomor}}</td>
          <td>{{stokh.jenis}}</td>
          <td>{{stokh.tanggal}}</td>
          <td>{{stokh.gudang.nama}}</td>
          <td> 
            <center>
              <nuxt-link class="btn btn-sm btn-primary" :to="{name: 'warehouse-stok-id-detail', 
              params: {id: stokh.id}}">Detail Stok</nuxt-link>
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
  async asyncData() {
    const { data } = await axios.get(
      process.env.myapi +
        "/graphql?query=query{stokHeader{id,nomor,jenis,tanggal,gudang{nama}}}"
    );
    return { data: data.data.stokHeader };
    console.log(data);
  }
};
</script>