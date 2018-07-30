<template>
    <section>
    <h2>Add new product</h2>
    <form method="post" v-on:submit.prevent="updateGd">
        <span>
            <div class="form-group">
                <label for="edit-name">Name</label>
                <input class="form-control" id="nama" v-model="gudang.nama" required/>
            </div>
            <div class="form-group">
                <label for="edit-alamat">Alamat</label>
                <textarea class="form-control" id="alamat" rows="3" v-model="gudang.alamat" ></textarea>
            </div>
        </span>
        <button type="submit" class="btn btn-primary">Create</button>
        <nuxt-link to="./gudang" class="btn btn-default">Cancel</nuxt-link>
    </form>
  </section>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      gudang: { 
          nama: "", 
          alamat: "" 
      }
    };
  },

  methods: {
    updateGd() {
      axios
        .post(
            process.env.myapi +
            '/graphql?query=mutation{newGudang(nama:"'+this.gudang.nama+'",alamat:"'+this.gudang.alamat+'"){id,nama,alamat}}'
        )
        .then(
          response =>
            // RESOLVE WIP
            (window.location = "/warehouse/gudang")
        )
        .catch(error => console.log(error));
    }
  }
};
</script>

