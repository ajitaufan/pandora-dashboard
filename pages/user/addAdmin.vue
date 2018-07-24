<template>
<div>
  <div class="container">
    <center>
      <div class="col-lg-8">
        <div class="card mx-auto mt-5">
          <div class="card-header bg-primary">Tambah Admin</div>
            <div class="card-body">
              <form name="frm">
                <fieldset>
                  <div class="form-group" align="left">
                    <input type="text" class="form-control" id="InputNama"  placeholder="Nama Admin" required autofocus>
                  </div>
                  <div class="form-group" align="left">
                    <input type="text" class="form-control" id="InputAlamat"  placeholder="Alamat" required autofocus>
                  </div>
                  <div class="form-group" align="left">
                    <input type="text" class="form-control" id="InputTelepon"  placeholder="Telepon" required autofocus>
                  </div>
                  <div class="form-group" align="left">
                    <input type="text" class="form-control" id="InputUsername"  placeholder="Username" required autofocus>
                  </div>
                  <div class="form-group" align="left">
                    <input type="password" class="form-control" id="InputPassword" placeholder="Password" required autofocus>
                  </div>
                  <div class="form-group" align="left">
                    <input type="password" class="form-control" id="InputKonfirmasiPassword" placeholder="Konfirmasi Password" required autofocus>
                  </div>             
                  </fieldset>
                <fieldset> 
                  <a method="post" name="Form" class="btn btn-primary" href="./user" role="button">Tambahkan</a>
                </fieldset>
              </form>
            </div>
        </div>
      </div>
    </center>
  </div>
</div>
</template>

<script>
export default {
  layout: "default1"
};

</script>

<style>
</style>
