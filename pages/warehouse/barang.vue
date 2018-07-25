<template>
<div class="wrapper">
  <div class="animated fadeIn">

    <b-col>
      <c-table striped caption="<i class='fa fa-building'></i><strong> Daftar Barang</strong>">
        <a class="btn btn-primary" href="/dashboard/warehouse/addGudang" role="button">+ Gudang</a>
      </c-table>
    </b-col>
  </div>
</div>
</template>

<script>
  import cTable from './tabel/tabelB.vue'

  export default {
    name: 'tables',
    components: {cTable}
  }
</script>
