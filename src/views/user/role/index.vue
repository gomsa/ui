<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="success" icon="el-icon-plus" @click="handleCreate">
        {{ $t('userRole.create') }}
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('userRole.id')" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userRole.name')" prop="name" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userRole.display_name')" prop="display_name" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.display_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userRole.description')" prop="description" align="center" min-width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userRole.created_at')" prop="created_at" sortable="custom" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userRole.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="warning" @click="handleRermission(row)">
            {{ $t('userRole.permission') }}
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('userRole.edit') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDeleted(row)">
            {{ $t('userRole.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('userRole.name')" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item :label="$t('userRole.display_name')" prop="display_name">
          <el-input v-model="formData.display_name" />
        </el-form-item>
        <el-form-item :label="$t('userRole.description')" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('userRole.cancel') }}
        </el-button>
        <el-button :disabled="dialogDisabled" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('userRole.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { List, Create, Delete, Update } from '@/api/role'
import { All } from '@/api/permission'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'RoleList',
  components: {
    Pagination
  },
  directives: { waves },
  props: {},
  data() {
    return {
      // 权限列表
      permissions: {},
      // list 列表
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: 'created_at desc'
      },
      // 弹窗控制
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑权限',
        create: '添加权限'
      },
      // form 数据
      dialogDisabled: false, // 创建权限和更新权限按钮提示后禁用
      formData: {
        id: 0,
        name: '',
        display_name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色标识', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        display_name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log(parseTime)
    this.getPermissions()
    this.getList()
  },
  mounted() {},
  methods: {
    initFormData() {
      this.formData = {
        id: 0,
        name: '',
        display_name: '',
        description: ''
      }
    },
    getPermissions() {
      All().then(response => {
        const data = response.data.permissions
        for (const key in data) {
          if (this.permissions[data[key].service]) {
            this.permissions[data[key].service] = []
            this.permissions[data[key].service].push(data[key])
          } else {
            this.permissions[data[key].service].push(data[key])
          }
        }
        console.log(this.permissions)
      })
    },
    sortChange(data) {
      if (data.prop) {
        this.listQuery.sort = (data.prop + ' ' + data.order).replace('ending', '')
        this.getList()
      }
    },
    getList() {
      this.listLoading = true
      List(this.listQuery).then(response => {
        this.list = response.data.roles
        this.total = response.data.total

        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.initFormData()
    },
    handleRermission(row) {
      console.log(row)
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.formData = {
        id: row.id,
        name: row.name,
        display_name: row.display_name,
        description: row.description
      }
    },
    handleDeleted(row) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteData(id) {
      Delete({ id: id }).then(response => {
        const valid = response.data.valid
        if (valid) {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogDisabled = true
          Create(this.formData).then(response => {
            if (valid) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '添加成功',
                message: '添加权限',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogDisabled = true
          Update(this.formData).then(response => {
            if (response.data.valid) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '更新成功',
                message: '更新权限',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
