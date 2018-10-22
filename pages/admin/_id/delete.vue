<template>
  <div class="app align-items-center animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <h2>Hapus admin {{admin.nama}}?</h2>
              <form v-on:submit.prevent="deleteAdmn">
                <p>Tindakan ini tidak bisa dibatalkan.</p>
                <button type="submit" class="btn btn-danger">Hapus</button>
                <nuxt-link to="/admin" class="btn btn-default">Cancel</nuxt-link>
              </form>

            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      admin: {
        username: this.$route.params.username,
        nama: this.$route.params.nama
      }
    };
  },
  methods: {
    deleteAdmn() {
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{Deactivate(username:"' +
            this.admin.username +
            '"){id,nama}}'
        )
        .then(
          response => (window.location = "/admin")
          //result => console.log(result)
        )
        .catch(error => console.log(error));
    }
  }
};
</script>