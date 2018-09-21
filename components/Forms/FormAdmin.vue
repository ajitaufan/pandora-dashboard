<template>
  <section>

    <form @submit.prevent="OnSave">
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <b-input-group-text>
            <i class="icon-people"></i>
          </b-input-group-text>
        </b-input-group-prepend>
        <input type="text" class="form-control" v-model="admin.nama" required placeholder="Nama">
      </b-input-group>

      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <b-input-group-text>
            <i class="icon-user"></i>
          </b-input-group-text>
        </b-input-group-prepend>
        <input type="text" class="form-control" v-model="admin.username" required placeholder="Username">
      </b-input-group>

      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <b-input-group-text>
            <i class="icon-lock"></i>
          </b-input-group-text>
        </b-input-group-prepend>
        <input type="password" id="pw1" class="form-control" v-model="admin.password" required placeholder="Password">
      </b-input-group>

      <b-input-group class="mb-4">
        <b-input-group-prepend>
          <b-input-group-text>
            <i class="icon-lock"></i>
          </b-input-group-text>
        </b-input-group-prepend>
        <input type="password" class="form-control" required placeholder="Konfirmasi Password">
      </b-input-group>

      <b-button type="submit" :disabled="submit" variant="success" block>Create Account</b-button>
    </form>

  </section>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      submit: false,
      admin: this.post
        ? { ...this.post }
        : {
            id: "",
            nama: "",
            username: "",
            password: ""
          }
    };
  },
  methods: {
    OnSave() {
      this.submit = true;
      this.$emit("submit", this.admin);
    }
  }
};
</script>
