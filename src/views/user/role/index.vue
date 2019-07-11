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
      <el-table-column :label="$t('userRole.label')" prop="label" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userRole.name')" prop="name" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
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
      <el-table-column :label="$t('userRole.actions')" align="center" width="350" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="handleFrontPermit(row)">
            {{ $t('userRole.front_permit') }}
          </el-button>
          <el-button type="warning" size="mini" @click="handlePermission(row)">
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
        <el-form-item :label="$t('userRole.label')" prop="label">
          <el-input v-model="formData.label" />
        </el-form-item>
        <el-form-item :label="$t('userRole.name')" prop="name">
          <el-input v-model="formData.name" />
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
    <el-dialog title="前端权限管理" :visible.sync="dialogFrontPermitVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item
          v-for="(item,key) in front_permits"
          :key="key"
          :label="key"
        >
          <checkbox-indeterminate
            v-if="dialogFrontPermitVisible"
            v-model="checkedPermissions"
            :options="item"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFrontPermitVisible = false">
          {{ $t('userRole.cancel') }}
        </el-button>
        <el-button :disabled="dialogDisabled" type="primary" @click="updateRolePermissions()">
          {{ $t('userRole.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限管理[API]" :visible.sync="dialogPermissionVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item
          v-for="(item,key) in permissions"
          :key="key"
          :label="key"
        >
          <checkbox-indeterminate
            v-if="dialogPermissionVisible"
            v-model="checkedPermissions"
            :options="item"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPermissionVisible = false">
          {{ $t('userRole.cancel') }}
        </el-button>
        <el-button :disabled="dialogDisabled" type="primary" @click="updateRolePermissions()">
          {{ $t('userRole.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { List, Create, Delete, Update } from '@/api/role'
import { All as PermissionAll } from '@/api/permission'
import { All as FrontPermitAll } from '@/api/front-permit'
import { GetPermissions, UpdatePermissions } from '@/api/casbin'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'

import CheckboxIndeterminate from '@/components/CheckboxIndeterminate'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'RoleList',
  components: {
    CheckboxIndeterminate,
    Pagination
  },
  directives: { waves },
  props: {},
  data() {
    return {
      // 权限列表
      front_permits: {},
      permissions: {},
      checkedPermissions: [],
      roleLabel: '', // 当前角色 label
      // 弹窗控制
      dialogFrontPermitVisible: false,
      dialogPermissionVisible: false,
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
        label: '',
        name: '',
        description: ''
      },
      rules: {
        label: [
          { required: true, message: '请输入角色标识', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log(parseTime(new Date()))
    this.getFrontPermit()
    this.getPermissions()
    this.getList()
  },
  mounted() {},
  methods: {
    initFormData() {
      this.formData = {
        id: 0,
        label: '',
        name: '',
        description: ''
      }
    },
    getFrontPermit() {
      FrontPermitAll().then(response => {
        const data = response.data.frontPermits
        // 分组 permission 赋值 key name
        for (const key in data) {
          const k = data[key].app + '_' + data[key].service
          if (!this.front_permits[k]) {
            this.front_permits[k] = []
            this.front_permits[k].push({
              label: data[key].app + '_' + data[key].service + '_' + data[key].method + '|',
              name: data[key].name
            })
          } else {
            this.front_permits[k].push({
              label: data[key].app + '_' + data[key].service + '_' + data[key].method + '|',
              name: data[key].name
            })
          }
        }
      })
    },
    getPermissions() {
      PermissionAll().then(response => {
        const data = response.data.permissions
        // 分组 permission 赋值 key name
        for (const key in data) {
          if (!this.permissions[data[key].service]) {
            this.permissions[data[key].service] = []
            this.permissions[data[key].service].push({
              label: data[key].service + '|' + data[key].method,
              name: data[key].name
            })
          } else {
            this.permissions[data[key].service].push({
              label: data[key].service + '|' + data[key].method,
              name: data[key].name
            })
          }
        }
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
        if (response.data.roles) {
          this.list = response.data.roles
          this.total = response.data.total
        }

        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    // 获取角色权限
    getRolePermission(row) {
      GetPermissions({ role: row.label }).then(response => {
        const perms = response.data.permissions
        if (perms) {
          for (const key in perms) {
            if (perms[key].method === undefined) {
              perms[key].method = ''
            }
            this.checkedPermissions.push(perms[key].service + '|' + perms[key].method)
          }
        }
      })
    },
    // 处理前端权限
    handleFrontPermit(row) {
      this.dialogFrontPermitVisible = true
      this.dialogDisabled = false
      // 初始化权限列表防止冲突
      this.checkedPermissions = []
      this.getRolePermission(row)
      this.roleLabel = row.label
    },
    // 更新角色权限
    updateRolePermissions() {
      const checked = this.checkedPermissions
      const perms = []
      for (const key in checked) {
        const c = checked[key].split('|')
        let service = ''
        let method = ''
        if (c[0] !== undefined) {
          service = c[0]
        }
        if (c[1] !== undefined) {
          method = c[1]
        }
        perms.push({
          service: service,
          method: method
        })
      }
      this.dialogDisabled = true
      UpdatePermissions({
        role: this.roleLabel,
        permissions: perms
      }).then(response => {
        if (response.data.valid) {
          this.dialogFrontPermitVisible = false
          this.dialogPermissionVisible = false
          this.$message({
            type: 'success',
            message: '角色权限更新成功!'
          })
        }
      })
    },
    handlePermission(row) {
      this.dialogPermissionVisible = true
      this.dialogDisabled = false
      // 初始化权限列表防止冲突
      this.checkedPermissions = []
      this.getRolePermission(row)
      this.roleLabel = row.label
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.initFormData()
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.formData = {
        id: row.id,
        label: row.label,
        name: row.name,
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
.el-button--mini{
  width: auto;
}
</style>
