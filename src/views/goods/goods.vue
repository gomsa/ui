
<template>
  <span>
    <el-input v-model="barcode.id" v-focus size="small" placeholder="请输入条形码" style="width:270px;margin-bottom: 1.2vh;" @keyup.enter.native="pullBarcode()">
      <el-button slot="append" icon="el-icon-search" @click="pullBarcode()" />
    </el-input>
    <el-form ref="form" :model="form" class="form-expand" label-width="120px">
      <el-form-item :label="$t('goods.code')">
        <el-input v-model="form.code" size="small" @keyup.enter.native="pullOldData()">
          <el-button slot="append" @click="pullOldData()">同步</el-button>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('goods.name')">
        <el-input v-model="form.name" size="small" />
      </el-form-item>
      <el-form-item :label="$t('goods.en_name')">
        <el-input v-model="form.en_name" size="small" />
      </el-form-item>
      <el-form-item :label="$t('goods.brand')">
        <el-select v-model="form.brand_id" placeholder="请选择">
          <el-option
            v-for="item in brands"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('goods.firm')">
        <el-select v-model="form.firm_id" placeholder="请选择">
          <el-option
            v-for="item in firms"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('goods.unspsc')">
        <el-cascader
          v-model="unspscValue"
          size="small"
          :options="unspscOptions"
          :show-all-levels="false"
          :props="{
            expandTrigger: 'hover',
            value:'id',
            label:'name',
          }"
          @change="handleUnspscChange"
        />
      </el-form-item>

      <el-form-item :label="$t('goods.cess')">
        <el-input-number v-model="form.cess" size="small" :precision="2" :step="0.01" :max="0.13" :min="0" />
      </el-form-item>
      <el-form-item :label="$t('goods.barcodes')" style="width:100%">
        <el-table
          :data="form.barcodes"
          style="width: 100%"
          border
          fit
          highlight-current-row
        >
          <el-table-column :label="$t('goods.barcode.images')" prop="images" align="center" width="80">
            <template slot-scope="scope">
              <table-img
                v-if="scope.row.images"
                :images="scope.row.images"
              />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.id')" prop="id" align="center" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.id" size="mini" :placeholder="$t('goods.barcode.id')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.price')" prop="price" align="center" width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.price" size="mini" :precision="2" :step="0.01" :max="99999" :min="0" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.width')" prop="width" align="center" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.width" size="mini" :placeholder="$t('goods.barcode.width')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.height')" prop="height" align="center" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.height" size="mini" :placeholder="$t('goods.barcode.height')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.depth')" prop="depth" align="center" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.depth" size="mini" :placeholder="$t('goods.barcode.depth')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.unit')" prop="unit" align="center" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unit" size="mini" :placeholder="$t('goods.barcode.unit')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.spec')" prop="spec" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.spec" size="mini" :placeholder="$t('goods.barcode.spec')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.grossweight')" prop="grossweight" align="center" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.grossweight" size="mini" :placeholder="$t('goods.barcode.grossweight')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.barcode.netweight')" prop="netweight" align="center" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.netweight" size="mini" :placeholder="$t('goods.barcode.netweight')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('goods.actions')" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button v-permit="['ui_goods_delete']" size="mini" type="danger" @click="handleBarcodeDeleted(scope.$index)">
                {{ $t('goods.delete') }}
              </el-button>
            </template>
          </el-table-column></el-table>
      </el-form-item>
      <el-form-item :label="$t('goods.description')" style="width:100%">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
    </el-form>
  </span>
</template>
<script>

import { Get as BarcodeGet } from '@/api/barcode'
import { All as BrandAll, Exist as BrandExist, Create as BrandCreate } from '@/api/brand'
import { All as FirmAll, Exist as FirmExist, Create as FirmCreate } from '@/api/firm'
import { All as UnspscAll, Exist as UnspscExist, CheckCreate as UnspscCheckCreate } from '@/api/unspsc'

import TableImg from '@/components/TableImg'
import { convertTree } from '@/utils'

export default {
  name: 'Goods',
  components: {
    TableImg
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.querySelector('input').focus()
      }
    }
  },
  data() {
    return {
      barcode: {
        id: '',
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        unit: '',
        spec: '',
        grossweight: 0,
        netweight: 0,
        images: []
      },
      form: {
        code: '',
        name: '',
        en_name: '',
        description: '',
        cess: 0,
        unspsc_id: '',
        brand_id: '',
        firm_id: '',
        barcodes: [
        ]
      },
      unspsc_id: 0,
      unspscValue: [],
      unspscOptions: [],
      unspscs: [],
      brand_name: '',
      brands: [],
      firm_name: '',
      firms: []
    }
  },
  created() {
    this.getBrand()
    this.getFirm()
    this.getUnspsc()
  },
  mounted() {},
  methods: {
    initData() {
      this.barcode = {
        id: '',
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        unit: '',
        spec: '',
        grossweight: 0,
        netweight: 0,
        images: []
      }
      this.form = {
        code: '',
        name: '',
        en_name: '',
        description: '',
        cess: 0,
        unspsc_id: 0,
        brand_id: 0,
        firm_id: 0,
        barcodes: [
        ]
      }
    },
    // 删除指定条码
    handleBarcodeDeleted(index) {
      this.form.barcodes.splice(index, 1)
    },
    pullBarcode() {
      if (this.barcode) {
        // 检测条码不存在新加
        if (!this.isBarcode(this.barcode)) {
          this.form.barcodes.push(JSON.parse(JSON.stringify(this.barcode)))
        }
        BarcodeGet(this.barcode.id).then(response => {
          const goods = response.data.goods
          if (goods) {
            this.form.name = goods.name
            this.form.en_name = goods.en_name
            this.form.unspsc_id = goods.unspsc
            // 处理品牌
            this.brand_name = goods.brand_name
            this.handleBrand({
              name: goods.brand_name
            })
            // 处理公司 firm
            this.firm_name = goods.firm_name
            this.handleFirm({
              name: goods.firm_name,
              address: goods.firm_address
            })
            // 处理国际商品及服务编码
            if (goods.unspsc_name) { // 防止空 unspsc_name 创建
              this.unspsc_id = goods.unspsc
              this.handleUnspsc({
                id: goods.unspsc,
                name: goods.unspsc_name
              })
            }
            // 条码信息添加
            this.handleBarcode(goods)
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '条形码为空,请输入条形码'
        })
      }
    },
    // 处理条码
    handleBarcode(goods) {
      this.form.barcodes.forEach(barcode => {
        if (barcode.id === goods.barcode) {
          if (goods.width) {
            barcode.width = goods.width
          }
          if (goods.height) {
            barcode.height = goods.height
          }
          if (goods.depth) {
            barcode.depth = goods.depth
          }
          if (goods.unit) {
            barcode.unit = goods.unit
          }
          if (goods.specification) {
            barcode.spec = goods.specification
          }
          if (goods.grossweight) {
            barcode.grossweight = goods.grossweight
          }
          if (goods.netweight) {
            barcode.netweight = goods.netweight
          }
          if (goods.images) {
            barcode.images = goods.images
          }
        }
      })
    },
    isBarcode(code) {
      let valid = false
      this.form.barcodes.forEach(barcode => {
        if (barcode.id === code.id) {
          valid = true
        }
      })
      return valid
    },
    // 获取 Brand
    async getFirm() {
      await FirmAll().then(response => {
        const firms = response.data.firms
        this.firms = firms
      })
    },
    async handleFirm(firm) {
      // 自动同步 Firm 公司
      await FirmExist(firm).then(async response => {
        const valid = response.data.valid
        if (!valid) {
          await FirmCreate(firm).then(async response => {
            if (response.data.valid) {
              // 重新获取  firm 数据
              await this.getFirm()
              this.$message({
                type: 'success',
                message: '自动创建 公司 成功'
              })
            }
          })
        }
      })
      // form 赋值公司
      this.firms.forEach(firm => {
        if (firm.name === this.firm_name) {
          this.form.firm_id = firm.id
        }
      })
    },
    // 获取 Brand
    async getBrand() {
      await BrandAll().then(response => {
        const brands = response.data.brands
        this.brands = brands
      })
    },
    async handleBrand(brand) {
      // 自动同步 brand 品牌
      await BrandExist(brand).then(async response => {
        const valid = response.data.valid
        if (!valid) {
          await BrandCreate(brand).then(async response => {
            if (response.data.valid) {
              // 重新获取  brand 数据
              await this.getBrand()
              this.$message({
                type: 'success',
                message: '自动创建 Brand 品牌 成功'
              })
            }
          })
        }
      })
      // form 赋值品牌
      this.brands.forEach(brand => {
        if (brand.name === this.brand_name) {
          this.form.brand_id = brand.id
        }
      })
    },
    // 获取 unspsc
    async getUnspsc() {
      await UnspscAll().then(response => {
        const unspscs = response.data.unspscs
        if (unspscs) {
          this.unspscs = unspscs
          this.unspscOptions = convertTree(unspscs)
        }
      })
    },
    async handleUnspsc(unspsc) {
      await UnspscExist(unspsc).then(async response => {
        const valid = response.data.valid
        if (!valid) {
          await UnspscCheckCreate(unspsc).then(async response => {
            if (response.data.valid) {
              // 重新获取  Unspsc 数据
              await this.getUnspsc()
              this.$message({
                type: 'success',
                message: '自动创建 Unspsc 国际服务编码 分类成功'
              })
            }
          })
        }
      })
      this.convertUnspsc(this.unspsc_id)
    },
    // 处理 unspsc_id
    convertUnspsc(unspsc_id) {
      // 计算所选的 unspsc 所有 id 从高到底 从父到子
      const parents = []
      parents.push(unspsc_id)
      const getParent = (unspsc_id) => {
        this.unspscs.forEach(unspsc => {
          if (unspsc.id === unspsc_id) {
            if (unspsc.parent > 0) {
              parents.unshift(unspsc.parent)
            }
            getParent(unspsc.parent)
          }
        })
      }
      getParent(unspsc_id)
      // 赋值选择器选择的数据组
      this.unspscValue = parents
    },
    // 更新 form
    handleUnspscChange() {
      this.form.unspsc_id = this.unspscValue.pop()
    },
    // 拉去老商品数据
    pullOldData() {
      if (this.form.code) {
        console.log('拉取老数据', this.form.code)
      } else {
        this.$message({
          type: 'error',
          message: '自编码为空,请输入自编码'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .form-expand {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 0;
  }
  .form-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .form-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 1.2vh;
    width: 33.33%;
  }
</style>
