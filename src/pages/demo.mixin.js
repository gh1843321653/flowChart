export default{
    data(){
        return{
            instance:null,
            initOPtions:{},
            basicType:{},
            connectorPaintStyle:{},
            connectorHoverStyle:{},
            endpointHoverStyle:{},
            sourceEndpoint:{},
            targetEndpoint:{},

            chartData:{
                nodeList:[],
                connectionList:[]
            },
            flowData:[
                {
                    userId:"1111",
                    nextUserId:"2222,3333",//审批通过，下一执行人
                    backUserId:"",//审批不通过，返回到的执行人
                    readOnly:false,//只读
                },
                {
                    userId:"2222",
                    nextUserId:"",//审批通过，下一执行人
                    backUserId:"1111",//审批不通过，返回到的执行人
                    readOnly:false,//只读
                },
                {
                    userId:"3333",
                    nextUserId:"",//审批通过，下一执行人
                    backUserId:"",//审批不通过，返回到的执行人
                    readOnly:true,//只读
                },
            ],

            

        }
    },
    methods:{
        initChart(){
            jsPlumb.ready(()=>{
                this.initOPtions={
                    Container: "canvas",
                    ConnectionOverlays: [
                        [ "Arrow", {
                            location: 1,
                            visible:true,
                            width:11,
                            length:11,
                            id:"ARROW",
                            events:{
                                click:function() { }
                            }
                        } ],
                        [ "Label", {
                            location: 0.5,
                            label:"",
                            id: "label",
                            cssClass: "aLabel",
                            events:{
                                tap:function() {  }
                            }
                        }]
                    ],
                    PaintStyle: {
                        gradient: { stops: [
                            [ 0, "#0d78bc" ],
                            [ 1, "#558822" ]
                        ] },
                        stroke: "#558822",
                        strokeWidth: 10
                    },
                    DragOptions: { cursor: "pointer", zIndex: 2000 },
                    EndpointHoverStyle: { fill: "orange" },
                    HoverPaintStyle: { stroke: "orange" },
                    EndpointStyle: { width: 20, height: 16, stroke: '#666' },
                    Endpoint: "Rectangle",
                    Anchors: ["TopCenter", "TopCenter"],
                    Connector:"StateMachine",
                    
                }
                this.instance= jsPlumb.getInstance(this.initOPtions);
            
                this.basicType = {
                    connector: "StateMachine",
                    paintStyle: { stroke: "red", strokeWidth: 4 },
                    hoverPaintStyle: { stroke: "blue" },
                    overlays: [
                        "Arrow","Label"
                    ]
                };
                this.instance.registerConnectionType("basic", this.basicType);
            
                //连线样式
                this.connectorPaintStyle = { 
                        strokeWidth: 2,
                        stroke: "#61B7CF",
                        joinstyle: "round",
                        outlineStroke: "white",
                        outlineWidth: 2
                    }
                // 连线hover样式
                this.connectorHoverStyle = {
                        strokeWidth: 3,
                        stroke: "#216477",
                        outlineWidth: 5,
                        outlineStroke: "white"
                    }
               
                // 起始端点样式
                this.sourceEndpoint = {
                    isSource: true,
                    isTarget: true,
                    endpoint: "Dot",
                    paintStyle: {
                        stroke: "#7AB02C",
                        fill: "transparent",
                        radius: 7,
                        strokeWidth: 1
                    },
                    maxConnections: -1,//不限连接数
                    connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
                    connectorStyle: this.connectorPaintStyle,
                    connectorHoverStyle: this.connectorHoverStyle,
                    dragOptions: {},
                    overlays: [
                        [ "Label", {
                            location: [0.5, 1.5],
                            label: "Drag",
                            cssClass: "endpointSourceLabel",
                            visible:false
                        } ]
                    ]
                }

                //中止端点样式
                this.targetEndpoint = {
                    isTarget: true,
                    isSource: true,
                    endpoint: "Dot",
                    connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
                    connectorStyle: this.connectorPaintStyle,
                    connectorHoverStyle: this.connectorHoverStyle,
                    paintStyle: {
                        stroke: "#7AB02C",
                        fill: "transparent",
                        radius: 7,
                        strokeWidth: 1
                    },
                    maxConnections: -1,//不限连接数
                    overlays: [
                        [ "Label", { 
                            location: [0.5, -0.5], 
                            label: "Drop", 
                            cssClass: "endpointTargetLabel", 
                            visible:false } 
                        ]
                    ]
                }
                
                //this.instance.batch(this.drawing);
                this.registEvent()
                this.initStartNode()
                jsPlumb.fire("jsPlumbDemoLoaded", this.instance);

            })
        },

        //注册事件
        registEvent(){
            var _this=this
            var container=document.getElementById("canvas")
            var rightMenu=jsPlumb.getSelector("#menu")[0]
            
            jsPlumb.on(document,"click",(ev)=>{
                rightMenu.style.display="none"
            })

            jsPlumb.on(rightMenu,'click',(ev)=>{
                ev.stopPropagation()
                var rightMenu=jsPlumb.getSelector("#menu")[0]
                var target=ev.target
                if(target.classList.contains("add")){
                    this.addNode(ev)
                }else if(target.classList.contains("edit")){
                    let nodeEditor=document.querySelector("#node-editor")
                    this.showEditor=true
                    nodeEditor.style.left=ev.pageX+"px"
                    nodeEditor.style.top=ev.pageY+"px"
                }else if(target.classList.contains("delete")){
                    this.deleteNode()
                }

                rightMenu.style.display="none"
            })

            this.instance.bind("connection",(connInfo, originalEvent)=> {
                //connInfo.connection.getOverlay("label").setLabel("");
                _this.chartData.connectionList.push(connInfo)
                
            });

            this.instance.bind("click", function (conn, originalEvent) {
                //conn.toggleType("basic");
            });
            //连线右键
            this.instance.bind("contextmenu", (conn, ev)=> {
                conn.removeOverlay()
                _this.instance.deleteConnection(conn)
                ev.preventDefault()
                
                _this.chartData.connectionList=_this.chartData.connectionList.filter((item)=>{
                    if(item.connection.id===conn.id){
                        return false
                    }
                    return true
                })

            });
    
            this.instance.bind("connectionDrag", function (connection) {
                console.log();
            });
    
            this.instance.bind("connectionDragStop", function (connection) {
                console.log();
            });
    
            this.instance.bind("connectionMoved", function (params) {
                console.log();
            });


        },

        
        //添加节点
        addNode(ev){
            var left=ev.pageX
            var top=ev.pageY
            var node = document.createElement("div");
            var id = jsPlumbUtil.uuid();
            node.id = "id"+id;
            node.className = "window jtk-node";
            node.innerHTML = `<span class="item node-name">节点${id.substring(0, 3)}</span>
                            <hr class="item hr" />
                            <span class="item person-name">审批人</span>    
                            <input type="hidden" class='data' value=''>
                            `
            node.style.left = left + "px";
            node.style.top = top + "px";
            this.instance.getContainer().appendChild(node);
            this.initNode(node);
            return node;
        },

        initNode(node){
            var _this=this
            var id=node.id
            var rightMenu=jsPlumb.getSelector("#menu")[0]

            var pointTop=this.instance.addEndpoint(id, { anchor:"TopCenter"}, this.targetEndpoint);
            var pointRight=this.instance.addEndpoint(id, { anchor:"RightMiddle"}, this.sourceEndpoint);
            var pointBottom=this.instance.addEndpoint(id, { anchor:"BottomCenter"}, this.targetEndpoint);
            var pointLeft=this.instance.addEndpoint(id, { anchor:"LeftMiddle" }, this.targetEndpoint);
            pointTop.location='TopCenter'
            pointRight.location='RightMiddle'
            pointBottom.location='BottomCenter'
            pointLeft.location='LeftMiddle'
            this.instance.draggable(node,{ grid: [20, 20] });
            this.clearNodeObj(this.editData) 
            this.editData.nodeId=id
            var nodeData={
                nodeId:id,
                endpointList:[pointTop,pointRight,pointBottom,pointLeft],
                editData:Object.assign({},this.editData)
            }
            this.chartData.nodeList.push(nodeData)
            
            jsPlumb.on(node,"contextmenu",(ev)=>{
                _this.chartData.nodeList.forEach((node)=>{
                    if(node.nodeId===id){
                        _this.editData=Object.assign({},node.editData)
                       
                    }
                })
                ev.preventDefault()
                rightMenu.style.display="block"
                rightMenu.style.left=ev.clientX+30+"px"
                rightMenu.style.top=ev.clientY+"px"
            })
        },

        initStartNode(){
            var _this=this
            var startNode=jsPlumb.getSelector("#start-node")[0]
            var id=startNode.id
            var pointTop=this.instance.addEndpoint(id, { anchor:"TopCenter"}, this.targetEndpoint);
            var pointRight=this.instance.addEndpoint(id, { anchor:"RightMiddle"}, this.sourceEndpoint);
            var pointBottom=this.instance.addEndpoint(id, { anchor:"BottomCenter"}, this.targetEndpoint);
            var pointLeft=this.instance.addEndpoint(id, { anchor:"LeftMiddle"}, this.targetEndpoint);
            pointTop.location='TopCenter'
            pointRight.location='RightMiddle'
            pointBottom.location='BottomCenter'
            pointLeft.location='LeftMiddle'

            this.instance.draggable(startNode,{ grid: [20, 20] });
            this.editData.nodeId=id
            var nodeData={
                nodeId:id,
                endpointList:[pointTop,pointRight,pointBottom,pointLeft],
                editData:Object.assign({},this.editData)
            }
            this.chartData.nodeList.push(nodeData)
            jsPlumb.on(startNode,"contextmenu",(ev)=>{
                ev.preventDefault()
                _this.addNode(ev)
              
            })
           
        },

        //删除节点
        deleteNode(){
            var _this=this
            var container=document.getElementById("canvas")
            var nodeId=this.editData.nodeId
            var node=container.querySelector("#"+nodeId)
            var connectionIds=[]
            
            //删除界面节点元素
            container.removeChild(node)
             //删除界面连线
             this.chartData.connectionList=this.chartData.connectionList.filter((connObj)=>{
                if(connObj.sourceId===nodeId || connObj.targetId===nodeId){
                    //connObj.connection.removeOverlay()
                    _this.instance.deleteConnection(connObj.connection)
                    return false
                }
                return true
            })
            //删除界面端点
            this.chartData.nodeList=this.chartData.nodeList.filter((item)=>{
                if(item.nodeId===nodeId){
                    item.endpointList.forEach((item)=>{
                        _this.instance.deleteEndpoint(item)
                    })
                    return false
                }
                return true
            })
            
        },

        cancel(){
            this.showEditor=false
        },

        confirm(){
            var nodeEditor=document.querySelector("#node-editor")
            var curNode=jsPlumb.getSelector("#"+this.editData.nodeId)[0]
            var selectTag=nodeEditor.getElementsByTagName("select")[0]
            var selectedIndex=selectTag.selectedIndex
            this.chartData.nodeList.forEach((node)=>{
                if(node.nodeId===this.editData.nodeId){
                    node.editData=Object.assign({},this.editData)
                }
            })
            
            curNode.getElementsByClassName("node-name")[0].innerHTML=this.editData.nodeName
            curNode.getElementsByClassName("person-name")[0].innerHTML=selectTag.options[selectedIndex].text
            this.showEditor=false

        },

        clearNodeObj(nodeObj){
            for(var key in nodeObj){
                if(typeof nodeObj[key]==='string'){
                    this.$set(nodeObj,key,'')
                }else if(typeof nodeObj[key]==='boolean'){
                    this.$set(nodeObj,key,false)
                }else if(typeof nodeObj[key]==='object'){
                    this.clearNodeObj(nodeObj[key])
                }
            }
        },

        //保存流程图
        saveChart(){
            console.log(this.chartData)
            var connList=this.chartData.connectionList.map((connObj)=>{
                return{
                    sourceId:connObj.sourceId,
                    targetId:connObj.targetId,
                    sourceEndpoint:connObj.sourceEndpoint.location,
                    targetEndpoint:connObj.targetEndpoint.location,
                }
            })
            var nodeList=this.chartData.nodeList.map((node)=>{
                return{
                    nodeId:node.nodeId,
                    offsetLeft:node.endpointList[0].element.offsetLeft,
                    offsetTop:node.endpointList[0].element.offsetTop,
                    editData:node.editData,
                }
            })

            var saveData={ connList,nodeList}
           
            localStorage.setItem('chart',JSON.stringify(saveData))

        },

        //渲染流程图
       renderChart(chartData){
           var _this=this
           
           var chartData=JSON.parse(localStorage.getItem("chart"))
           
           chartData.nodeList.forEach((node)=>{
               _this.renderNode(node)
           })
           chartData.connList.forEach((line)=>{
               _this.renderLine(line)
           })

       },

       renderNode(nodeData){
           if(nodeData.nodeId==="start-node"){
                let node = document.querySelector("#start-node")
                node.style.left=nodeData.offsetLeft
                node.style.top=nodeData.offsetTop
                this.initStartNode()
                return
           }
            var left=nodeData.offsetLeft
            var top=nodeData.offsetTop
            var node = document.createElement("div");
            node.id = nodeData.nodeId
            node.className = "window jtk-node";
            node.innerHTML = `<span class="item node-name">${nodeData.editData.nodeName}</span>
                            <hr class="item hr" />
                            <span class="item person-name">${nodeData.editData.personName}</span>    
                            <input type="hidden" class='data' value=''>
                            `
            node.style.left = left + "px";
            node.style.top = top + "px";
            this.instance.getContainer().appendChild(node);
            this.initNode(node);
            return node;
       },

       renderLine(conn){
            var sourceEndpoint={}
            var targetEndpoint={}
            this.chartData.nodeList.forEach((node)=>{
                if(node.nodeId===conn.sourceId){
                    node.endpointList.some((ep)=>{
                        if(ep.location===conn.sourceEndpoint){
                            sourceEndpoint=ep
                            return true
                        }
                    })
                }
                if(node.nodeId===conn.targetId){
                    node.endpointList.some((ep)=>{
                        if(ep.location===conn.targetEndpoint){
                            targetEndpoint=ep
                            return true
                        }
                    })
                }
            })
            this.instance.connect({source:sourceEndpoint,target:targetEndpoint})
       }


    },
    

}

