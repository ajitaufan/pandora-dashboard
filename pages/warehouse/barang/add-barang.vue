<template>
    <section>
    <h2>Add new Barang</h2>
    <form method="post" v-on:submit.prevent="createBrg">
        <span>
            <div class="form-group">
                <label for="edit-name">Nama</label>
                <input class="form-control" id="nama" v-model="barang.nama" required/>
            </div>
            <div class="form-group">
                <label for="edit-sku">SKU</label>
                <input class="form-control" id="sku" v-model="barang.sku" >
            </div>
            <div class="form-group">
                <label for="edit-alamat">Deskripsi</label>
                <textarea class="form-control" id="desc" rows="3" v-model="barang.deskripsi" ></textarea>
            </div>
        </span>
        <button type="submit" class="btn btn-primary">Create</button>
        <nuxt-link to="/warehouse/barang" class="btn btn-default">Cancel</nuxt-link>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      barang: {
        nama: "",
        sku: "",
        deskripsi: ""
      }
    };
  },

  methods: {
    createBrg() {
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{newBarang(nama:"' +
            this.barang.nama +
            '",sku:"' +
            this.barang.sku +
            '",deskripsi:"' +
            this.barang.deskripsi +
            '"){id,nama,sku,deskripsi}}'
        )
        .then(
          response =>
            // RESOLVE WIP
            (window.location = "/warehouse/barang")
        )
        .catch(error => console.log(error));
    }
  }
};
</script>

