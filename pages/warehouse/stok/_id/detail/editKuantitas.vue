<template>
  <div>
    <form @submit.prevent="OnSave">
      <b-card header="<strong>Ubah</strong> Kuantitas Barang">
        <h3><strong>Ubah</strong>  kuantitas barang Stok {{id}}</h3>  
        <h6>Nama Barang: {{nama}}</h6>
        <h6>SKU: {{sku}}</h6> <br>
        <div class="input-control">
          <h6><strong>Kuantitas</strong></h6>
          <input v-model="kuantitas" type="number" placeholder="jumlah barang" min="0" >
        </div> 
        
        <div class="input-control">
          <h6><strong>Satuan</strong></h6>
          <input v-model="satuan" placeholder="(kodi/lusin/gross/dll)">
        </div> 
        <div slot="footer">
            <center>
            <b-button type="submit" :disabled="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Tambah Stok</b-button>
            </center>
        </div>

      </b-card>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      submit: false,
      id: this.$route.params.id,
      nama: this.$route.params.stok.barang.nama,
      sku: this.$route.params.stok.barang.sku,
      kuantitas: this.$route.params.stok.kuantitas,
      satuan: this.$route.params.stok.satuan
    };
  },
  methods: {
    OnSave() {
      this.submit = true;
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{ updateStokDetail(sku:"' +
            this.sku +
            '"kuantitas:' +
            this.kuantitas +
            ',satuan:"' +
            this.satuan +
            '"){ id id_barang id_stok_header satuan kuantitas } }'
        )
        .then(
          //response => (window.location = "/warehouse/stok")
          result => console.log(result)
        )
        .catch(error => {
          console.log(error);
          alert("gagal");
          this.submitted = false;
        });
    }
  }
};
</script>


<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}
</style>

