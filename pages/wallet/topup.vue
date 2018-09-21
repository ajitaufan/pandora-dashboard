<template>
  <div class="app align-items-center animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <FormWallet :ket="ket" @submit="onSubmitted"/>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import FormWallet from "@/components/Forms/FormWallet";
import axios from "axios";

export default {
  components: {
    FormWallet
  },
  data() {
    return {
      ket: "Top Up"
    };
  },
  methods: {
    onSubmitted(postData) {
      axios
        .post(
          process.env.myapi +
            '/graphql?query=mutation{ newSaldo(username:"' +
            postData.username +
            '",keterangan:"' +
            postData.keterangan +
            '",jumlah:' +
            postData.uang +
            "){ id jumlah} }"
        )
        .then(
          //response => (window.location = "/laporan/riwayatSaldo")
          result => console.log(result)
        )
        .catch(error => console.log(error));
    }
  }
};
</script>