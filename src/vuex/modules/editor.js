// vuex/modules/editor.js
import {
  RESIZE,
  UPDATE_CODE,
  SELECT_FILE
} from '../mutation-types'

// TEST FILES SHOULD BE LOADED ASYNC OR SOMEWHERE ELSE
let files = {
  'index.html':{
    name: 'index.html',
    code: `<body>
    <div>Alpha</div>
    </body>
                `
  },
  'd3Test.js': {
    name: 'd3Test.js',
    code: `d3.select("body")
                    .append("svg")
                    .append("rect")
                    .attr('x', 10)
                    .attr('y', 10)
                    .attr('width', 10)
                    .attr('height', 10);
                    d3.select("body")
                    .append("svg")
                    .append("circle")
                    .attr('cx', 50)
                    .attr('cy', 50)
                    .attr('r', 50);
                `
  },
  'p5Test.js': {
    name: 'p5Test.js',
    code: `function setup() {
                  createCanvas(640, 500);
                }

                function draw() {
                  if (mouseIsPressed) {
                    fill(0);
                  } else {
                    fill(255);
                  }
                  ellipse(mouseX, mouseY, 80, 80);
                }`
  }
}
// initial state
const state = {
  files: files,
  fileSelected: Object.keys(files)[0],
  splitPercent: {
    // Percent value defines size of the left hand item in the property name
    editorPreview: 50,
    filesEditor: 20 //File menu takes 20% of the width
  }
}

// mutations
const mutations = {
  [RESIZE] (state, key, value){
    let newSplit = state.splitPercent;
    newSplit[key] = value;
    state.splitPercent = newSplit;
  },
  [UPDATE_CODE] (state, filename, code){
    // let state.editor.files[filename].code = ;
  },
  [SELECT_FILE] (state, filename){
    for (var i = 0; i < state.files.length; i++) {;
      state.dummy++;
      if(state.files[i].name == filename){
        let newFileSelected = state.files[i];
        state.fileSelected = newFileSelected;
        return;
      }
    }
  }
}

export default {
  state,
  mutations
}
