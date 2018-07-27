<template>
<div class="wrapper fadeIn">
  <b-card header="<i class='fa fa-building'></i><strong> Daftar Admin</strong>">
    <h2 class="lead">Daftar Admin 
      <p align="right"><a class="btn-sm btn-primary" href="./addA" role="button">+ Admin</a> </p>
    </h2>
    
    <b-table striped hover :fields="fields">

    </b-table>

    
  </b-card>
  
</div>
</template>
<script>
// import axios from 'axios'


export default {
  // async asyncData() {
  //   const { items } = await axios.get(
  //     "http://5b9978db.ngrok.io/graphiql?query=query%7B%0A%20%20barang%7B%0A%20%20%09id%0A%20%20%20%20nama%0A%20%20%20%20sku%0A%20%20%20%20deskripsi%0A%20%20%7D%0A%7D%0A"
  //   );
  // },

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
}
</script>