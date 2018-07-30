<template>
<div class="wrapper">
  <div class="animated fadeIn">

    <b-card header="<i class='fa fa-building'></i><strong> Daftar Barang</strong> ">
      <p align='right'><strong>Barang </strong><a class='btn-sm btn-success' href='./addA' role='button'><i class ='fa fa-plus'></i></a> </p>

      <table class="table table-hover mt-3">
        <thead>
          <tr class="table-active">
            <th scope="col">ID</th>
            <th scope="col">Nama</th>
            <th scope="col">Deskripsi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="recipe in datag" 
          :key="recipe.id" 
          :nama="recipe.nama" 
          :id="recipe.id" 
          :deskripsi="recipe.deskripsi">
            <th scope="row">{{recipe.id}}</th>
            <td>{{recipe.nama}}</td>
            <td>{{recipe.deskripsi}}</td>
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
      process.env.myapi + "/graphql?query={barang{id,nama,deskripsi}}"
    );
    return{datag: data.data.barang }
  }
};
</script>

