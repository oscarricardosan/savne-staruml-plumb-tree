const { ExportDiagramClass } = require('./src/ExportDiagramClass')
let exportDiagram = new ExportDiagramClass();

exports.init = () => {
    exportDiagram.init();
};