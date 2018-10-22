<template>
  <div  v-if="loadKategori.tag" class="animated fadeIn">
    <form @submit.prevent="OnSave">
      <b-card  header="<i class='fa fa-wpexplorer'></i><strong> Tambah Kategori</strong>">
        <div>
          <div class="row">
            <h4 class="col-lg-6"><strong>Nama Barang : {{loadBarang.nama}}</strong> </h4>  
            <h3 class="col-lg-6"> <div class="float-md-right"> <strong> SKU : {{loadBarang.sku}} </strong></div></h3>
          </div>
        </div>
        <h4 >Kategori : </h4>  
        <h5>
          <ul>
            <li v-for="k in loadBarang.kategori" :key="k.id"> {{k.kategori_nama.nama}}</li>
          </ul>
        </h5>

        <br>
        <h6><strong>Kategori Detail</strong></h6>
        <b-form-group>
          <b-form-select v-model="barang.kategori_c" id="basicSelect" :plain="true">
            <option v-for="d in loadKategori.tag" :key="d.id">{{d.nama}}</option>
          </b-form-select>
        </b-form-group>
        <div slot="footer">  
          <b-button style="margin-right:5px" :disabled="submit" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Tambah</b-button>
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
      loadKategori: [],
      loadBarang: [],
      barang: {
        id: this.$route.params.id,
        kategori_c: ""
      },
      loadedBarang: {
        kategori: this.$route.params.barang.kategori[0].kategori_nama.nama
      }
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    fetch(loadedBarang) {
      let vm = this;
      axios
        .get(
          process.env.myapi +
            '/graphql?query=query{ kategori(nama:"' +
            vm.loadedBarang.kategori +
            '"){ id nama jenis tag { id nama id_parent } }, barang(id:' +
            vm.barang.id +
            "){id nama sku kategori{kategori_nama{nama}}} }"
        )
        .then(function(result) {
          vm.loadKategori = result.data.data.kategori[0];
          vm.loadBarang = result.data.data.barang[0];
          console.log(vm.loadKategori, vm.loadBarang);
        });
    },
    OnSave(barang) {
      // this.submit = true;
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{ newKategoriBarang(nama_kategori:"' +
            this.barang.kategori_c +
            '",id_barang:' +
            this.barang.id +
            "){ id id_barang id_kategori } }"
        )
        .then(
          // response => (window.location = "/warehouse/barang")
          result => console.log(result)
        )
        .catch(e => console.log(e));
    },
    OnCancel() {
      this.$router.push("/warehouse/barang");
    }
    // "/graphql?query=query{ kategori(nama:"fashion"){ id nama jenis tag { id nama id_parent } } }"
    // "/graphql?query=mutation{ newKategoriBarang(nama_kategori:"",id_barang:){ id id_barang id_kategori } }"
  }
};
</script>
