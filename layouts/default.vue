<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">  
      <Sidebar :navItems="nav"/>
      <main class="container mt-4">
        <div class="container-fluid">
          <nuxt />
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from "./menu";
import {
  Header as AppHeader,
  Sidebar,
  Footer as AppFooter
} from "~/components/";

export default {
  name: "full",
  middleware: "auth",
  components: {
    AppHeader,
    Sidebar,
    AppFooter
  },
  data() {
    return {
      nav: nav.items
    };
  }
};
</script>