<template>
<div class="wrapper">
  <div class="animated fadeIn">

    <b-card header="<i class='fa fa-building'></i><strong> Daftar Gudang</strong> ">
      <p align='right'> 
      <nuxt-link class="btn-sm btn-success" :to="{path: './add-gudang'}">
        <span class="fa fa-plus"></span>
        Tambah Gudang
      </nuxt-link> </p>
      <table class="table table-hover mt-3">
        <thead>
          <tr class="table">
            <th scope="col">ID</th>
            <th scope="col">Nama</th>
            <th scope="col">Alamat</th>
            <th style="width:10%"><center>Actions</center></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="recipe in datag" :key="recipe.id" :nama="recipe.nama" :id="recipe.id" :alamat="recipe.alamat">
            <th scope="row">{{recipe.id}}</th>
            <td>{{recipe.nama}}</td>
            <td>{{recipe.alamat}}</td>
            <td>
              <nuxt-link class="btn-sm btn-warning" style="margin-right:3px" :to="{name: 'gudang-id-edit', params: {id: recipe.id}}">Edit</nuxt-link>
              <nuxt-link class="btn-sm btn-danger" :to="{name: '', params: {id: recipe.id}}">Delete</nuxt-link>
            </td>
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
      process.env.myapi + "/graphql?query=query{gudang{id,nama,alamat}}"
    );
    return{datag: data.data.gudang }
  }
};
</script>
