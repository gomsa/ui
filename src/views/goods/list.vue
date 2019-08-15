<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-permit="['ui_goods_add']" v-waves class="filter-item" type="success" icon="el-icon-plus" @click="handleCreate">
        {{ $t('goods.create') }}
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item :label="$t('goods.id')">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item :label="$t('goods.code')">
              <span>{{ props.row.code }}</span>
            </el-form-item>
            <el-form-item :label="$t('goods.name')">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <!-- <el-form-item :label="$t('goods.status')">
              <span>{{ props.row.status }}</span>
            </el-form-item> -->
            <el-form-item :label="$t('goods.brand')">
              <span>{{ props.row.brand.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('goods.category')">
              <span>{{ props.row.category.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('goods.department')">
              <span>{{ props.row.department.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('goods.firm')">
              <span>{{ props.row.firm.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('goods.unspsc')">
              <span>{{ props.row.unspsc.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('goods.taxcode')">
              <span>{{ props.row.taxcode.code }}</span>
              <span>{{ props.row.taxcode.name }}</span>
            </el-form-item>
          </el-form>
          <el-table
            :data="props.row.barcodes"
            style="width: 100%"
            class="el-table--border"
          >
            <el-table-column :label="$t('goods.barcode.imgage')" prop="code" align="center" width="300">
              <template slot-scope="scope">
                <img :src="scope.row.imgage" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              :label="$t('goods.barcode.id')"
              align="center"
              width="180"
            />
            <el-table-column
              prop="price"
              :label="$t('goods.barcode.price')"
              align="center"
            />
            <el-table-column
              prop="width"
              :label="$t('goods.barcode.width')"
              align="center"
              width="180"
            />
            <el-table-column
              prop="height"
              :label="$t('goods.barcode.height')"
              align="center"
            />
            <el-table-column
              prop="depth"
              :label="$t('goods.barcode.depth')"
              align="center"
            />
            <el-table-column
              prop="unit"
              :label="$t('goods.barcode.unit')"
              align="center"
            />
            <el-table-column
              prop="spec"
              :label="$t('goods.barcode.spec')"
              align="center"
            />
            <el-table-column
              prop="grossweight"
              :label="$t('goods.barcode.grossweight')"
              align="center"
            />
            <el-table-column
              prop="netweight"
              :label="$t('goods.barcode.netweight')"
              align="center"
            />
          </el-table>
        </template>
      </el-table-column>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="form" class="table-expand" label-width="120px">
        <el-form-item :label="$t('goods.taxcode')">
          <span>123456</span>
        </el-form-item>
        <el-form-item :label="$t('goods.taxcode')">
          <span>123456</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('goods.cancel') }}
        </el-button>
        <el-button :disabled="dialogDisabled" type="primary" @click="updateGoods()">
          {{ $t('goods.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { List, Delete } from '@/api/goods'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'GoodsList',
  components: {
    Pagination
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
      },
      // 弹窗控制
      dialogFormVisible: false,
      dialogStatus: '',
      dialogDisabled: true,
      textMap: {
        update: '编辑商品',
        create: '添加商品'
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
        this.list = response.data.goods
        // this.total = response.data.total

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
        good: {
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
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dialogDisabled = false
    },
    handleUpdate(row) {
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.33%;
  }
</style>
