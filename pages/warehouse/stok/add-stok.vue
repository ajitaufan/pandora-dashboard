<template>
  <section>
    <form @submit.prevent="OnSubmitted">
      <AppControlInput v-model="stok.jenis"> Jenis Stok </AppControlInput>
      <AppControlInput v-model="stok.id_gudang"> ID Gudang </AppControlInput>

      <button class="btn-primary btn" :pressed="true" :disabled="submitted" type="submit">Simpan </button>
      <button class="btn btn-danger"
      type="button" 
      style="margin-left: 10px" 
      btn-style="cancel" 
      @click="OnCancel">Cancel </button>
    </form>
  </section>
</template>

<script>
import AppControlInput from "@/components/UI/AppControlInput";
import axios from "axios";

export default {
  components: {
    AppControlInput
  },
  data() {
    return {
      submitted: false,
      stok: {
        jenis: "",
        tanggal: "",
        id_gudang: ""
      }
    };
  },
  methods: {
    OnSubmitted(stok) {
      this.submitted = true;
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{newStokHeader(jenis:"' +
            this.stok.jenis +
            '" id_gudang:' +
            this.stok.id_gudang +
            "){id jenis tanggal}} "
        )
        .then(
          // response => (window.location = "/warehouse/gudang")
          result => console.log(result)
        )
        .catch(e => {
          console.log(e);
          this.submitted = false;
        });
    },
    OnCancel() {
      this.$router.push("/warehouse/stok");
    }
  }
};

// /graphiql?query=mutation{newStokHeader(jenis:"",tanggal:"",id_gudang:5){id_gudang,nomor,jenis,tanggal}}
</script>

