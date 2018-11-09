<template>
  <div>
    <form @submit.prevent="OnSave">
      <b-card header="<strong>Tambah</strong> Barang pada Stok">
        <h3><strong>Tambah</strong>  kuantitas barang Stok {{stokh.id}}</h3>  
        <AppControlInput type="search" required v-model="keywords"> SKU Barang </AppControlInput>

        <div v-if="keywords">
          <ul v-if="hasils.length"> 
            <h6><strong>SKU Terdaftar</strong></h6>
            <li v-for="d in hasils" :key="d.id">{{d.sku}}</li>    
          </ul>
          <ul v-else>
            <center>
            <br><h3>SKU Tidak Terdaftar</h3>
            <nuxt-link class="btn btn-sm btn-success" :to="{path: '/warehouse/barang/add-barang'}">
              <span class="fa fa-plus"></span>
                Tambah Barang
            </nuxt-link>
            </center> 
            <br>
          </ul>
        </div> 
        <!-- <b-form-group>
                
          <v-select>sasas</v-select>
            <b-form-select :plain="true">
              <b-form-input type="number" min="0" placeholder="Rp. "></b-form-input>
              v-model="barang.kategori_c" >
              <option> sadad
              v-for="d in hasils" :key="d.id">{{d.sku}}
              </option>
              <option>sdasdsd</option>
            </b-form-select>
        </b-form-group> -->

        <div class="input-control">
          <h6><strong>Kuantitas</strong></h6>
          <input v-model="kuantitas" type="number" placeholder="jumlah barang" min="0" >
        </div> 
        <AppControlInput v-model="satuan" required placeholder="(kodi/lusin/gross/dll)" > Satuan Barang </AppControlInput>

        <div slot="footer">
            <center>
            <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Tambah Stok</b-button>
            </center>
        </div>

        <!-- <b-tabs card>
          Render Tabs
          <b-tab :title="`Tambah kuantitas Barang ${i}`" v-for="i in tabs" :key="i">
            
            <b-btn size="sm" variant="danger" class="float-right" @click="()=>closeTab(i)">
              Close tab
            </b-btn>
          </b-tab>

          New Tab Button (Using tabs slot)
          <b-nav-item slot="tabs" @click.prevent="newTab" href="#">
            <span class="fa fa-plus"></span>
          </b-nav-item>

          Render this if no tabs
          <div slot="empty" class="text-center text-muted">
            Tidak ada tab tambah barang terbuka
            <br> Buka tab tambah barang baru dengan menekan tombol +
          </div>
        </b-tabs> -->
      </b-card>
    </form>
  </div>
</template>

<script>
import AppControlInput from "@/components/UI/AppControlInput";
import axios from "axios";

export default {
  components: {
    AppControlInput
  },
  data() {
    return {
      // tabs: [],
      // tabCounter: 1,
      stokh: {
        id: this.$route.params.id
      },
      keywords: null,
      kuantitas: "",
      satuan: "",
      hasils: []
    };
  },

  watch: {
    keywords(after, before) {
      this.fetch();
    }
  },

  methods: {
    // closeTab(x) {
    //   for (let i = 0; i < this.tabs.length; i++) {
    //     if (this.tabs[i] === x) {
    //       this.tabs.splice(i, 1);
    //     }
    //   }
    // },
    // newTab() {
    //   this.tabs.push(this.tabCounter++);
    // },
    fetch() {
      let vm = this;
      axios
        .get(
          process.env.myapi +
            '/graphql?query=query{searchSkuBarang(sku:"' +
            vm.keywords +
            '"){ id sku nama deskripsi image{ thumbnail image_ori }} }'
        )
        .then(function(result) {
          vm.hasils = result.data.data.searchSkuBarang;
          //console.log(vm.hasils);
        });
    },
    OnSave() {
      axios
        .post(
          process.env.myapi +
            "/graphql?query=mutation{ stokDetailfull(id_stok_header:" +
            this.stokh.id +
            ",kuantitas:" +
            this.kuantitas +
            ',satuan:"' +
            this.satuan +
            '",sku:"' +
            this.keywords +
            '"){ id barang{ sku } } }'
        )
        .then(
          response => (window.location = "/warehouse/stok")
          // result => console.log(result)
        )
        .catch(e => console.log(e));
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