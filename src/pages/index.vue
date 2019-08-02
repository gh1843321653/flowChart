<template>
  <div id="demo">
        <button @click="saveChart">保存</button>
        <button @click="renderChart">绘制</button>
        <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">
            <div class="window jtk-node" id="start-node" title="右键添加节点">
              <span class="item node-name">发起人</span>
              <br>
              <span class="item person-name"></span>
              <input type="hidden" class="data" value='{}'>
            </div>
            <ul id="menu">
              <li class="add  li">添加节点</li>
              <li class="edit li">编辑节点</li>
              <li class="delete li">删除节点</li>
            </ul>
        </div>
        <div id="node-editor" v-show="showEditor">
          <div class="row">
            <label for="">节点名称:</label>
            <input type="text" v-model="editData.nodeName">
          </div>
          <div class="row">
            <label for="">审批人:</label>
            <select name="" id="" v-model="editData.personName">
              <option value="zhangsan">张三</option>
              <option value="lisi">李四</option>
              <option value="wangwu">王五</option>
              <option value="zhaoliu">赵六</option>
              <option value="hanqi">韩琦</option>
            </select>
          </div>
          <div class="row">
            <label for="">操作权限:</label>
            <input type="checkbox" v-model="editData.optPms.tongyi" name="optPms"><label for="">同意</label>
            <input type="checkbox" v-model="editData.optPms.bohui" name="optPms"><label for="">驳回</label>
            <input type="checkbox" v-model="editData.optPms.zhidu" name="optPms"><label for="">只读</label>
          </div>
          <div class="btn-bar">
            <button class="cancel" @click="cancel">取消</button>
            <button class="confirm" @click="confirm">确定</button>
          </div>
        </div> 
  </div>
</template>
<script>
  import jsplumb from 'jsplumb'
  import mixin from './demo.mixin'
  export default {
      mixins:[mixin],
      data(){
        return {
          editData:{
            nodeId:'',
            nodeName:'',
            personName:"",
            optPms:{
              tongyi:false,
              bohui:false,
              zhidu:false
            }
          },

          showEditor:false

        }
      },
      methods:{
         
      },
      mounted(){
          this.initChart()
      }
  }
</script>

<style scoped lang="scss">
@import './css/main.css';
@import './css/jsplumb.css';
@import './css/jsplumbtoolkit-defaults.css';
@import './css/jsplumbtoolkit-demo.css';
@import './css/demo.css';
#demo{
    height: 100%;
}

#canvas{
    height: 100%;
    max-height: initial;
}

#menu{
  position: absolute;
  display: none;
  border: 1px solid #eee;
  z-index: 1221;
  background-color: #fff;
  font-size:0px;
  &.visible{
    display: block;
  }
  .li{
    float:none;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding:0px 10px;
    &:hover{
      background-color: #eee;
      color: inherit;
    }
  }

}

/deep/ .flowchart-demo  .window {
    width: 80px;
    height: 80px;
    border: 1px solid #346789;
    box-shadow: 2px 2px 19px #aaa;
    border-radius: 0.5em;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    text-align: center;
    position: absolute;
    background-color: #eeeeef;
    color: black;
    font-family: helvetica, sans-serif;
    padding: 0.5em;
    font-size: 0.9em;
    box-sizing: border-box;
    transition: box-shadow 0.15s ease-in;
    &:hover {
        box-shadow: 2px 2px 19px #444;
        opacity: 0.6;
    }
    .item{
      flex:100%;

    }
  
}

#start-node{
  top: 40%;
  left:50px;
 
}

.flowchart-demo .active {
    border: 1px dotted green;
}

.flowchart-demo .hover {
    border: 1px dotted red;
}

.flowchart-demo .jtk-connector {
    z-index: 4;
}



.flowchart-demo /deep/ .jtk-endpoint, 
.endpointTargetLabel, 
.endpointSourceLabel {
    z-index: 21;
    cursor: pointer;
}

.flowchart-demo .aLabel {
    background-color: white;
    padding: 0.4em;
    font: 12px sans-serif;
    color: #444;
    z-index: 21;
    border: 1px dotted gray;
    opacity: 0.8;
    cursor: pointer;
}

.flowchart-demo .aLabel.jtk-hover {
    background-color: #5C96BC;
    color: white;
    border: 1px solid white;
}

.window.jtk-connected {
    border: 1px solid green;
}

.jtk-drag {
    outline: 4px solid pink !important;
}

path, .jtk-endpoint {
    cursor: pointer;
}

.jtk-overlay {
    background-color:transparent;
}

#node-editor{
  border: 1px solid #eee;
  width: 300px;
  padding: 10px;
  position: absolute;
  z-index:1111;
  background-color: #fff;
  .row{
    padding: 5px 0px;
    label{
      margin-right: 10px;
      width: 100px;
    }
  }
  .btn-bar{
    text-align: center;
    button{
      margin:0px 10px;
    }
  }

}
</style>
