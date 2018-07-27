<template>
<div class="rows">
  
  <b-card :header="caption" class="col-md-6 ">
    
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
  
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
    
  </b-card>
  <b-card :header="caption" class="col-md-6 ">
    
    <h4   v-for="recipe in items"
  :key="recipe.id"
  :nama="recipe.nama"
  :id="recipe.id"
  :alamat="recipe.alamat" >
  {{recipe}}
  </h4>
    
    
  </b-card>
</div>
</template>

<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  
  
  export default {
    
  async asyncData() {
    const { data } = await axios.get(
      "http://abc710f1.ngrok.io/graphql?query=query%7B%0A%20%20gudang%7B%0A%20%20%20%20id%2C%0A%20%20%20%20nama%2C%0A%20%20%20%20alamat%0A%20%20%7D%0A%20%20%20%20%0A%20%20%0A%7D"
    );
    return{data: data.data.gudang}
  
  },
    name: 'c-table',
    props: {
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data: (data) => {
      return {
        items:([
         {id:data.id, nama:data.nama, alamat:data.alamat}
        ]),
        fields: [
          {key: 'id'},
          {key: 'nama'},
          {key: 'alamat'},
        ],
        currentPage: 1,
        perPage: 7,
      }
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
              : status === 'Banned' ? 'danger' : 'primary'
      },
      getRowCount (items) {
        return items.length
      }
    }
  }
</script>
