<template>
  <div class="app align-items-center animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
  
              <h2><strong>Register</strong></h2>
              <p class="text-muted"><i class="fa fa-group"></i> Tambah Admin</p>
              <FormAdmin @submit="onSubmitted" />

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
  methods: {
    // checkForm: function(e) {
    //   this.errors = [];
    //   if (this.password != this.pw2) {
    //     this.errors.push("Password dan Konfirmasi Password tidak sama.");
    //   }
    // },
    onSubmitted(postData) {
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{AddUser(nama:"' +
            postData.nama +
            '",username:"' +
            postData.username +
            '",password:"' +
            postData.password +
            '",scope:"admin"){id,nama,return,username,organizations{ uuid nama scopes }}}'
        )
        .then(
          result => console.log(result)
          //response => (window.location = "/admin")
        )
        .catch(e => console.log(e));
    }
  }
};
</script>