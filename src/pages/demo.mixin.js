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
        }
    },
    methods:{
        initChart(){
            jsPlumb.ready(()=>{
                
                this.initOPtions={
                    DragOptions: { 
                        cursor: 'pointer',
                         zIndex: 2000 
                    },
                    ConnectionOverlays: [
                        [ "Arrow", {
                            location: 1,
                            visible:true,
                            width:11,
                            length:11,
                            id:"ARROW",
                            events:{
                                click:function() { alert("you clicked on the arrow overlay")}
                            }
                        } ],
                        [ "Label", {
                            location: 0.1,
                            id: "label",
                            cssClass: "aLabel",
                            events:{
                                tap:function() { alert("hey"); }
                            }
                        }]
                    ],
                    Container: "canvas"
                }
                this.instance= jsPlumb.getInstance(this.initOPtions);
            
                this.basicType = {
                    connector: "StateMachine",
                    paintStyle: { stroke: "red", strokeWidth: 4 },
                    hoverPaintStyle: { stroke: "blue" },
                    overlays: [
                        "Arrow"
                    ]
                };
                this.instance.registerConnectionType("basic", this.basicType);
            
                this.connectorPaintStyle = { 
                        strokeWidth: 2,
                        stroke: "#61B7CF",
                        joinstyle: "round",
                        outlineStroke: "white",
                        outlineWidth: 2
                    }
                // .. and this is the hover style.
                this.connectorHoverStyle = {
                        strokeWidth: 3,
                        stroke: "#216477",
                        outlineWidth: 5,
                        outlineStroke: "white"
                    }
                this.endpointHoverStyle = {
                        fill: "#216477",
                        stroke: "#216477"
                    }
                // the definition of source endpoints (the small blue ones)
                this.sourceEndpoint = {
                        endpoint: "Dot",
                        paintStyle: {
                            stroke: "#7AB02C",
                            fill: "transparent",
                            radius: 7,
                            strokeWidth: 1
                        },
                        isSource: true,
                        connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
                        connectorStyle: this.connectorPaintStyle,
                        hoverPaintStyle: this.endpointHoverStyle,
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
                this.targetEndpoint = {
                        endpoint: "Dot",
                        paintStyle: { fill: "#7AB02C", radius: 7 },
                        hoverPaintStyle: this.endpointHoverStyle,
                        maxConnections: -1,
                        dropOptions: { hoverClass: "hover", activeClass: "active" },
                        isTarget: true,
                        overlays: [
                            [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
                        ]
                    }
                this.instance.batch(this.drawing);
            
                jsPlumb.fire("jsPlumbDemoLoaded", this.instance);
            })
        },

        init(connection){
            connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
        },

        addEndpoints(toId, sourceAnchors, targetAnchors){
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                this.instance.addEndpoint("flowchart" + toId, this.sourceEndpoint, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                });
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                this.instance.addEndpoint("flowchart" + toId, this.targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
            }
        },

        drawing(){
            this.addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);
            this.addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
            this.addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
            this.addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
    
            this.instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
            this.instance.connect({uuids: ["Window2BottomCenter", "Window3TopCenter"]});
            this.instance.connect({uuids: ["Window2LeftMiddle", "Window4LeftMiddle"]});
            this.instance.connect({uuids: ["Window4TopCenter", "Window4RightMiddle"]});
            this.instance.connect({uuids: ["Window3RightMiddle", "Window2RightMiddle"]});
            this.instance.connect({uuids: ["Window4BottomCenter", "Window1TopCenter"]});
            this.instance.connect({uuids: ["Window3BottomCenter", "Window1BottomCenter"] });
            
            this.instance.bind("connection",(connInfo, originalEvent)=> {
                this.init(connInfo.connection);
            });
    
            this.instance.bind("click", function (conn, originalEvent) {
                conn.toggleType("basic");
            });
    
            this.instance.bind("connectionDrag", function (connection) {
                console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
            });
    
            this.instance.bind("connectionDragStop", function (connection) {
                console.log("connection " + connection.id + " was dragged");
            });
    
            this.instance.bind("connectionMoved", function (params) {
                console.log("connection " + params.connection.id + " was moved");
            });

        }


    },
    

}