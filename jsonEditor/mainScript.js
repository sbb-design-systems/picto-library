/*
DOM IDs:
- data-id = lib -> Set name
- data-index = lib -> Set -> Content index

Data types:
- text
- number
- link
*/
var lib = {};
var exports = {
  "designsystem": [
    {
      "name": "filename",
      "key": "",
      "type": "generated",
      "get": function(item, i) {
        return item.file_name.substring(5);
      }
    },
    {
      "name": "category",
      "key": "",
      "type": "generated",
      "get": function(item, i) {
        var picto = find("pictos", "id", item.pictos) || find("track", "id", item.track) || find("sector", "id", item.sector) || find("stand", "id", item.stand);
        return find("category", "id", picto.category).name_de;
      }
    },
    {
      "name": "subcategory",
      "key": "",
      "type": "generated",
      "get": function(item, i) {
        var picto = find("pictos", "id", item.pictos) || find("track", "id", item.track) || find("sector", "id", item.sector) || find("stand", "id", item.stand);
        return find("subcategory", "id", picto.subcategory).name_de;
      }
    },
    {
      "name": "tags",
      "key": "",
      "type": "generated",
      "get": function(item, i) {
        var picto = find("pictos", "id", item.pictos) || find("track", "id", item.track) || find("sector", "id", item.sector) || find("stand", "id", item.stand);
        var result = [];
        if(picto.lang == 1) result.push("Deutsch", "Français", "Italiano");
        if(picto.dir == 1) result.push("Richtung Links", "Richtung Rechts");
        result.push(picto.name_de, picto.name_fr, picto.name_it, picto.name_en);
        result.push(getLink(["category", picto.category], "name_de").string, getLink(["category", picto.category], "name_fr").string, getLink(["category", picto.category], "name_it").string, getLink(["category", picto.category], "name_en").string);
        result.push(getLink(["category", picto.subcategory], "name_de").string, getLink(["category", picto.subcategory], "name_fr").string, getLink(["category", picto.subcategory], "name_it").string, getLink(["category", picto.subcategory], "name_en").string);
        result = result.filter(i => {
          if(i != "" || i != null) return i;
        });
        return result.toString();
      }
    }
  ],
  "svgDatabase": [
    {
      "name": "ID",
      "key": "id",
      "type": "generated",
      "get": function(item, id, lang, dir) {
        return id;
      }
    },
    {
      "name": "IS_RIGHT",
      "key": "isRight",
      "type": "generated",
      "get": function(item, id, lang, dir) {
        return (dir == "r" || dir == false) ? 1 : 0;
      }
    },
    {
      "name": "IS_LEFT",
      "key": "isLeft",
      "type": "generated",
      "get": function(item, id, lang, dir) {
        return (dir == "l" || dir == false) ? 1 : 0;
      }
    },
    {
      "name": "IS_DE",
      "key": "isDe",
      "type": "generated",
      "get": function(item, id, lang, dir) {
        return (lang == "de" ||lang == false) ? 1 : 0;
      }
    },
    {
      "name": "IS_FR",
      "key": "isFr",
      "type": "generated",
      "get": function(item, id, lang, dir) {
        return (lang == "fr" ||lang == false) ? 1 : 0;
      }
    },
    {
      "name": "IS_IT",
      "key": "isIt",
      "type": "generated",
      "get": function(item, id, lang, dir) {
        return (lang == "it" ||lang == false) ? 1 : 0;
      }
    },
    {
      "name": "SVG",
      "key": "svg",
      "type": "generated",
      "get": function(item, i, lang, dir) {
          var filename = item.id + "_" + item.file_name;
          if(dir) {filename +=  "_" + dir;}
          if(lang) {filename += "_" + lang;}
          var svgData;
          var result = "";
          var parser = new DOMParser();
          lib.svgPictos.content.forEach(el => {
            if(el.file_name == filename) {
              svgData = parser.parseFromString(el.svgProduktion, "image/svg+xml");
              svgData = svgData.getElementById("content");
              svgData.setAttribute("class", item.class);
              svgData.removeAttribute("id");
              result = "\"" + svgData.outerHTML.replace(/\"/g, "\"\"") + "\"";
              result = result.replace(/>(\n*)</gm, "><");
              result = result.replace(/(\r\n|\n|\r)/gm,"");
            }
          });
          return result;
      }
    },
    {
      "name": "PICTO_ID",
      "key": "pictoId",
      "type": "generated",
      "get": function(item, i, lang, dir) {
        return item.id;
      }
    }
  ],
  "pictoDatabase": [
    {
      "name": "ID",
      "key": "id",
      "type": "value"
    },
    {
      "name": "SHORTNAME",
      "key": "file_name",
      "type": "value"
    },
    {
      "name": "NAME",
      "key": "name_de",
      "type": "value"
    },
    {
      "name": "SORT",
      "key": "order",
      "type": "value"
    },
    {
      "name": "COLOR",
      "key": "background",
      "type": "generated",
      "get": function(item, i) {
        var result = "not found";
        lib.background.content.forEach(el => {
          if(el.id == item.background) {
            result = el.class;
          }
        });
        return result;
      }
    },
    {
      "name": "INFO",
      "key": "info",
      "type": "value"
    },
    {
      "name": "PICTO_CATEGORY_ID",
      "key": "subcategory",
      "type": "generated",
      "get": function(item, i) {
        var result = "not found";
        lib.subcategory.content.forEach(el => {
          if(el.id == item.subcategory) {
            result = el.dbId;
          }
        });
        return result;
      }
    }
  ]
};
var body = document.getElementsByTagName("BODY")[0];
var contentCanvas = document.getElementById("contentCanvas");
document.getElementById("loadJsonButton").addEventListener("change", loadJsonFile, false);
document.getElementById("loadSvgProductiveFolder").addEventListener("change", function (input) {loadSVG(input, "svgProduktion"); }, false);
document.getElementById("loadSvgDigitalFolder").addEventListener("change", function (input) {loadSVG(input, "svgDigital"); }, false);
document.getElementById("saveFileButton").addEventListener("click", function () {saveFile(JSON.stringify(lib), "Piktogramm-Bibliothek.json");}, false);
document.getElementById("exportDesignSystems").addEventListener("click", function() {exportDesignSystems(exports.designsystem, "pikto.csv", ["svgPictos", "svgTrack", "svgSector", "svgStand"], ["picto", "addon"]);}, false);
document.getElementById("exportSvgEditor").addEventListener("click", function() {exportSVGEditor(exports.svgDatabase, "PICTO_SVGS.csv", "pictos", ["picto"]);}, false);
document.getElementById("exportPictosEditor").addEventListener("click", function() {exportPictosEditor(exports.pictoDatabase, "PICTOS.csv", ["pictos"], ["picto", "generated"]);}, false);
document.getElementById("redrawCanvas").addEventListener("click", function() {buildViewPort();}, false);
function loadJsonFile() {
  var jsonFile = this.files[0];
  const reader = new FileReader;
  reader.addEventListener('load', (event) => {
    lib = JSON.parse(event.target.result);
    document.getElementById("loadJsonButton").style.display = "none";
    buildViewPort();
  });
  reader.readAsText(jsonFile);
}

function buildViewPort() {
  sort();
  contentCanvas.innerHTML = "";
  var tables = Object.entries(lib);
  tables.forEach((item) => {
    var container = document.createElement("DIV");
    container.id = item[1].id;
    container.setAttribute("data-id", item[0]);
    var title = document.createElement("H1");
    title.innerHTML = item[1].name;
    var addButton = document.createElement("BUTTON");
    addButton.innerHTML = "+";
    addButton.setAttribute("dom-id", item[1].id);
    addButton.setAttribute("data-id", item[0]);
    addButton.onclick = function() {
      setEntry(this.getAttribute("data-id"), "new")
    };
    title.appendChild(addButton);
    container.appendChild(title);
    jsonToTable(container, item[0]);
    contentCanvas.appendChild(container);
  });
}

function jsonToTable(container, dataSet) {
  var table = document.createElement("TABLE");
  table.appendChild(createHeader(lib[dataSet].prototype, document.createElement("TR")));
  lib[dataSet].content.forEach((item, i) => {
    var bodyRow = document.createElement("TR");
    bodyRow.setAttribute("data-index", i);
    bodyRow.addEventListener("dblclick", function() {
      setEntry(dataSet, i);
    }, false);
    table.appendChild(createRow(dataSet, i, bodyRow));
  });
  container.appendChild(table);
}

function loadSVG(input, dataKey) {
  var svgFiles = Array.from(input.target.files);
  var parser = new DOMParser();
  svgFiles.forEach(file => {
    const reader = new FileReader;
    reader.originalFileName = file.name.replace(".svg", "");
    reader.addEventListener('load', (event) => {
      var data = parser.parseFromString(event.target.result, "image/svg+xml");
      if(data.getElementById("content_1_") != null) {
        data.getElementById("content_1_").id = "content";
      }
      if(data.getElementById("Content") != null) {
        data.getElementById("Content").id = "content";
      }
      var pictoId = parseInt(reader.originalFileName.substring(0, 2));
      var location = {dir: "svgPictos", rel: "pictos"};
      if(pictoId == 21 || reader.originalFileName.indexOf("Gleis") == 0) location = {dir: "svgTrack", rel: "track"};
      else if(pictoId == 22 || reader.originalFileName.indexOf("Sektor") == 0) location = {dir: "svgSector", rel: "sector"};
      else if(pictoId == 23 || reader.originalFileName.indexOf("Kante") == 0) location = {dir: "svgStand", rel: "stand"};
      var isNew = true;
      lib[location.dir].content.forEach((item, i) => {
        if(item.file_name == reader.originalFileName || item.file_name.substring(item.file_name.indexOf("_") + 1) == reader.originalFileName) {
          item[dataKey] = data.documentElement.outerHTML;
          isNew = false;
        }
      });
      if(isNew) {
        lib[location.dir].content.push({
          file_name: reader.originalFileName,
          [dataKey]: data.documentElement.outerHTML,
          [location.rel]: parseInt(reader.originalFileName.substring(0, reader.originalFileName.indexOf("_"))),
          isLeft: (reader.originalFileName.includes("_r")) ? 0 : 1,
          isRight: (reader.originalFileName.includes("_l")) ? 0 : 1,
          isDe: (reader.originalFileName.includes("_fr") || reader.originalFileName.includes("_it") || reader.originalFileName.includes("_en")) ? 0 : 1,
          isFr: (reader.originalFileName.includes("_de") || reader.originalFileName.includes("_it") || reader.originalFileName.includes("_en")) ? 0 : 1,
          isIt: (reader.originalFileName.includes("_de") || reader.originalFileName.includes("_fr") || reader.originalFileName.includes("_en")) ? 0 : 1,
          isEn: (reader.originalFileName.includes("_de") || reader.originalFileName.includes("_fr") || reader.originalFileName.includes("_it")) ? 0 : 1
        });
      }
    });
    if(file.name.indexOf(".svg") != -1) {
      reader.readAsText(file);
    }
  });
}

function setEntry(dataSet, index) {
  var editFrame = document.createElement("DIV");
  editFrame.classList.add("editFrame");
  editFrame.setAttribute("id", "editFrame");
  editFrame.addEventListener("click", function() {document.getElementById("editFrame").remove();}, false);
  var editContainer = document.createElement("DIV");
  editContainer.classList.add("editContainer");
  editContainer.setAttribute("id", "editContainer");
  editContainer.setAttribute("data-id", dataSet);
  editContainer.setAttribute("data-index", index);
  editContainer.addEventListener("click", function(e) {e.stopPropagation();}, false);
  var saveButton = document.createElement("BUTTON");
  saveButton.innerHTML = "Speichern";
  saveButton.setAttribute("data-id", dataSet);
  saveButton.setAttribute("data-index", index);
  saveButton.setAttribute("container-id", lib[dataSet].id);
  saveButton.addEventListener("click", function(e) {
    e.stopPropagation();
    var element = {};
    lib[this.getAttribute("data-id")].prototype.forEach((item, i) => {
      var domElement = document.getElementById("dataid" + item.key);
      if(domElement.tagName == "INPUT" || domElement.tagName == "SELECT") {
        element[item.key] = domElement.value;
      }
      else if(domElement.tagName == "DIV") {
        element[item.key] = domElement.getAttribute("value");
      }
    });
    if(index != "new") {
      lib[this.getAttribute("data-id")].content[this.getAttribute("data-index")] = element;
    }
    else {
      lib[dataSet].content.push(element);
    }
    var container = document.getElementById(this.getAttribute("container-id"));
    container.getElementsByTagName("TABLE")[0].remove();
    jsonToTable(container, this.getAttribute("data-id"));
    document.getElementById("editFrame").remove();
  }, false);
  var abortButton = document.createElement("BUTTON");
  abortButton.innerHTML = "Abbrechen";
  abortButton.addEventListener("click", function(e) {document.getElementById("editFrame").remove(); e.stopPropagation();}, false);
  var deleteButton = document.createElement("BUTTON");
  deleteButton.innerHTML = "Löschen";
  deleteButton.setAttribute("data-id", dataSet);
  deleteButton.setAttribute("data-index", index);
  deleteButton.setAttribute("container-id", lib[dataSet].id);
  deleteButton.addEventListener("click", function(e) {
    e.stopPropagation();
    lib[this.getAttribute("data-id")].content.splice(this.getAttribute("data-index"), 1);
    var container = document.getElementById(this.getAttribute("container-id"));
    container.getElementsByTagName("TABLE")[0].remove();
    jsonToTable(container, this.getAttribute("data-id"));
    document.getElementById("editFrame").remove();
  }, false);
  var editContent = document.createElement("DIV");
  editContent.setAttribute("id", "editContent");
  var dataPrototype = lib[dataSet].prototype;
  dataPrototype.forEach((item, i) => {
    var inputWrapper = document.createElement("DIV");
    inputWrapper.classList.add("inputWrapper");
    var label = document.createElement("LABEL");
    label.innerHTML = item.name;
    inputWrapper.appendChild(label);
    if(item.type == "text" || item.type == "number") {
      var input = document.createElement("INPUT");
      input.type = item.type;
      if(index != "new") {
        input.value = lib[dataSet].content[index][item.key];
      }
    }
    else if(item.type == "boolean") {
      var input = document.createElement("DIV");
      input.classList.add("checkbox");
      var slider = document.createElement("DIV");
      slider.classList.add("slider");
      input.appendChild(slider);
      input.setAttribute("value", (index != "new") ? lib[dataSet].content[index][item.key] : "0");
      input.addEventListener("click", function() {
        this.setAttribute("value", (this.getAttribute("value") == "1") ? "0" : "1");
      }, false);
    }
    else if(item.type == "link") {
      var input = document.createElement("SELECT");
      var options = lib[item.key].content;
      options.forEach((opt, i) => {
        var option = document.createElement("OPTION");
        option.value = opt.id;
        option.innerHTML = opt[item.rel];
        if(index != "new") {
          if(opt.id == lib[dataSet].content[index][item.key])
          {
            option.selected = true;
          }
        }
        input.appendChild(option);
      });
    }
    input.setAttribute("data-id", item.key);
    input.id = "dataid" + item.key;
    input.classList.add("dataItem");
    inputWrapper.appendChild(input);
    editContent.appendChild(inputWrapper);
  });
  editContainer.appendChild(editContent);
  editContainer.appendChild(abortButton);
  editContainer.appendChild(saveButton);
  editContainer.appendChild(deleteButton);
  editFrame.appendChild(editContainer);
  body.appendChild(editFrame);
}

function saveFile(text, filename) {
  var d = new Date();
  filename = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "_" + d.getHours() + "." + d.getMinutes() + "_" + filename;
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function getLink(element, target) {
  var result = {};
  result.html = document.createElement("SPAN");
  lib[element[0]].content.forEach((item, i) => {
    if(item.id == element[1]) {
      result.html.innerHTML = item[target];
      result.string = item[target];
    }
  });
  return result;
}

function createHeader(prototype, bodyRow) {
  prototype.forEach((item, i) => {
    var cell = document.createElement("TH");
    cell.innerHTML = item.name;
    bodyRow.appendChild(cell);
  });
  return bodyRow;
}

function createRow(dataSet, index, bodyRow) {
  var prototype = lib[dataSet].prototype;
  prototype.forEach((item, i) => {
    var cell = document.createElement("TD");
    if(item.type == "text" || item.type == "number") {
      cell.innerHTML = lib[dataSet].content[index][item.key];
    }
    else if(item.type == "link") {
      cell.appendChild(getLink([item.key, lib[dataSet].content[index][item.key]], item.rel).html);
    }
    else if(item.type == "boolean") {
      cell.innerHTML = lib[dataSet].content[index][item.key];
    }
    bodyRow.appendChild(cell);
  });
  return bodyRow;
}

function sort() {
  libKeys = Object.keys(lib);
  libKeys.forEach((item) => {
    lib[item].content.sort((a, b) => {
      var result = 0;
      lib[item].sort.forEach((i) => {
        if(result == 0) {
          result = a[i] - b[i];
        }
      });
      return result;
    });
  });

}

function createExportHeader(header, separator) {
  var csvString = "";
  header.forEach((item, index) => {
    csvString += item.name;
    csvString += (index < header.length -1) ? separator : "";
  });
  csvString += "\n";
  return csvString;
}

function exportDesignSystems(header, filename, target, types) {
  var csvString = "";
  csvString += createExportHeader(header, ";");
  var lists = [];
  target.forEach(list => {
    lib[list].content.forEach((item, index) => {
      if(find(lib[list].rel, "id", item[lib[list].rel]).active == 1 && types.includes(find(lib[list].rel, "id", item[lib[list].rel]).type)) {
        lists.push(item);
      }
    });
  });
  lists.sort((a, b) => {
    if(a.id < b.id) return -1;
    else if(a.id > b.id) return 1;
    else return 0;
  });
  lists.forEach((item, i) => {
      header.forEach((key, index) => {
        if(key.type == "generated") {
          csvString += key.get(item, i);
        }
        else if(key.type == "link")
        {
          lib[key.key].content.forEach((link) => {
            if(link.id == item[key.key]) {
              csvString += link.name;
            }
          });
        }
        else {
          csvString += item[key.key];
        }
        csvString += (index < header.length -1) ? ";" : "";
      });
      csvString += "\n";
  });
  saveFile(csvString, filename);
}

function exportPictosEditor(header, filename, target, types) {
  var csvString = "";
  csvString += createExportHeader(header, ";");
  var lists = [];
  target.forEach(list => {
    lists = lists.concat(lib[list].content);
  });
  lists.sort((a, b) => {
    if(a.id < b.id) return -1;
    else if(a.id > b.id) return 1;
    else return 0;
  });
  lists.forEach((item, i) => {
    if(item.active == 1 && types.includes(item.type)) {
      header.forEach((key, index) => {
        if(key.type == "generated") {
          csvString += key.get(item, i);
        }
        else if(key.type == "link")
        {
          lib[key.key].content.forEach((link) => {
            if(link.id == item[key.key]) {
              csvString += link.name;
            }
          });
        }
        else {
          csvString += item[key.key];
        }
        csvString += (index < header.length -1) ? ";" : "";
      });
      csvString += "\n";
    }
  });
  saveFile(csvString, filename);
}

function exportSVGEditor(header, filename, target) {
  var lang = ["de", "fr", "it"];
  var dir = ["l", "r"];
  var csvString = "";
  var id = 1;
  csvString += createExportHeader(header, ",");
  lib[target].content.forEach((item, i) => {
    if(item.active == 1 && (item.type == "picto" || item.type == "generated")) {
      if(item.dir == 1 && item.lang == 1) {
        lang.forEach(l => {
          dir.forEach(d => {
            csvString += createLine(item, header, id, l, d);
            id++;
          });
        });
      }
      else if(item.dir == 1) {
        dir.forEach(d => {
          csvString += createLine(item, header, id, false, d);
          id++;
        });

      }
      else if(item.lang == 1) {
        lang.forEach(l => {
          csvString += createLine(item, header, id, l, false);
          id++;
        });
      }
      else {
        csvString += createLine(item, header, id, false, false);
        id++;
      }
    }
  });
  saveFile(csvString, filename);
}

function createLine(item, header, id = false, lang = false, dir = false) {
  var lineString = "";
  header.forEach((key, index) => {
    if(key.type == "generated") {
      lineString += key.get(item, id, lang, dir);
    }
    else if(key.type == "link")
    {
      lib[key.key].content.forEach((link) => {
        if(link.id == item[key.key]) {
          lineString += link.name;
        }
      });
    }
    else {
      lineString += item[key.key];
    }
    lineString += (index < header.length -1) ? "," : "";
  });
  lineString += "\n";
  return lineString;
}

function find(list, attribute, value) {
  var result = false;
  lib[list].content.forEach((item, index) => {
    if(item[attribute] == value) {
      result = item;
    }
  });
  return result;
}
