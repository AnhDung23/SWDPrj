!<template>
    <div id="userDetail">
        <el-row>
            <!-- <el-col>
                <h1>Thông tin nhân viên</h1>
            </el-col> -->
            <el-col>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Thông tin nhân viên</span>
                  </div>
                  <div class="text item">
                    {{'Họ và tên: ' +  empInfo.name}}
                  </div>
                  <div  class="text item">
                      {{'Địa chỉ: ' +  empInfo.address}}
                  </div>
                  <div  class="text item">
                      {{'Email: ' +  empInfo.email}}
                  </div>
                  <div  class="text item">
                      {{'Số điện thoại: ' +  empInfo.phone_number}}
                  </div>
                  <div  class="text item">
                      {{'Chức vụ: ' +  empInfo.employee_regency}}
                  </div>
                  <div  class="text item">
                      {{'Của hàng: ' +  storeNm}}
                  </div>
                  <div  class="text item">
                      {{'Lương/ngày: ' +  empInfo.salary + ' VNĐ'}}
                  </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      storeNm: '',
      empInfo: {
        address: '',
        email: '',
        employee_regency: '',
        name: '',
        phone_number: '',
        salary: ''
      },
      loader: {}
    }
  },
  mounted () {
    this.checkAuthen()
    // this.loader = this.getLoader()
    this.init()
  },
  methods: {
    ...mapActions('employee', ['getEmployeeByEmpId']),

    init () {
      let _this = this
      let empID = sessionStorage.getItem('EMP_ID')
      this.storeNm = sessionStorage.getItem('STORE_NAME')
      if (typeof empID !== 'undefined' || empID !== null) {
        empID = Number.parseInt(empID)
      }
      if (typeof this.storeNm === 'undefined' || this.storeNm === null) {
        this.storeNm = ''
      }
      new Promise((resolve, reject) => {
        resolve()
      }).then(() => {
        return _this.getEmployeeByEmpId(empID)
      }).then(res => {
        if (res) {
          this.empInfo = res
        }
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
    .text {
        font-size: 14px;
    }
    .item {
        margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
        margin-left: 25%;
        margin-top: 5%;
        width: 50%;
    }
</style>
