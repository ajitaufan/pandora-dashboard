<template>
  <div>
    <h2><strong>Tambah</strong> <small> Gudang baru</small></h2>
    <section>
      <br>
      <FormGudang @submit="onSubmitted" />
    </section>
  </div>
</template>

// <script>
import FormGudang from "@/components/Forms/FormGudang";
import axios from "axios";

export default {
  components: {
    FormGudang
  },
  methods: {
    onSubmitted(postData) {
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{newGudang(nama:"' +
            postData.nama +
            '",alamat: {jalan:"' +
            postData.alamat.jalan +
            '", kelurahan: "' +
            postData.alamat.kelurahan +
            '", kecamatan: "' +
            postData.alamat.kecamatan +
            '", kota: "' +
            postData.alamat.kota +
            '", kodepos: "' +
            postData.alamat.kodepos +
            '"}){id,nama}}'
        )
        .then(
          response => (window.location = "/warehouse/gudang")
          //result => console.log(result)
        )
        .catch(e => console.log(e));
    }
  }
};
//
</script>

