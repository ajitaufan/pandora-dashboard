<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>

                <!-- <button class="btn btn-primary btn-md" @click="status">Tes</button>
                <b-dropdown variant="link" size="sm" no-caret>
                  <template slot="button-content">
                    <i class="icon-pencil"></i>
                  </template>
                  <b-dropdown-item>
                    <nuxt-link class="btn btn-md" :to="{}">Tambah Kategori Detail</nuxt-link>
                    <li @click="onDelete(single)">
                        <a style="color:red">
                            <i class="icon-trash"></i> <b>Hapus</b>
                        </a>
                    </li>
                    
                  </b-dropdown-item>
                </b-dropdown> -->
                    

                <form @submit.prevent="onSubmit">
                
                  <b-card v-if="notif==true" class="bg-danger text-center">
                    <p>Username dan password tidak terdaftar Silahkan kontak administrator</p>
                  </b-card>

                  <h1>Login</h1>
                  <p class="text-muted">Masuk ke dalam sistem Pandora</p>
                
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <input type="text" class="form-control" v-model="username" required placeholder="Username">
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <input type="password" class="form-control" v-model="password" required placeholder="Password">
                  </b-input-group>

                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" :disabled="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2><strong>Pandora Dashboard</strong></h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "clean",
  data() {
    return {
      submit: false,
      isLogin: true,
      username: "",
      password: "",
      notif: false
    };
  },
  methods: {
    // status() {
    //   if (confirm("Apakah anda yakin ?")) {
    //     // await axios
    //     //   .post(
    //     //     process.env.myapi +
    //     //       "/graphql?query=mutation{DeleteKaryawan(id:" +
    //     //       params.id +
    //     //       "){id,uuid,nip,nama,rating}}"
    //     //   )
    //     //   .then(res => this.$router.push("/terapis/manajemen"))
    //     //   .catch(function(error) {
    //     //     console.log(error);
    //     //   });
    //   } else {
    //   }
    // },
    onSubmit() {
      this.submit = true;
      this.notif = false;
      if (
        this.username !== null &&
        this.username != "" &&
        this.password != null &&
        this.password != ""
      ) {
        axios
          .post(
            process.env.myapi +
              '/graphql?query=mutation{Authenticate(input:{username:"' +
              this.username +
              '",password:"' +
              this.password +
              '"}){token,user{id,username,organizations{nama,scopes}}}}'
          )
          .then(
            response => {
              this.$store.commit(
                "auth/setUser",
                response.data.data.Authenticate
              ),
                this.$store.commit(
                  "auth/setAuthenticated",
                  response.data.data.Authenticate
                ),
                this.$router.push("/dashboard");
            }
            //result => console.log(result)
          )
          .catch(error => {
            console.log(error);
            // alert("gagal");
            this.notif = true;
            this.username = "";
            this.password = "";
            this.submit = false;
          });
      }
    }
  }
};
</script>
