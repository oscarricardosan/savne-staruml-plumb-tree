const addDataIdsInElements = () => {
    let idParentBlock = null;
    let parentFirstChild = null;
    let blocks = ($('div[data-id]'))
    blocks.each((block) => {
        if (block == 0) return;
        idParentBlock = $('#node_' + block).data('parent');
        if(idParentBlock === '') return;
        parentFirstChild = $('#node_' + idParentBlock).attr('data-first-child');
        if (parentFirstChild === ''){
            addDataNextSiblingInblocks(idParentBlock)
            $('#node_' + idParentBlock).attr('data-first-child', block)
        }
    })
};

const addDataNextSiblingInblocks = (idParentBlock) => {
    let nextId = null;
    let blocksChild = $('div [data-parent=' + idParentBlock + ']');
    for (let block = 0; block < (blocksChild.length - 1); block++){
        nextId = $('#' + blocksChild[block + 1].id).attr('data-id');
        $('#' + blocksChild[block].id).attr('data-next-sibling', nextId);
    }
};

jsPlumb.ready(function () {
    var connectorPaintStyle = {
        lineWidth: 3,
        strokeStyle: "#17A2B8",
        joinstyle: "round"
    };
    var pdef = {
        DragOptions: null,
        Container: "treemain"
    };
    var plumb = jsPlumb.getInstance(pdef);
    var opts = {
        prefix: 'node_',
        baseLeft: 24,
        baseTop: 24,
        nodeWidth: 100,
        hSpace: 50,
        vSpace: 30,
        imgPlus: 'tree_expand.png',
        imgMinus: 'tree_collapse.png',
        sourceAnchor: [1, 0.5, 1, 0, 10, 0],
        targetAnchor: "LeftMiddle",
        sourceEndpoint: {
            endpoint: ["Image", {url: "tree_collapse.png"}],
            cssClass: "collapser",
            isSource: true,
            connector: ["Flowchart", {stub: [40, 60], gap: [10, 0], cornerRadius: 5, alwaysRespectStubs: false}],
            connectorStyle: connectorPaintStyle,
            enabled: false,
            maxConnections: -1,
            dragOptions: null
        },
        targetEndpoint: {
            endpoint: "Blank",
            maxConnections: -1,
            dropOptions: null,
            enabled: false,
            isTarget: true
        },
        connectFunc: function (tree, node) {
            var cid = node.data('id');
            console.log('Connecting node ' + cid);
        }
    };
    var tree = jQuery.jsPlumbTree(plumb, opts);
    addDataIdsInElements();
    tree.init();
    window.treemain = tree;
});