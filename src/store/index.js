import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const serverUrl = "http://6b8c-2001-fb1-12-a0f0-49ac-3c4f-fc3a-d2e.ngrok.io"
export default new Vuex.Store({
  state: {
    showUploadBox: true,
    result: "",
    loading: false,
    error:"",
    count: {},

  },
  mutations: {
    setShowUploadBox(state,value){
      state.showUploadBox = value
    },
    setResult(state, value){
      state.result = value
    },
    setLoading(state,value){
      state.loading = value
    },
    setError(state, value){
      state.error = value
    },
    setCount(state, value){
      state.count = value
    }
  },
  getters:{
    getShowUploadBox(state){
      return state.showUploadBox
    },
    getResult(state){
      return state.result
    },
    getLoading(state){
      return state.loading
    },
    getError(state){
      return state.error
    },
    getCount(state){
      return state.count
    }
  },
  actions: {
    setShowUploadBox(context,value){
      context.commit('setShowUploadBox',value)
    },
    async getResult(context,formData){
      await axios
    .post(
      serverUrl+"/predict/image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    .then(function (response) {
      console.log(response.data);
      if(response.data.error==null){
      context.commit('setResult', response.data)
      context.commit('setLoading', false)
      if(response.data.ripeness.length > 1){
        let countripeness= {}
        for (let index = 0; index < response.data.ripeness.length; index++) {
          const element = response.data.ripeness[index];
        
          if (countripeness[element]) {
            countripeness[element] += 1;
          } else {
            countripeness[element] = 1;
          }
        }
        context.commit('setCount',countripeness)

      }
      }else{
        context.commit('setError', response.data.error)
        context.commit('setLoading', false)
      } 

    })
    .catch(function (error) {
      console.log("FAILURE!!");
      console.log(error.response);
      context.commit('setLoading', false)
      context.commit('setError', error.response.data.detail)
    });
    },
    clearResult(context){
      context.commit('setResult',"")
    },
    clearError(context){
      context.commit('setError',"")
    },
    setLoading(context, value){
      context.commit('setLoading', value)
    }
  },
  modules: {
  }
})
