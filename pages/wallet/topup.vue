<template>
  <div class="app align-items-center animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
         <b-card>
          <div slot="header">
            <h3><strong>Top Up</strong> <small> saldo</small></h3>
          </div>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="notelp">Nomor telepon</label>
                <b-form-input type="text" id="notelp" placeholder="08xxxxxxxxxxxx"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="saldo">Jumlah uang</label>
                <b-form-input type="text" id="jumlah" placeholder="Rp. "></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="tanggal">Tanggal Input</label>
                <b-form-input type="text" id="tanggal" placeholder="YYYY-MM-DD HH:MM:SS"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div slot="footer">
            <center>
            <b-button type="submit" @submit="onSubmitted" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            </center>
          </div>
        </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  // methods: {
  //   onSubmitted() {

  //   }
  // }
};
</script>