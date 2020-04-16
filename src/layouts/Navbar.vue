<template>
  <div id="navbar">
    <nav class="navbar z-index navbar-light">
      <img src="../assets/qualicorp.png" width="200" alt="Qualicorp-logo" />
      <form class="form-inline mr-3">
        <router-link to="/" class="text-white">
          <i class="fa fa-arrow-left h6 mx-2" aria-hidden="true"></i>
          <span class="h6">Voltar</span>
        </router-link>
      </form>
    </nav>
  </div>
</template>
    
<script>
import "font-awesome/css/font-awesome.css";

export default {
  name: "#navbar",
  data() {
    return {};
  }
};
</script>
    
<style>
.z-index {
  z-index: 9;
}
</style>