<template>
  <div id="demo">
        <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">
            <div class="window jtk-node" id="flowchartWindow1"><strong>1</strong><br/><br/></div>
            <div class="window jtk-node" id="flowchartWindow2"><strong>2</strong><br/><br/></div>
            <div class="window jtk-node" id="flowchartWindow3"><strong>3</strong><br/><br/></div>
            <div class="window jtk-node" id="flowchartWindow4"><strong>4</strong><br/><br/></div>
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
@import '../css/main.css';
@import '../css/jsplumb.css';
@import '../css/jsplumbtoolkit-defaults.css';
@import '../css/jsplumbtoolkit-demo.css';
@import '../css/demo.css';
#demo{
    height: 100%;
    
}

#canvas{
    height: 100%;
    max-height: initial;
}


</style>
