<template>
  <section>
    <form @submit.prevent="OnSave">
      <AppControlInput v-model="gudang.nama" required> <h6><strong> Nama Gudang</strong></h6> </AppControlInput>
      <h6><strong> Alamat</strong></h6>
      <AppControlInput v-model="gudang.alamat.jalan" required> -Jalan </AppControlInput>
      <AppControlInput v-model="gudang.alamat.kelurahan" required> -Kelurahan </AppControlInput>
      <AppControlInput v-model="gudang.alamat.kecamatan" required> -Kecamatan </AppControlInput>
      <AppControlInput v-model="gudang.alamat.kota" required> -Kota </AppControlInput>
      <AppControlInput type="number" v-model="gudang.alamat.kodepos" min="0"> -Kodepos </AppControlInput> <br>

      <button class="btn-primary btn" type="submit" :disabled="submitted" >Simpan </button>
      <button class="btn btn-danger"
      type="button" 
      style="margin-left: 10px;" 
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
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      submitted: false,
      gudang: this.post
        ? { ...this.post }
        : {
            id: "",
            nama: "",
            alamat: [
              {
                jalan: "",
                kelurahan: "",
                kecamatan: "",
                kota: "",
                kodepos: ""
              }
            ]
          }
    };
  },
  methods: {
    OnSave() {
      this.submitted = true;
      this.$emit("submit", this.gudang);
    },
    OnCancel() {
      this.$router.push("/warehouse/gudang");
    }
  }
};
</script>