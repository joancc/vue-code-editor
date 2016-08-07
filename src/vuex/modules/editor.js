// vuex/modules/editor.js
import {
  UPDATE_CODE
} from '../mutation-types'

// TEST FILES SHOULD BE LOADED ASYNC OR SOMEWHERE ELSE
let code = {
  htmlmixed: `<body>
  <div>Alpha</div>
</body>`,
  javascript: `d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("p")
    .text(function(d) { return "I’m number " + d + "!"; });
    function setup() {
  createCanvas(640, 480);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
                `,
  css: `canvas{
  background: teal;
  border: 2px solid brown;
}`
}

// initial state
const state = {
  code: code
}

// mutations
const mutations = {
  [UPDATE_CODE] (state, code){
    console.log("Update code mutation")
    let newCode = {
      htmlmixed: code.htmlmixed,
      javascript: code.javascript,
      css: code.css
    }
    state.code = newCode;
  }
}

export default {
  state,
  mutations
}
