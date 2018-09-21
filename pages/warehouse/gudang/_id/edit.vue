<template>
  <div>
    <section>
      <h2><strong>Ubah</strong> <small> keterangan gudang</small></h2>
      <FormGudang :post="loadedGudang" @submit="updateGdg"/>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import FormGudang from "@/components/Forms/FormGudang";

export default {
  components: {
    FormGudang
  },
  data() {
    return {
      loadedGudang: {
        id: this.$route.params.id,
        nama: this.$route.params.nama,
        alamat: this.$route.params.alamat
      }
    };
  },

  methods: {
    updateGdg(postData) {
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{updateGudang(id:" +
            postData.id +
            ', nama:"' +
            postData.nama +
            '", alamat: {jalan:"' +
            postData.alamat.jalan +
            '", kelurahan:"' +
            postData.alamat.kelurahan +
            '", kecamatan:"' +
            postData.alamat.kecamatan +
            '", kota:"' +
            postData.alamat.kota +
            '", kodepos:"' +
            postData.alamat.kodepos +
            '"})%7Bid%2Cnama%2Calamat%7Bjalan%7D%7D%7D'
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