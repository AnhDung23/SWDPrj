!<template>
  <div id="userManagement">
    <el-row>
      <el-col :span='5' style="text-align: left">
        <hci-menu :activeIndex='"1-1"' />
      </el-col>
      <el-col :offset="5" :span="19">
          <h1>Quản lý nhân viên</h1>
          <div>
            Chọn cửa hàng:
              <el-select v-model="searchStoreId" placeholder="Select" @change="changeStoreSearch">
                <el-option
                  v-for="store in storeList"
                  :key="store.id"
                  :label="store.name"
                  :value="store.id">
                </el-option>
              </el-select>
          </div>
          <el-table
            stripe
            :data="subEmployeeDataList"
            style="width: 95%; margin-left: 2.5%"
            @row-click="empRowClick"
            empty-text="Không có dữ liệu">
          <el-table-column
            label="Tài Khoản"
            prop="email">
          </el-table-column>
          <el-table-column
            label="Họ tên"
            prop="name">
          </el-table-column>
          <el-table-column
            label="Địa chỉ"
            prop="address">
          </el-table-column>
          <el-table-column
            label="Số điện thoại"
            prop="phone_number">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :page-size="pageSize"
          :current-page.sync="currentPage"
          style="margin-top: 10px"
          layout="prev, pager, next"
          :hide-on-single-page="true"
          @current-change="changePage()"
          :total="employeeDataList.length === 0 ? accountData.length : employeeDataList.length">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '../Common/Menu'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      numOfPage: 0,
      currentPage: 1,
      pageSize: 3,
      subEmployeeDataList: [],
      employeeDataList: [],
      accountData: [],
      storeList: [],
      searchStoreId: '',
      loader: {}
    }
  },
  components: {
    'hci-menu': Menu
  },
  watch: {
    // search () {
    //   this.employeeDataList = this.accountData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    //   if (this.search.length > 0) {
    //     this.currentPage = 1
    //     this.numOfPage = this.employeeDataList.length / this.pageSize
    //   } else {
    //     this.numOfPage = this.accountData.length / this.pageSize
    //   }
    //   let firstIndex = (this.currentPage - 1) * this.pageSize
    //   let lastIndex = (this.currentPage * this.pageSize - 1)
    //   this.subEmployeeDataList = this.employeeDataList.filter((item, index) => {
    //     return index >= firstIndex && index <= lastIndex
    //   })
    // }
  },
  mounted () {
    this.checkAuthen()
    this.loader = this.getLoader()
    this.init()
  },
  methods: {
    ...mapActions('workAssign', ['_getEmployeeList']),
    ...mapActions('employee', ['getEmployeeByStoreId']),
    ...mapActions('account', ['getAllStore']),
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
    init () {
      let _this = this
      new Promise((resolve, reject) => {
        resolve()
      }).then(() => {
        return _this.getAllStore()
      }).then(res => {
        if (res.data) {
          _this.storeList = res.data
          _this.searchStoreId = _this.storeList[0].id
        }
        _this.numOfPage = Math.ceil(_this.accountData.length / _this.pageSize)
        _this.changePage()
        _this.closeLoader(_this.loader)
      }).then(() => {
        _this.changeStoreSearch()
      })
    },
    // handleClicked (index, row, typeButton) {
    //   this.$confirm('Do you want to ' + String(typeButton).toLowerCase() + ' ' + row.name + ' ?', 'Warning', {
    //     confirmButtonText: 'Yes',
    //     cancelButtonText: 'No',
    //     type: 'warning'
    //   }).then(() => {
    //     let empDataset = row
    //     empDataset.active = typeButton === 'Active'
    //     this.loader = this.getLoader()
    //     return this.updateStatusEmployee(empDataset)
    //   }).then(res => {
    //     if (res) {
    //       row.active = typeButton === 'Active'
    //       this.showMessage(typeButton + ' user successful !!!', 'success')
    //     }
    //     this.closeLoader(this.loader)
    //   })
    // },
    empRowClick (row) {
      let storeSearch = this.storeList.filter(item => {
        return item.id === this.searchStoreId
      })
      sessionStorage.setItem('EMP_ID', row.id)
      sessionStorage.setItem('STORE_NAME', storeSearch[0].name)
      this.transitTo('UserDetail')
    },
    changeStoreSearch () {
      let _this = this
      new Promise((resolve, reject) => {
        resolve()
      }).then(() => {
        return _this.getEmployeeByStoreId(_this.searchStoreId)
      }).then(res => {
        _this.subEmployeeDataList = res
      })
    },
    changePage () {
      let firstIndex = (this.currentPage - 1) * this.pageSize
      let lastIndex = (this.currentPage * this.pageSize - 1)
      if (this.employeeDataList.length > 0) {
        this.subEmployeeDataList = this.employeeDataList.filter((item, index) => {
          return index >= firstIndex && index <= lastIndex
        })
      } else {
        this.subEmployeeDataList = this.accountData.filter((item, index) => {
          return index >= firstIndex && index <= lastIndex
        })
      }
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
    },
    /**
     * Show default message
     * @param message
     * @param type
     */
    showMessage (message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    /**
     * Check Authen
     */
    checkAuthen () {
      if (!sessionStorage.getItem('username')) {
        this.transitTo('Login', undefined)
      }
    }
  }
}
</script>
<style>
  /* .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: white;
  }
  .el-button {
    color: black;
  } */
</style>
