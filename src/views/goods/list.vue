<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('goods.code')" prop="code" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.name')" prop="name" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.status')" prop="status" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.barcodes')" prop="barcodes" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.barcodes }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.brand')" prop="brand" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.category')" prop="category" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.department')" prop="department" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.firm')" prop="firm" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.firm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.unspsc')" prop="unspsc" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.unspsc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.taxcode')" prop="taxcode" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.taxcode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.updated_at')" prop="updated_at" sortable="custom" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.created_at')" prop="created_at" sortable="custom" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-permit="['ui_goods_update']" type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('goods.edit') }}
          </el-button>
          <el-button v-permit="['ui_goods_delete']" size="mini" type="danger" @click="handleDeleted(row)">
            {{ $t('goods.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { List, Delete } from '@/api/goods'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'GoodsList',
  components: {
  },
  directives: { waves },
  props: {},
  data() {
    return {
      listLoading: true,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 5,
        sort: 'created_at desc'
      }
    }
  },
  created() {
    console.log(parseTime(new Date()))
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      this.listLoading = true
      List({
        list_query: this.listQuery
      }).then(response => {
        this.list = response.data.users
        this.total = response.data.total

        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    sortChange(data) {
      if (data.prop) {
        this.listQuery.sort = (data.prop + ' ' + data.order).replace('ending', '')
        this.getList()
      }
    },
    handleUpdate(row) {
    },
    handleDeleted(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
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
      Delete({
        goods: {
          id: id
        }
      }).then(response => {
        const valid = response.data.valid
        if (valid) {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
