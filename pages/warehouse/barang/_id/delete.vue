<template>
<b-card>
  <section>
    <h2>Hapus {{barang.nama}}?</h2>
    <form v-on:submit.prevent="deleteBarang"> 
      <p>Tindakan ini tidak bisa dibatalkan.</p>
      <button type="submit" class="btn btn-danger">Hapus</button>
      <nuxt-link to="/warehouse/barang" class="btn btn-default">Cancel</nuxt-link>
    </form>
  </section>
</b-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      barang: {
        id: this.$route.params.id,
        nama: this.$route.params.nama
      }
    };
  },
  methods: {
    deleteBarang() {
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{delBarang(id:" +
            this.barang.id +
            "){id,nama}}"
        )
        .then(
          response => (window.location = "/warehouse/barang"),
          result => console.log(result)
        )
        .catch(error => console.log(error));
    }
  }
};
</script>
