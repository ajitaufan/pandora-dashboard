<template>
<b-card>
  <section>
    <h2>Hapus {{gudang.nama}}?</h2>
    <form v-on:submit.prevent="deleteGudang"> 
      <p>Tindakan ini tidak bisa dibatalkan.</p>
      <button type="submit" class="btn btn-danger">Hapus</button>
      <nuxt-link to="/warehouse/gudang" class="btn btn-default">Cancel</nuxt-link>
    </form>
  </section>
</b-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      gudang: {
        id: this.$route.params.id,
        nama: this.$route.params.nama
      }
    };
  },
  methods: {
    deleteGudang() {
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{delGudang(id:" +
            this.gudang.id +
            "){id,nama}}"
        )
        .then(
          response => (window.location = "/warehouse/gudang")
          //result => console.log(result)
        )
        .catch(error => console.log(error));
    }
  }
};
</script>
