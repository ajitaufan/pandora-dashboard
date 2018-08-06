<template>
    <section>
    <h2>Add new Gudang</h2>
    <form method="post" v-on:submit.prevent="createGd">
        <span>
            <div class="form-group">
                <label for="edit-name">nama</label>
                <input class="form-control" id="nama" v-model="gudang.nama" required/>
            </div>
            <div class="form-group">
                <label for="edit-alamat">Alamat</label>
                <textarea class="form-control" id="alamat" rows="3" v-model="gudang.alamat" ></textarea>
            </div>
        </span>
        <button type="submit" class="btn btn-primary">Create</button>
        <nuxt-link to="/warehouse/gudang" class="btn btn-default">Cancel</nuxt-link>
    </form>
  </section>
</template>

<script>
import axios from "axios";

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
    createGd() {
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{newGudang(nama:"' +
            this.gudang.nama +
            '",alamat:"' +
            this.gudang.alamat +
            '"){id,nama,alamat}}'
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

