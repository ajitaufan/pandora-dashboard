<template>
<div class="wrapper">
  <div class="animated fadeIn">

    <b-card header="<i class='fa fa-building'></i><strong> Daftar Barang</strong> ">
      <p align='right'>
      <nuxt-link class="btn-sm btn-success" :to="{path: './barang/add-barang'}">
        <span class="fa fa-plus"></span>
      </nuxt-link> </p>
      <table class="table table-hover mt-3">
        <thead>
          <tr class="table-active">
            <th scope="col">ID</th>
            <th scope="col">Nama</th>
            <th scope="col">SKU</th>
            <th scope="col">Deskripsi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="barang in datag" 
          :key="barang.id" 
          :nama="barang.nama" 
          :id="barang.id"
          :sku="barang.sku" 
          :deskripsi="barang.deskripsi">
            <th scope="row">{{barang.id}}</th>
            <td>{{barang.nama}}</td>
            <td>{{barang.sku}}</td>
            <td>{{barang.deskripsi}}</td>
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
      process.env.myapi + "/graphql?query={barang{id,nama,sku,deskripsi}}"
    );
    return { datag: data.data.barang };
  }
};
</script>

