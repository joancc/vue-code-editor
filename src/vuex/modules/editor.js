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
                `,
  css: `a{
        background: red;
  }`
}

// initial state
const state = {
  code: code
}

// mutations
const mutations = {
  [UPDATE_CODE] (state, code){
    state.code = code;
  }
}

export default {
  state,
  mutations
}
