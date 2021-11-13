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
    <div
      style="padding-left: 30%; padding-right: 30%"
      v-if="store.state.uploadBox"
    >
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
    <!-- Div Please Wait (v-if= upload) -->
    <div v-if="store.state.loading">
      <div id="div-1"></div>
      <div class="flex">
        <v-img src="../assets/Animation.gif" max-height="300" max-width="291">
        </v-img>
      </div>
      <div id="div-1"></div>
      <div class="center">
        <h2 class="display-3 font-weight-light">Please Wait...</h2>
      </div>
    </div>

    <div v-if="store.state.resultCome">
      <div id="div-1"></div>
      <div class="flex">
        <div class="center">
          <h5 class="display-2 font-weight-light">Result</h5>
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
          <h2 class="font-weight-light"></h2>
        </div>
        <div class="column">
          <img v-bind:src="picture" height="500" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//get axios method
const axios = require("axios");
axios
  .get("http://9f3c-2001-fb1-12-5e79-f5be-40ae-2e32-19cf.ngrok.io/")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});
//post axios method
import UploadImages from "vue-upload-drop-images";
let picture;

async function SendPicPrediction(formData) {
  let res = await axios
    .post(
      "http://9f3c-2001-fb1-12-5e79-f5be-40ae-2e32-19cf.ngrok.io/predict/image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    .then(function (response) {
      console.log(response);
      predictionResult = response.data.result;
      resultCome = true;
      this.loading = false;
      this.uploadBox = false;
    })
    .catch(function (error) {
      console.log("FAILURE!!");
      console.log(error);
    });
  console.log(predictionResult);
  // return predictionResult;
}
function handleImages(files) {
  this.picture = window.URL.createObjectURL(files[0]);
  console.log("Hey!");
  console.log(files[0].name);
  this.upload = false;
  let formData = new FormData();
  console.log("Nunu");
  // console.log(files);
  formData.append("file", files[0]);
  this.loading = true;
  this.uploadBox = false;
  this.resultCome = false;
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
export default {
  data() {
    var store = {
      state: {
        loading: false,
        resultCome: false,
        uploadBox: true,
        predictionResult: "",
      },
      setLoading(newValue) {
        this.state.loading = newValue;
      },
      setResultCome(newValue) {
        this.state.resultCome = newValue;
      },
      setUploadBox(newValue) {
        this.state.uploadBox = newValue;
      },
      setPredictionResult(newValue) {
        this.state.predictionResult = newValue;
      },
    };
    return {
      upload: true,
      shareState: store.state,
      picture,
      predictionResult,
    };
  },
  components: { UploadImages },
  methods: {
    handleImages,
  },
};
</script>

<style>
.column {
  float: left;
  width: 33.33%;
  padding: 20px;
  padding-left: 140px;
  /* margin-left: 5%; */
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.left {
  display: flex;
  align-items: flex-start;
}
.size {
  border-radius: 25px;
  background-image: url("../assets/Papaya-fruit.jpg");
  background-size: 200% 200%;
  background-position: center bottom;
  padding: 20px;
}
.reduce {
  padding-right: 30%;
}
.center {
  text-align: center;
}
#div-1 {
  padding: 10px;
  background: white;
}
#div-2 {
  padding: 50px;
  background: #f5f5f5;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>