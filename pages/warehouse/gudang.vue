<template>
<div class="wrapper">
  <div class="animated fadeIn">

    <b-card header="<i class='fa fa-building'></i><strong> Daftar Gudang</strong> ">
      <p align='right'><strong>Gudang </strong><a class='btn-sm btn-success' href='./addA' role='button'><i class ='fa fa-plus'></i></a> </p>

      <table class="table table-hover mt-3">
        <thead>
          <tr class="table-active">
            <th scope="col">ID</th>
            <th scope="col">Nama</th>
            <th scope="col">Alamat</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="recipe in datag" :key="recipe.id" :nama="recipe.nama" :id="recipe.id" :alamat="recipe.alamat">
            <th scope="row">{{recipe.id}}</th>
            <td>{{recipe.nama}}</td>
            <td>{{recipe.alamat}}</td>
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
      "http://77e3a2be.ngrok.io/graphql?query=query{gudang{id,nama,alamat}}"
    );
    return{datag: data.data.gudang }
  }
};
</script>
