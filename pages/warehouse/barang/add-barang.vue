<template>
  <section>
    <h2><strong>Tambah</strong> Barang baru</h2>
    <FormBarang @submit="onSubmitted" :isCreated="isCreated" />
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
      isCreated: true
    };
  },

  methods: {
    onSubmitted(postData) {
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{newBarangFull(nama_barang:"' +
            postData.nama +
            '",sku:"' +
            postData.sku +
            '",deskripsi:"' +
            postData.deskripsi +
            '",dimensi:{panjang:"' +
            postData.dimensi.panjang +
            '",lebar:"' +
            postData.dimensi.lebar +
            '",tinggi:"' +
            postData.dimensi.tinggi +
            '"},berat:' +
            postData.berat +
            ",harga:" +
            postData.harga +
            ",harga_promo:" +
            postData.harga_promo +
            ',thumbnail:"' +
            postData.thumbn +
            '",image_ori:"' +
            postData.image_ori +
            '",kategori:"' +
            postData.kategori +
            '"){id,sku,nama,berat,deskripsi,dimensi{panjang,lebar,tinggi},pricing{id,sku_barang,tanggal,harga,harga_promo},image{id,thumbnail,image_ori,id_barang}}}'
        )
        .then(
          //response => (window.location = "/warehouse/barang")
          result => console.log(result)
        )
        .catch(error => console.log(error));
    }
  }
};
</script>