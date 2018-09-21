<template>
  <nav aria-label="Page navigation example" class="pagination_area">
    <ul class="pagination">
      <li v-for="n in totalPage" :key=n>
        <a @click="pageClicked(n)"
          class="page-link">
          {{n}}
        </a>        
      </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: ["perPage", "page", "totalCount", "totalPage"],
  methods: {
    pageClicked(page) {
      this.$emit("PAGE_CLICKED", page);
    }
  },
  mounted() {
    console.log(this.totalPage * 1);
  }
};
</script>

<style scoped>
.pagination_area {
  text-align: center;
  margin-top: 25px;
}

.pagination_area .pagination {
  display: inline-block;
  border-radius: 0px;
}

.pagination_area .pagination li {
  display: inline-block;
}

.pagination_area .pagination li a {
  font-size: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #1e90ff;
  border-radius: 0px !important;
  padding: 10px 15px;
  border: 1px solid #1e90ff;
  -webkit-transition: all 400ms linear 0s;
  -o-transition: all 400ms linear 0s;
  transition: all 400ms linear 0s;
}

.pagination_area .pagination li:first-child a {
  border: 1px solid #1e90ff;
}

.pagination_area .pagination li.next a {
  background: #1e90ff;
  color: #fff;
}

.pagination_area .pagination li.previous a {
  background: #1e90ff;
  color: #fff;
}

.pagination_area .pagination li:hover a {
  background: #1e90ff;
  color: #fff;
}
</style>
