const {GenerateElements} = require("./GenerateElements");
const path = require("path");
const fs = require("fs");

let generateElements = new GenerateElements();

let clildPackages = [];
let directoryDestination = '';
let packageName = '';
let directory = '';
let idElement = 0;
class ExportDiagramClass{
    init () {
        app.commands.register(
            'export-class-diagram-HTML',
            this.handleExportDiagram.bind(this)
        )
    }

    handleExportDiagram () {
        idElement = 0;
        let path = null;
        let self  = this;
        generateElements.clearPropertis();
        app.elementPickerDialog.showDialog(
            "Select root package",
            null,
            type.UMLPackage
        )
            .then(function ({buttonId, returnValue}) {
                if (buttonId === 'ok') {
                    packageName = returnValue.name;
                    returnValue.idParent = '';
                    path = self.selectDirectorySaveDiagram();
                    if(path !== undefined){
                        directory = path[0]
                    }else {
                        return window.alert('Directory was not selected.');
                    }
                    self.getElementsOfPackages([
                        returnValue
                    ]);
                    self.saveDiagramInDirectoryDestination();
                }
            });
    }

    selectDirectorySaveDiagram () {
        return app.dialogs.showOpenDialog(
            'Exported diagram in directory?',
            null,
            null,
            {properties: ['openFile', 'openDirectory']}
        );
    }

    getElementsOfPackages (ownerElements) {
        clildPackages = [];
        ownerElements.forEach((element) => {
            this.createElement(element, idElement);
        });

        if(clildPackages.length != 0){
            this.getElementsOfPackages(clildPackages);
        }
    }

    createElement (element) {
        let constructor = element.constructor.name;
        let ico = null;

        if(constructor === 'UMLPackage'){
            generateElements.setElementPackage({
                name: element.name,
                idElement: idElement,
                idParent: element.idParent,
            });

            (element.ownedElements).map((element) => {
                element.idParent = idElement
            });

            clildPackages = [...clildPackages, ...element.ownedElements];
            idElement++;
            return;
        }

        if(constructor === 'UMLClass' || constructor === 'UMLInterface'){
            ico = constructor === 'UMLClass'? 1: 2;
            generateElements.setElementOfDom({
                name: element.name,
                attributes: element.attributes,
                operations: element.operations,
                idElement: idElement,
                idParent: element.idParent,
            }, ico);
            idElement++;
            return;
        }
    }

    saveDiagramInDirectoryDestination () {
        if(directory != undefined){
            directoryDestination = directory + '/diagram ' + packageName;
            this.exportDirectory();
            this.createIndex();
        }
    }

    exportDirectory() {
        let pathDirectory = path.join(__dirname, "../diagram/demo")
        let files = fs.readdirSync(pathDirectory);

        if(!fs.existsSync(directoryDestination)){
            fs.mkdirSync(directoryDestination);
        }

        files.forEach((file)=> {
            let origin = path.join(pathDirectory, file)
            let destination = path.join(directoryDestination, file)
            fs.copyFileSync(origin, destination);
        });
    }

    createIndex () {
        let pathIndex = directoryDestination + '/index.html';
        let componentsPath = path.join(
            __dirname,
            "../diagram/components/"
        );
        let html = fs.readFileSync(componentsPath + 'header.html', "utf8") +
            generateElements.getHtml() +
            fs.readFileSync(componentsPath + 'footer.html', "utf8");


        fs.writeFile(pathIndex, html, (err) => {
            if(err != null){
                window.alert('Error: ' + err)
            }
            window.alert('proccess end.')
        })
    }
}
exports.ExportDiagramClass = ExportDiagramClass;