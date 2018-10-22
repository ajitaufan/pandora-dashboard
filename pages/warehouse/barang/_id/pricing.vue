<template>
  <div class="animated fadeIn">
    <form @submit.prevent="OnSave">
      <b-card header="<i class='fa fa-money'></i><strong> Atur Harga Barang</strong>">
        <h5><strong>Nama Barang :</strong> {{loadedBarang.nama}}</h5>
        <h6>SKU : {{loadedBarang.sku}}</h6> 
        <h6>Kategori : {{loadedBarang.kategori}}</h6> <br>

        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="harga"><strong>Harga</strong></label>
              <b-form-input type="number" required v-model="barang.harga" min="0" placeholder="Rp. "></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="hargap"><strong>Harga Promo</strong></label>
              <b-form-input type="number" required v-model="barang.hargap" min="0" id="jumlah" placeholder="*jika tidak ada promo isi 0"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="tgl"><strong>Tanggal harga mulai berlaku </strong>(YYYY-MM-DD hh:mm:ss) </label>
              <b-form-input type="text" required v-model="barang.tanggal" placeholder="YYYY-MM-DD hh:mm:ss"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <div slot="footer">  
          <b-button style="margin-right:5px" :disabled="submit" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
          <b-button size="sm" variant="danger" @click="OnCancel"><i class="fa fa-close"></i> Cancel</b-button>
        </div>

      </b-card>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      submit: false,
      barang: {
        id: this.$route.params.id,
        harga: "",
        hargap: "",
        tanggal: ""
      },
      loadedBarang: {
        nama: this.$route.params.barang.nama,
        sku: this.$route.params.barang.sku,
        kategori: this.$route.params.barang.kategori[0].kategori_nama.nama
      }
    };
  },

  methods: {
    OnSave(barang) {
      this.submit = true;
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{ newPricing(id_barang:" +
            this.barang.id +
            ',tanggal:"' +
            this.barang.tanggal +
            '",harga:' +
            this.barang.harga +
            ",harga_promo:" +
            this.barang.hargap +
            "){ id harga tanggal } }"
        )
        .then(
          response => (window.location = "/warehouse/barang")
          // result => console.log(result)
        )
        .catch(e => console.log(e));
    },
    OnCancel() {
      this.$router.push("/warehouse/barang");
    }
  }
};
</script>
