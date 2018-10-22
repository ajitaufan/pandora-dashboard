<template>
  <div class="app align-items-center animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
  
              <h2><strong>Ubah Data Admin </strong></h2>
              <p class="text-muted"><i class="fa fa-group"></i> Ubah data admin <strong>{{loadedAdmin.nama}}</strong></p>
              <FormAdmin :post="loadedAdmin" @submit="updateAdmn" />

            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import FormAdmin from "@/components/Forms/FormAdmin";
import axios from "axios";

export default {
  components: {
    FormAdmin
  },
  data() {
    return {
      loadedAdmin: {
        id: this.$route.params.id,
        nama: this.$route.params.admin.nama,
        username: this.$route.params.admin.username
      }
    };
  },

  methods: {
    // checkForm: function(e) {
    //   this.errors = [];
    //   if (this.password != this.pw2) {
    //     this.errors.push("Password dan Konfirmasi Password tidak sama.");
    //   }
    // },
    updateAdmn(postData) {
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{updateUser(id:" +
            postData.id +
            'nama:"' +
            postData.nama +
            '",username:"' +
            postData.username +
            '",password:"' +
            postData.password +
            '"){id,nama,username}}'
        )
        .then(
          // result => console.log(result)
          response => (window.location = "/admin")
        )
        .catch(e => console.log(e));
    }
  }
};
</script>