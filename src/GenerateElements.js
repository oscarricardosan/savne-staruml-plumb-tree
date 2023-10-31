var html = '';
class GenerateElements {
    clearPropertis() {
        html = '';
    }

    getHtml() {
        return html;
    }

    setElementOfDom(element, ico) {
        html += '<div id="node_' + element.idElement + '" class="window hidden"\n' +
            'data-id="' + element.idElement + '"\n' +
            'data-parent="' + element.idParent + '"\n' +
            'data-first-child=""\n' +
            'data-next-sibling="">\n' +
            '<div class="header">\n';

        if(ico === 1){
            html += '<svg class="ico class-ico" id="Layer_1"  xmlns="http://www.w3.org/2000/svg"' +
                'viewBox="0 0 32 32" width="32px" xml:space="preserve">' +
                '<path d="M14,6c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-9.958,9.958C0.334,14.866,0,15.271,0,16s0.279,1.08,0.646,1.447  l9.974,9.973C11.006,27.807,11.469,28,12,28c1.188,0,2-1.016,2-2c0-0.516-0.186-0.986-0.58-1.38L4.8,16l8.62-8.62  C13.814,6.986,14,6.516,14,6z M31.338,14.538L21.38,4.58C20.994,4.193,20.531,4,20,4c-1.188,0-2,1.016-2,2  c0,0.516,0.186,0.986,0.58,1.38L27.2,16l-8.62,8.62C18.186,25.014,18,25.484,18,26c0,0.984,0.813,2,2,2  c0.531,0,0.994-0.193,1.38-0.58l9.974-9.973C31.721,17.08,32,16.729,32,16S31.666,14.866,31.338,14.538z"/>' +
                '</svg>\n';
        }

        if(ico === 2){
            html += '<svg  viewBox="0 0 32 32" class="ico interface-ico" xmlns="http://www.w3.org/2000/svg">' +
                '<g data-name="Layer 2" id="Layer_2">' +
                '<path d="M26,22a4,4,0,0,0-2.67,1L10,16.36c0-.12,0-.24,0-.36s0-.24,0-.36L23.33,9A4,4,0,1,0,22,6a3.81,3.81,0,0,0,.23,1.27L9.29,13.74a4,4,0,1,0,0,4.52l12.94,6.47A3.81,3.81,0,0,0,22,26a4,4,0,1,0,4-4ZM26,4a2,2,0,1,1-2,2A2,2,0,0,1,26,4ZM6,18a2,2,0,1,1,2-2A2,2,0,0,1,6,18ZM26,28a2,2,0,1,1,2-2A2,2,0,0,1,26,28Z"/>' +
                '</g>' +
                '</svg>'
        }

        html += '<h2 class="title-header">' + element.name + '</h2>\n' +
            '</div>\n' +
            '<div class="division"></div>\n' +
            '<div class="body">\n';

        if (element.attributes.length != 0) {
            html += '<h3>Attributes</h3>\n' +
                '<div class="list-elements">\n';

            for (let i = 0; i < element.attributes.length; i++) {
                html += ' <li>' + element.attributes[i].visibility +
                    '- <span> ' + element.attributes[i].name + '</span> -' +
                    element.attributes[i].type + '</li>\n';
            }
            html += '</div>\n';
        }

        if (element.operations.length != 0) {
            html += '<div class="division"></div>\n' +
                '<h3>Operations</h3>\n' +
                '<div class="list-elements">\n';

            for (let i = 0; i < element.operations.length; i++) {
                html +=  '<li>' + element.operations[i].visibility + ' - <span>'
                    + element.operations[i].name + '()</span></li>\n';
            }
            html += '</div>\n';
        }


        html += '</div>\n' +
            '</div>\n';
    }

    setElementPackage(element) {
        html += '<div id="node_' + element.idElement + '" class="window hidden"\n' +
            'data-id="' + element.idElement + '"\n' +
            'data-parent="' + element.idParent + '"\n' +
            'data-first-child=""\n' +
            'data-next-sibling="">\n' +
            '<div class="header">\n' +
            '<svg class="ico package-ico" height="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>\n' +
            '</svg>\n'+
            '<h2 class="title-header">' + element.name + '</h2>\n' +
            '</div>\n' +
            '</div>\n';
    }
}

exports.GenerateElements = GenerateElements;