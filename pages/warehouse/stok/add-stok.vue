<template>
  <section>
    <form @submit.prevent="OnSubmitted">
      <AppControlInput v-model="stok.jenis"> Jenis Stok </AppControlInput>
      <AppControlInput placeholder="YYYY-MM-DD hh:mm:ss" v-model="stok.tanggal" required> Tanggal Tercatat </AppControlInput>
      <AppControlInput v-model="stok.id_gudang"> ID Gudang </AppControlInput>

      <button class="btn-secondary btn" :pressed="true" :disabled="submitted" type="submit">Simpan </button>
      <AppButton 
      type="button" 
      style="margin-left: 10px" 
      btn-style="cancel" 
      @click="OnCancel">Cancel </AppButton>
    </form>
  </section>
</template>

<script>
import AppControlInput from "@/components/UI/AppControlInput";
import AppButton from "@/components/UI/AppButton";
import axios from "axios";

export default {
  components: {
    AppControlInput,
    AppButton
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
            '" tanggal:"' +
            this.stok.tanggal +
            '" id_gudang:' +
            this.stok.id_gudang +
            "){id jenis tanggal}} "
        )
        .then(
          // response => (window.location = "/warehouse/gudang")
          result => console.log(result)
        )
        .catch(e => console.log(e));
    },
    OnCancel() {
      this.$router.push("/warehouse/stok");
    }
  }
};

// /graphiql?query=mutation{newStokHeader(jenis:"",tanggal:"",id_gudang:5){id_gudang,nomor,jenis,tanggal}}
</script>

