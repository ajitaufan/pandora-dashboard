<template>
<div class="wrapper">
  <div class="animated fadeIn">

        <b-col>
          <c-table caption="<i class='fa fa-building'></i><strong> Daftar Gudang</strong>">
            <a class="btn btn-primary" href="/dashboard/warehouse/addGudang" role="button">+ Gudang</a>
          </c-table>
        </b-col><!--/.col-->
      
<!--       
        <b-col>
          <c-table striped caption="<i class='fa fa-align-justify'></i> Striped Table"></c-table>
        </b-col>/.col -->

  </div>
</div>
</template>

<script>
  import cTable from './tabel/tabelG.vue'

  export default {
    name: 'tables',
    components: {cTable}
  }
</script>
