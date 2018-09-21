<template>
  <div class="wrapper fadeIn">
    <b-card header="<i class='fa fa-building'></i><strong> Daftar Admin</strong>">

      <p align="right">
        <nuxt-link class="btn-sm btn-primary" :to="{path: '/user/addAdmin'}">
          <span class="fa fa-plus"></span> Admin
        </nuxt-link>
      </p>
      <div class="overflow-x:auto">
        <table class="table table-hover mt-3">
          <thead>
            <tr class="table-secondary">
              <th scope="col">ID</th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th style="width:15%">
                <center>Actions</center>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admin in datau" 
            :key="admin.id" 
            :nama="admin.nama" 
            :id="admin.id" 
            :username="admin.username">
              <th scope="row">{{admin.id}}</th>
              <td>{{admin.nama}}</td>
              <td>{{admin.username}}</td>
              <td> 
                <center>
                <nuxt-link class="btn btn-sm btn-warning" style="margin-right:3px" :to="{name: 'user-id-edit', params: {id: admin.id, admin: admin}}">Edit</nuxt-link>
                <nuxt-link class="btn btn-sm btn-danger" :to="{name: 'user-id-delete', params: {id: admin.id, username: admin.username,nama: admin.nama}}">Delete</nuxt-link>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
        </div>



    </b-card>

  </div>
</template>
<script>
import axios from "axios";

export default {
  async asyncData() {
    const { data } = await axios.get(
      process.env.myapi + "/graphql?query=query{users{id,nama,username}}"
    );
    return { datau: data.data.users };
  }
  // data () {
  //   return {
  //     items: items,
  //     fields: [
  //       {key: 'id'},
  //       {key: 'nama'},
  //       {key: 'sku'},
  //       {key: 'deskripsi'}
  //     ]
  //   }
  // }
};
</script>