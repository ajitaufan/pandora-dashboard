<template>
  <div class="wrapper">
    <div class="animated fadeIn">

      <b-card header="<i class='fa fa-handshake-o'></i><strong> Daftar Pesanan</strong> ">
        <table class="table table-hover mt-3">
          <thead>
            <tr class="table-secondary">
              <th scope="col">ID</th>
              <th scope="col">Nama Pemesan</th>
              <th scope="col">Alamat</th>
              <th scope="col">Barang</th>
              <th scope="col">Alamat</th>
              <th style="width:5%">
                <center>Status</center>
              </th>
            </tr>
          </thead>
          <!-- <tbody>
            <tr v-for="gudang in datag" 
            :key="gudang.id" 
            :nama="gudang.nama" 
            :id="gudang.id" 
            :alamat="gudang.alamat">
              <th scope="row">{{gudang.id}}</th>
              <td>{{gudang.nama}}</td>
              <td>{{gudang.alamat}}</td>
              <td>
                <nuxt-link class="btn btn-sm btn-warning" style="margin-right:3px" :to="{name: 'warehouse-gudang-id-edit', params: {id: gudang.id}}">Edit</nuxt-link>
                <nuxt-link class="btn btn-sm btn-danger" :to="{name: 'warehouse-gudang-id-delete', params: {id: gudang.id}}">Delete</nuxt-link>
              </td>
            </tr>
          </tbody> -->
        </table>
      </b-card>

    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  //   async asyncData() {
  //     const { data } = await axios.get(
  //       process.env.myapi + "/graphql?query=query{gudang{id,nama,alamat}}"
  //     );
  //     return { datag: data.data.gudang };
  //   }
};
</script>