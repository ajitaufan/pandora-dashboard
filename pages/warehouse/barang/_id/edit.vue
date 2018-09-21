<template>
  <section>
    <h2>Edit Barang</h2>
    <FormBarang :post="loadedBarang" :isCreated="isCreated"/>
  </section>
</template>

<script>
import FormBarang from "@/components/Forms/FormBarang";
import axios from "axios";

export default {
  components: {
    FormBarang
  },
  props: {
    isCreated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadedBarang: {
        id: this.$route.params.id,
        nama: this.$route.params.barang.nama,
        sku: this.$route.params.barang.sku,
        berat: this.$route.params.barang.berat,
        dimensi: this.$route.params.barang.dimensi,
        deskripsi: this.$route.params.barang.deskripsi,
        harga: this.$route.params.barang.pricing.harga,
        harga_promo: this.$route.params.barang.pricing.harga_promo,
        thumbn: this.$route.params.barang.image[0].thumbnail,
        image_ori: this.$route.params.barang.image[0].image_ori,
        kategori: this.$route.params.barang.kategori
      }
    };
  },
  method: {
    updatebarang(postData) {
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{updateBarang(id:" +
            postData.id +
            ',nama:"' +
            postData.nama +
            '",sku:"' +
            postData.sku +
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
            '"}){id,sku,nama,deskripsi,dimensi{panjang,lebar,tinggi},berat}}'

          // http://79fa78dd.ngrok.io/graphiql?query=mutation{ updateBarang(id:0,nama:"",sku:"",deskripsi:"",berat:0,dimensi:{panjang:"",lebar:"",tinggi:""}){ id nama sku deskripsi dimensi{ panjang lebar tinggi } } }
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