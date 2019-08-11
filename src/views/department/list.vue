<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="form.id" size="mini" :min="100" :max="1000" class="appendInput" type="number" placeholder="部门编码">
        <template slot="prepend">编码</template>
      </el-input>
      <el-input v-model="form.name" size="mini" class="appendInput" placeholder="部门名称">
        <template slot="prepend">名称</template>
      </el-input>
      <el-button type="primary" size="mini" @click="addDepartment()">添加部门
      </el-button>
    </div>
    <div class="filter-container">123
    </div>
    <el-tree
      v-if="disable"
      ref="tree"
      :data="data"
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
      node-key="id"
      :expand-on-click-node="false"
      :default-expanded-keys="defaultExpandedKeys"
      :render-content="renderContent"
    />

    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <el-input v-model="name" v-focus size="mini" class="appendInput" placeholder="部门名称">
          <template slot="prepend">部门名称</template>
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handerAppend()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { List, Create, Delete } from '@/api/department'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Department',
  components: {
  },
  directives: {
    waves,
    focus: {
      inserted: function(el) {
        el.querySelector('input').focus()
      }
    }
  },
  props: {},
  data() {
    return {
      node: '',
      name: '',
      dialogVisible: false,
      disable: true,
      data: [],
      form: {
        id: 100,
        name: ''
      },
      defaultExpandedKeys: [],
      props: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    loadNode(node, resolve) {
      let parent = 0
      if (node.level > 0) {
        parent = node.data.id
      }
      List({
        parent: parent
      }).then(response => {
        const departments = response.data.departments
        if (departments) {
          return resolve(departments)
        }
        return resolve([])
      })
      return resolve([])
    },
    // 增加根目录节点
    addDepartment() {
      this.form.id = Number(this.form.id)
      Create(this.form).then(response => {
        const valid = response.data.valid
        if (valid) {
          this.disable = false
          setTimeout(() => {
            this.disable = true
          }, 1)
        }
      })
    },
    append(node, data) {
      this.dialogVisible = true
      this.node = node
    },
    handerAppend() {
      const newChild = { parent: this.node.data.id, name: this.name }
      Create(newChild).then(response => {
        const valid = response.data.valid
        if (valid) {
          this.node.loaded = false
          this.node.expand()
        }
      })
    },
    // 远程删除成功删除本地
    remove(node, data) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Delete({ id: data.id }).then(response => {
          const valid = response.data.valid
          if (valid) {
            this.$refs.tree.remove(node)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='department_rows'>
          <span>
            <el-tag size='mini'>{node.data.id}</el-tag>
            <span> {node.label} </span>
          </span>
          <span>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.append(node, data) }>添加子部门</el-button>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.remove(node, data) }>删除部门</el-button>
          </span>
        </span>)
    }
  }
}
</script>

<style lang="scss">
  .department_rows{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .appendInput{
    width:20vw
  }
</style>
