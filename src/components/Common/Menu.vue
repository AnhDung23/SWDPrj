!<template>
  <div id="hci-menu">
    <el-menu
      :default-active="activeIndex"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#ffffff"
      class="el-menu-vertical-demo"
      style="min-height: 100vh"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>Quản lý nhân viên</span>
        </template>
        <el-menu-item index="1-1" @click="doHome">Tất cả nhân viên</el-menu-item>
        <!-- <el-menu-item index="1-2" @click="insertEmployee">Thêm mới nhân viên</el-menu-item> -->
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Cài đặt</span>
        </template>
        <!-- <el-menu-item index="5-1" @click="doChangePassword">Đổi mặt khẩu</el-menu-item> -->
        <el-menu-item index="5-2" @click="doLogout">Đăng xuất</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  props: {
    activeIndex: String
  },
  methods: {
    /**
     * Go to home page 1
     */
    doHome () {
      this.transitTo('UserManagement', undefined)
    },
    /**
     * Logout 5-2
     */
    doLogout () {
      this.$confirm('Bạn có muốn đăng xuất?', 'Đăng xuất ?', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy Bỏ',
        type: 'warning'
      }).then(() => {
        const loader = this.getLoader()
        sessionStorage.clear()
        this.transitTo('Login', undefined)
        this.closeLoader(loader)
      })
    },
    /**
     * Show Loader
     */
    getLoader () {
      return this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    /**
     * Close Loader
     * @param loader
     */
    closeLoader (loader) {
      loader.close()
    },
    /**
     * Transit to another component
     * @param name
     * @param data
     */
    transitTo (name, data) {
      const param = {
        name: name,
        params: data
      }
      this.$router.push(param)
    }
  }
}
</script>
<style>
  #hci-menu{
      position: fixed;
      left: 0;
      z-index: 1;
      width: 20.83333%;
  }
</style>
