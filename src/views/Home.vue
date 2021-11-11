<template>
<div>
    <!-- Div for Home Section -->
    <div class="home">
      <div id="div-1"></div>
      <!-- Div for coming up rectangular -->
      <div id="div-2" class="center">
        <h1 class="display-3 font-weight-light">Predict your Papaya!</h1>
        <br />
        <div class="flex">
          <v-icon color="black">mdi-cloud-upload</v-icon>
          <h4 class="font-weight-light">
            &nbsp; Upload your papaya image that you want to classify its
            ripeness
          </h4>
        </div>
      </div>
      <div id="div-1"></div>
    </div>
    <!-- Div for If condition -->
    <div style="padding-left: 30%; padding-right: 30%" v-if="resultOne">
      <div class="size">
        <UploadImages
          @changed="handleImages"
          uploadMsg="Drop your image here, or click to select image"
          fileError="images files only accepted"
          :max="1"
          maxError="Max files exceed"
        />
      </div>
    </div>
    <!-- Div for Else Condition-->
    <div v-else>
      <!-- Div Please Wait (v-if= upload) -->
      <!-- <div v-else> 
      <div id="div-1"></div>
      <div class="flex">
      <v-img src="../assets/Animation.gif" max-height="300" max-width="291">
      </v-img>
      </div>
      <div id="div-1"></div>
      <div class="center">
        <h2 class="display-3 font-weight-light">Please Wait...</h2>
      </div>
    </div> -->
      <div id="div-1"></div>
      <div class="flex">
        <div class="center">
          <h5 class="display-2 font-weight-light">{{dj}}</h5>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <img v-bind:src="picture" height="500" />
        </div>
        <div class="column">
          <!-- <h5 class="display-1 font-weight-light">Number of papayas</h5>
          <h2 class="font-weight-light">Ripe: 9</h2>
          <h2 class="font-weight-light">Medium: 9</h2>
          <h2 class="font-weight-light">Unripe: 9</h2> -->
          <h2 class="font-weight-light">{{dj}}</h2>
          <h2 class="font-weight-light">{{predictionResult}}</h2>
        </div>
        <div class="column">
          <img v-bind:src="picture" height="500" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import UploadImages from "vue-upload-drop-images";

const New = defineComponent({
  components: {
  },
  setup() {
const predictionResult = ref('');
//get axios method
const axios = require("axios");
axios
  .get("http://8d6d-2001-fb1-12-5e79-4e-295f-47a2-8bf4.ngrok.io/")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});
//post axios method
let picture;
let loading = false;

async function SendPicPrediction(formData){
  console.log("Win Kuy");
  loading = true;
  let res = await axios
    .post(
      "http://8d6d-2001-fb1-12-5e79-4e-295f-47a2-8bf4.ngrok.io/predict/image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    .then(function (response) {
      console.log(response);
      loading = false;
      predictionResult.value = response.data.result;
    })
    .catch(function (error) {
      console.log("FAILURE!!");
      console.log(error);
    });
  console.log(predictionResult);
  // return predictionResult;
}
function handleImages(files) {
  console.log("Win Nahee");
  this.picture = window.URL.createObjectURL(files[0]);
  console.log(files[0].name);
  this.upload = false;
  this.resultOne = false;
  console.log("Isus Win");
  let formData = new FormData();
  console.log("Nunu");
  // console.log(files);
  formData.append('file',files[0]);
  console.log("WinWin Kuy");
  SendPicPrediction(formData);
  /*
                  [
                    {
                        "name": "Screenshot from 2021-02-23 12-36-33.png",
                        "size": 319775,
                        "type": "image/png",
                        "lastModified": 1614080193596
                        ...
                    },
                    ...
                    ]
                 */
}
const dj = ref('KuyKuy');
    return{
      upload: true,
      resultOne: true,
      picture,
      predictionResult,
      dj,
      UploadImages,
      handleImages,
      SendPicPrediction,
    }
  },
});

export default New;
</script>

<style lang="scss">
// .new {}
</style>