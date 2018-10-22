<template>
  <section>
    <form @submit.prevent="OnSave">
    
      <b-card no-body >
        <b-tabs small card>
          <b-tab title="Barang inputan utama">
            <AppControlInput v-model="barang.nama" required> Nama Barang </AppControlInput>
            <div v-if="isCreated==true" class="input-control">
              <AppControlInput v-model="barang.sku"> SKU Barang </AppControlInput>
              <h6><strong>Kategori</strong></h6>
               <b-form-group>
                <b-form-select v-model="barang.kategori" id="basicSelect"
                  :plain="true"
                  :options="['Fashion','Gadget dan Accessories', 'Alat Rumah Tangga', 'Makanan', 'Alat Elektronik', 'Alat Tulis & Kantor']">
                </b-form-select>
              </b-form-group>
            </div>
          </b-tab>
          <b-tab title="Deskripsi Barang">
            <div class="input-control">
              <h6><strong>Berat</strong></h6>
              <input type="number" placeholder="grams" min="0" v-model.number="barang.berat">
              <br><h6><strong>Dimensi</strong></h6> 
              <h6><strong>-panjang</strong></h6> <input type="number" min="0" placeholder="meter" v-model.number="barang.dimensi.panjang"> 
              <h6><strong>-lebar</strong></h6> <input type="number" min="0" placeholder="meter" v-model.number="barang.dimensi.lebar"> 
              <h6><strong>-tinggi</strong></h6> <input type="number" min="0" placeholder="meter" v-model.number="barang.dimensi.tinggi"> 
            </div> 
            <AppControlInput 
            control-type="textarea"
            v-model="barang.deskripsi"> Deskripsi Barang </AppControlInput>
          </b-tab>
          <div v-if="isCreated==true" class="input-control">
            <b-tab title="Harga Barang">
              <div class="input-control">
                <h6><strong>Harga</strong></h6><input type="number" min="0" placeholder="Rp. " required v-model.number="barang.harga">  
                <br><h6><strong>Harga Promo</strong></h6><input type="number" min="0" placeholder="*jika tidak ada promo isi 0" v-model.number="barang.harga_promo"> 
              </div>
            </b-tab>
          </div>
          <b-tab title="Gambar Barang">
            <AppControlInput v-model="barang.thumbn" required  placeholder="http://www."> Thumbnail Gambar</AppControlInput>
            <AppControlInput v-model="barang.image_ori" required placeholder="http://www."> Gambar Orisinil</AppControlInput>

            <!-- <div v-if="isCreated==true" class="input-control"> -->
              <br>
              <button class="btn-primary btn" type="submit" :disabled="submitted" >Simpan </button>
              <button class="btn btn-danger"
              type="button" 
              style="margin-left: 10px;" 
              btn-style="cancel" 
              @click="OnCancel">Cancel </button>
            <!-- </div> -->
          </b-tab>
        </b-tabs>
      </b-card>
      <div class="float-md-right">
        <h6>*Pastikan semua inputan terisi</h6>
      </div>
    </form>
  </section>
</template>

<script>
import AppControlInput from "@/components/UI/AppControlInput";
import axios from "axios";

export default {
  components: {
    AppControlInput
  },
  props: {
    isCreated: {
      type: Boolean,
      required: false
    },
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      submitted: false,
      barang: this.post
        ? { ...this.post }
        : {
            id: "",
            nama: "",
            berat: "",
            dimensi: [
              {
                panjang: "",
                lebar: "",
                tinggi: ""
              }
            ],
            deskripsi: "",
            thumbn: "",
            image_ori: ""
          }
    };
  },
  methods: {
    OnSave() {
      // this.submitted = true;
      if (this.barang != null) {
        this.$emit("submit", this.barang);
      } else {
        alert("Pastikan semua form terisi");
      }
    },
    OnCancel() {
      this.$router.push("/warehouse/barang");
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


