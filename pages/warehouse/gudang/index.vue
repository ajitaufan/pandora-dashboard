<template>
  <div class="wrapper">
    <div class="animated fadeIn">

      <b-card header="<i class='fa fa-building'></i><strong> Daftar Gudang</strong> ">
        <div class="row">
          <div class="col-lg-4">
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="fa fa-search"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <input type="search" v-model="keywords" class="form-control" placeholder="Cari Nama Gudang">
              <!-- v-model="searching"  -->
            </b-input-group>
          </div>
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <div class="float-md-right">
            <nuxt-link class="btn btn-md btn-success btn" :to="{path: './gudang/add-gudang'}">
              <span class="fa fa-plus"></span>
              Tambah Gudang
            </nuxt-link>
            </div>
          </div>
        </div>

        <div v-if="totalPage" class="overflow-x:auto">
          <table class="table table-hover mt-3">
            <thead>
              <tr class="table-secondary">
                <th scope="col">ID</th>
                <th scope="col">Nama</th>
                <th scope="col">Alamat</th>
                <th style="width:13%">
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gudang in datag" 
              :key="gudang.id" 
              :nama="gudang.nama" 
              :id="gudang.id"             
              :alamat="gudang.alamat">
                <th scope="row">{{gudang.id}}</th>
                <td>{{gudang.nama}}</td>
                <td>
                  <strong>Jalan : </strong>{{gudang.alamat.jalan}} <strong>Kelurahan : </strong>{{gudang.alamat.kelurahan}}
                  <strong>Kecamatan : </strong>{{gudang.alamat.kecamatan}} <strong>Kota : </strong>{{gudang.alamat.kota}} <br>
                  <strong>Kodepos : </strong>{{gudang.alamat.kodepos}}
                </td>
                <td> 
                  <center>
                  <nuxt-link class="btn btn-sm btn-warning" style="margin-right:3px" :to="{name: 'warehouse-gudang-id-edit', params: {id: gudang.id, nama: gudang.nama, alamat: gudang.alamat}}">Edit</nuxt-link>
                  <nuxt-link v-if="gudang.stokHeader[0]==null" class="btn btn-sm btn-danger" :to="{name: 'warehouse-gudang-id-delete', params: {id: gudang.id,nama: gudang.nama}}">Delete</nuxt-link>
                  </center>
                </td>
              </tr>
            </tbody>
            <!-- <tbody v-if="noResults">
              gudang tidak ada
            </tbody> -->
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

export default {
  components: {
    Pagination
  },
  data() {
    return {
      // noResults: false,
      datag: [],
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
            '/graphql?query=query{searchGudang(nama:"' +
            vm.keywords +
            '"skip:' +
            vm.skip +
            ", take:" +
            vm.perPage +
            '){ id nama alamat{ jalan kecamatan kelurahan kota kodepos} stokHeader{ id id_gudang } }, countGudang(nama:"' +
            vm.keywords +
            '"){jumlah} }'

          // /graphiql?query=query{ searchGudang(nama:"",skip:0,take:0){ id nama alamat{ jalan kecamatan kelurahan kota kodepos } stokHeader{ id id_gudang } },countGudang(nama:""){ jumlah } }
        )
        .then(function(result) {
          (vm.datag = result.data.data.searchGudang),
            (vm.count = result.data.data.countGudang),
            (vm.totalPage = Math.ceil(
              result.data.data.countGudang.jumlah / vm.perPage
            ));
          // console.log(vm.datag);
        });
    },
    next(page) {
      this.page = page;
      this.skip = (this.page - 1) * this.perPage;
      this.$nuxt._router.replace({ path: "/warehouse/gudang?page=" + page });
      this.fetch();
      // window.location.reload(true);
    }
  }
};
</script>