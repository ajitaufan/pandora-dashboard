<template>
  <div class="wrapper">
    <div v-if="totalPage" class="animated fadeIn">
      <b-card header="<i class='fa fa-money'></i><strong> Daftar Transaksi Saldo Pandora</strong>">
        
        <div class="overflow-x:auto">
          <table class="table table-hover mt-3">
            <thead>
              <tr class="table-secondary">
                <th scope="col">Data User</th>
                <th scope="col">Tanggal Inputan</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="saldo in datas" 
              :key="saldo.id" >
                <td scope="row">
                  <strong> Username: </strong>{{saldo.wallet.user.username}}
                  <br><strong>Nama: </strong>{{saldo.wallet.user.nama}}
                  <br><strong>No Rekening: </strong>{{saldo.wallet.nomer_rekening}}
                </td>
                <td> {{saldo.tanggal}} </td>
                
                <td v-if='saldo.keterangan=="Top Up"'> <h5><b-badge variant="success">{{saldo.keterangan}}</b-badge></h5>  </td>
                <td v-else-if='saldo.keterangan=="Withdraw"'> <h5><b-badge variant="danger">{{saldo.keterangan}}</b-badge></h5>  </td>
                <td v-else> <h5><b-badge variant="secondary"> {{saldo.keterangan}}</b-badge></h5> </td>
                
                <td>Rp. {{saldo.jumlah}} </td>
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

export default {
  components: {
    Pagination
  },
  data() {
    return {
      datas: [],
      perPage: 10,
      totalPage: 0,
      page: 1,
      skip: 0
    };
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
            "/graphql?query=query{ saldo(skip:" +
            vm.skip +
            ", take: " +
            vm.perPage +
            ") { tanggal jumlah keterangan wallet { id nomer_rekening user { nama username } } },countSaldo{ jumlah } }"
        )
        .then(function(result) {
          (vm.datas = result.data.data.saldo),
            (vm.count = result.data.data.countSaldo),
            (vm.totalPage = Math.ceil(
              result.data.data.countSaldo.jumlah / vm.perPage
            ));
        });
    },
    next(page) {
      this.page = page;
      this.skip = (this.page - 1) * this.perPage;
      this.$nuxt._router.replace({
        path: "/laporan/riwayatSaldo?page=" + page
      });
      this.fetch();
      // window.location.reload(true);
    },
    getKet(keterangan) {
      return keterangan === "Top Up"
        ? "success"
        : keterangan === "Withdraw"
          ? "warning"
          : "primary";
    }
  }
};
</script>

