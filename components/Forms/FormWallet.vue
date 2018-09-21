<template>
  <section>
    <form @submit.prevent="OnSave">
      <b-card>
        <div slot="header">
          <h3><strong>{{ saldo.keterangan }}</strong> <small> saldo</small></h3>
        </div>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="username">Username</label>
              <b-form-input type="text" id="notelp" v-model="saldo.username" placeholder="08xxxxxxxxxxxx"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group>
              <label for="saldo">Jumlah uang</label>
              <b-form-input type="number" min="0" id="jumlah" v-model="saldo.uang" placeholder="Rp. "></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <div slot="footer">
          <center>
          <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
          </center>
        </div>
      </b-card>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    ket: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      saldo: {
        username: "",
        uang: "",
        keterangan: this.ket,
        tanggal: ""
      }
    };
  },

  methods: {
    OnSave() {
      this.$emit("submit", this.saldo);
    }
  }
};
</script>
