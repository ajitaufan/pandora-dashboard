<template>
  <div>
    <h2><strong>Tambah</strong> Barang pada Stok 1</h2>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs -->
        <b-tab :title="`Tambah kuantitas Barang ${i}`" v-for="i in tabs" :key="i">
          <h3><strong>Tambah</strong>  kuantitas barang {{i}}</h3>  
          <AppControlInput type="search" required v-model="keywords"> SKU Barang </AppControlInput>
          <ul v-if="hasils.length > 0">
            <li v-for="d in hasils" :key="d.id">{{d.sku}}</li>
          </ul>
          <div class="input-control">
            <h6><strong>Kuantitas</strong></h6>
            <input type="number" placeholder="grams" min="0" >
          </div> 
          <AppControlInput required> Satuan Barang </AppControlInput>
          <b-btn size="sm" variant="danger" class="float-right" @click="()=>closeTab(i)">
            Close tab
          </b-btn>
        </b-tab>

        <!-- New Tab Button (Using tabs slot) -->
        <b-nav-item slot="tabs" @click.prevent="newTab" href="#">
          <span class="fa fa-plus"></span>
        </b-nav-item>

        <!-- Render this if no tabs -->
        <div slot="empty" class="text-center text-muted">
          Tidak ada tab tambah barang terbuka
          <br> Buka tab tambah barang baru dengan menekan tombol +
        </div>
      </b-tabs>
    </b-card>
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
      tabs: [],
      tabCounter: 1,
      keywords: null,
      hasils: []
    };
  },

  watch: {
    keywords(after, before) {
      this.fetch();
    }
  },

  methods: {
    closeTab(x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1);
        }
      }
    },
    newTab() {
      this.tabs.push(this.tabCounter++);
    },
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
          console.log(vm.hasils);
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