<template>
  <section>
    <h2>Edit Barang</h2>
    <FormBarang @submit="onSubmit" :post="loadedBarang" :isCreated="isCreated"/>
  </section>
</template>

<script>
import FormBarang from "@/components/Forms/FormBarang";
import axios from "axios";

export default {
  components: {
    FormBarang
  },
  data() {
    return {
      isCreated: false,
      loadedBarang: {
        id: this.$route.params.id,
        nama: this.$route.params.barang.nama,
        berat: this.$route.params.barang.berat,
        dimensi: this.$route.params.barang.dimensi,
        deskripsi: this.$route.params.barang.deskripsi,
        thumbn: this.$route.params.barang.image[0].thumbnail,
        image_ori: this.$route.params.barang.image[0].image_ori,
        kategori: this.$route.params.barang.kategori
      }
    };
  },
  methods: {
    onSubmit(postData) {
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{ updateBarangFull(id:" +
            postData.id +
            ',nama:"' +
            postData.nama +
            '",deskripsi:"' +
            postData.deskripsi +
            '",berat:' +
            postData.berat +
            ',dimensi:{panjang:"' +
            postData.dimensi.panjang +
            '",lebar:"' +
            postData.dimensi.lebar +
            '",tinggi:"' +
            postData.dimensi.tinggi +
            '"},thumbnail:"' +
            postData.thumbn +
            '",image_ori:"' +
            postData.image_ori +
            '"){ id }}'
        )
        .then(
          response => (window.location = "/warehouse/barang")
          // result => console.log(result)
        )
        .catch(error => {
          console.log(error);
          alert("gagal");
        });
    }
  }
};
</script>