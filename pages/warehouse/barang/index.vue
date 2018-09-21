<template>
<div class="wrapper">
  <div class="animated fadeIn">

    <b-card header="<i class='fa fa-suitcase'></i><strong> Daftar Barang</strong> ">
      <div class="row">
        <div class="col-lg-4">
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fa fa-search"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <input type="text" v-model="keywords" class="form-control" placeholder="Cari Nama Barang">
            <!-- v-model="searching" -->
          </b-input-group>
        </div>
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <div class="float-md-right">
            <nuxt-link class="btn btn-md btn-success" :to="{path: '/warehouse/barang/add-barang'}">
            <span class="fa fa-plus"></span>
              Tambah Barang
            </nuxt-link> 
          </div>
        </div>
      </div>
      
      <div v-if="totalPage" class="overflow-x:auto">
        <table class="table table-hover mt-3">
          <thead>
            <tr class="table-active">
              <th scope="col">ID</th>
              <th scope="col">Gambar</th>
              <th scope="col">Nama</th>
              <th scope="col">SKU</th>
              <th scope="col">Kategori</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">Harga</th>
              <th style="width:13%">
                  <center>Actions</center>
              </th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="barang in datab" 
            :key="barang.id" 
            :nama="barang.nama" 
            :id="barang.id"
            :sku="barang.sku"
            :deskripsi="barang.deskripsi"
            :kategori="barang.kategori[0].kategori_nama.nama"
            :harga="barang.harga"
            :harga_promo="barang.harga_promo"
            :thumbnail="barang.image[0].thumbnail">
              <th scope="row">{{barang.id}}</th>
              <td>
                <img class="img" :src="barang.image[0].thumbnail">
                </td>
              <td>{{barang.nama}}</td>
              <td>{{barang.sku}} </td>
              <td>{{barang.kategori[0].kategori_nama.nama}} </td>
              <td> <strong>Berat</strong> : {{barang.berat}} gram<br>
                <strong>Dimensi</strong> : {{barang.dimensi}}
                <!-- panjang= {{barang.dimensi.panjang}}, lebar= {{barang.dimensi.lebar}}, tinggi= {{barang.dimensi.tinggi}}, m^3<br> -->
                {{barang.deskripsi}}</td>            
              <td v-if="barang.pricing.harga_promo==0">{{ "Rp. "+ barang.pricing.harga }}</td>
              <td v-else> <del>{{ "Rp. " + barang.pricing.harga }}</del><br>Rp. {{ barang.pricing.harga_promo }}</td>
              <td>
                <center>
                <nuxt-link class="btn btn-sm btn-warning" style="margin-right:3px" :to="{name: 'warehouse-barang-id-edit', params: {id: barang.id, barang:barang }}">Edit</nuxt-link>
                <nuxt-link class="btn btn-sm btn-danger" :to="{name: 'warehouse-barang-id-delete', params: {id: barang.id, nama:barang.nama}}">Delete</nuxt-link> <br>
                </center>
              </td>
            </tr>
          </tbody>
        </table>

        <br>
        <div v-if="count">
          <Pagination :perPage=perPage :totalCount=count.jumlah :page=page :totalPage=totalPage @PAGE_CLICKED="next"/>
        </div>
      </div>

    </b-card>

  </div>
</div>
</template>


<script>
import axios from "axios";
import Pagination from "@/components/Pagination";
// import { mapGetters } from "vuex";

export default {
  components: {
    Pagination
  },

  data() {
    return {
      datab: [],
      perPage: 10,
      totalPage: 0,
      page: 1,
      skip: 0,
      keywords: ""
    };
  },

  watch: {
    keywords(after, before) {
      this.fetch();
    }
  },

  mounted() {
    let newPage = this.$route.query.page;
    if (newPage > 0) {
      this.page = newPage;
    }
    this.skip = (this.page - 1) * this.perPage;
    this.fetch();
  },

  methods: {
    fetch() {
      let vm = this;
      axios
        .get(
          process.env.myapi +
            "/graphql?query=query{barang(skip:" +
            vm.skip +
            ",take:" +
            vm.perPage +
            ',nama:"' +
            vm.keywords +
            '"){id,sku,nama,berat,dimensi{panjang,lebar,tinggi},deskripsi,pricing{id,sku_barang,tanggal,harga,harga_promo}image{id,thumbnail,image_ori,id_barang},kategori{id_barang,id_kategori,kategori_nama{id,nama}}}, countSearchingBarangAdmin(nama:"' +
            vm.keywords +
            '"){jumlah} }'
        )
        .then(function(result) {
          (vm.datab = result.data.data.barang),
            (vm.count = result.data.data.countSearchingBarangAdmin),
            (vm.totalPage = Math.ceil(
              result.data.data.countSearchingBarangAdmin.jumlah / vm.perPage
            ));
        });
    },
    next(page) {
      this.page = page;
      this.skip = (this.page - 1) * this.perPage;
      this.$nuxt._router.replace({ path: "/warehouse/barang?page=" + page });
      this.fetch();
    }
  }

  // javascript tampil semua data + searching (beban ke bandwidth user)
  //
  // async search() {
  //   const { data } = await axios.get(
  //     process.env.myapi +
  //       '/graphql?query=query{barang(nama: "' +
  //       search +
  //       '" ){id,sku,nama,berat,dimensi{panjang,lebar,tinggi},deskripsi,pricing{id,sku_barang,tanggal,harga,harga_promo}image{id,thumbnail,image_ori,id_barang},kategori{id_barang,id_kategori,kategori_nama{id,kategori}}}}'
  //   );
  //   //console.log(data);
  //   return { search: data.data.barang };
  // },

  // computed: {
  //   filteredDataB: function() {
  //     return this.datab.filter(barang => {
  //       return barang.nama.match(this.search);
  //     });
  //   }
  // }
};
</script>

<style scoped>
.img {
  height: 90px;
  width: 90px;
}
</style>

