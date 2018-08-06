<template>
    <section>
    <h2>Edit new product</h2>
    <form method="post" v-on:submit.prevent="OnSubmitted">
        <span> 
            {{$route.params.id}}
            <div class="form-group">
                <label for="edit-name">ID</label>
                <input class="form-control" id="nama" v-model="gudang.id" required/>
            </div>
            <div class="form-group">
                <label for="edit-name">Name</label>
                <input class="form-control" id="nama" v-model="gudang.nama" required/>
            </div>
            <div class="form-group">
                <label for="edit-alamat">Alamat</label>
                <textarea class="form-control" id="alamat" rows="3" v-model="gudang.alamat" ></textarea>
            </div>
        </span>
        <button type="submit" class="btn btn-primary">Edit</button>
        <nuxt-link to="/warehouse/gudang" class="btn btn-default">Cancel</nuxt-link>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  validate({ params }) {
    console.log(params);
    return true;
  },
  asyncData(context) {
    return axios
      .get(
        process.env.myapi +
          '/graphql?query=query{gudang(id:"' +
          context.params.id +
          '"){id,nama,alamat}'
      )
      .then(res => {
        return { g };
      })
      .catch(e => context.error());
  },
  data() {
    return {
      gudang: {
        id: 1,
        nama: "ssasa",
        alamat: "dasdsa"
      }
    };
  }

  //   created() {
  //     var _id = this.$route.params.id;
  //     var regex = /^([0-9]{2,2})([0-9]{2,2})([0-9]{8,8})$/;
  //     var contents = _id.match(regex);
  //     this.type = contents[1];
  //     this.subtype = contents[2];
  //     this.id = contents[3];
  //   },

  // methods: {
  //   updateGd() {
  //     axios
  //       .post(
  //         process.env.myapi +
  //           //params id belum diganti
  //           'graphql?query=mutation{updateGudang(id:"' +
  //           this.gudang.id +
  //           '",nama:"' +
  //           this.gudang.nama +
  //           '",alamat:"' +
  //           this.gudang.alamat +
  //           '"){id,nama,alamat}}'
  //       )
  //       .then(
  //         response =>
  //           // RESOLVE WIP
  //           (window.location = "/warehouse/gudang")
  //       )
  //       .catch(error => console.log(error));
  //   }
  // }
};
</script>