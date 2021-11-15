<template>
  <div>
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
    </div>
    <div style="margin-top: 20px" ></div>
    <div style="padding-left: 30%; padding-right: 30% " v-if="this.$store.getters.getShowUploadBox">
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
    <!-- Loading -->
    <div v-if="this.$store.getters.getLoading">
      <!-- Div Please Wait (v-if= upload) -->
      <div>
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
    </div>
    <!-- Result -->
    <div style="margin-top: 20" v-if="this.$store.getters.getResult!='' &&this.$store.getters.getResult.ripeness.length==1 ">
      <div class="flex">
        <div class="center">
          <h5 class="display-2 font-weight-light">Result</h5>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <img v-bind:src="picture" height="400" />
        </div>
        <div class="column">
          <!-- <h5 class="display-1 font-weight-light">Number of papayas</h5>
          <h2 class="font-weight-light">Ripe: 9</h2>
          <h2 class="font-weight-light">Medium: 9</h2>
          <h2 class="font-weight-light">Unripe: 9</h2> -->
          <h2 class="font-weight-light">{{this.$store.getters.getResult.ripeness[0]}}</h2>
          <h2 class="font-weight-light">{{this.$store.getters.getResult.confident}}</h2>

        </div>
        <div class="column" v-if="!this.$store.getters.getResult.ripeness.toString().includes('Not Papaya')">
          <img v-bind:src="'data:image/jpeg;base64,'+this.$store.getters.getResult.img" height="400"  />
        </div>
      </div>
    </div>
     <div style="margin-top: 20" v-if="this.$store.getters.getResult!='' &&this.$store.getters.getResult.ripeness.length>1 ">
      <div class="flex">
        <div class="center">
          <h5 class="display-2 font-weight-light">Result</h5>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <img v-bind:src="picture" height="400" />
        </div>
        <div class="column">
          <!-- <h5 class="display-1 font-weight-light">Number of papayas</h5>
          <h2 class="font-weight-light">Ripe: 9</h2>
          <h2 class="font-weight-light">Medium: 9</h2>
          <h2 class="font-weight-light">Unripe: 9</h2> -->
          <h2 class="font-weight-light">{{(this.$store.getters.getCount['ripe']==null)?("Ripe: "+0):("Ripe: "+this.$store.getters.getCount['ripe'])}}</h2>
          <h2 class="font-weight-light">{{(this.$store.getters.getCount['medium']==null)?("Medium: "+0):("Medium: "+this.$store.getters.getCount['medium'])}}</h2>
          <h2 class="font-weight-light">{{(this.$store.getters.getCount['unripe']==null)?("Unripe: "+0):("Unripe: "+this.$store.getters.getCount['unripe'])}}</h2>
        </div>
        <div class="column" v-if="!this.$store.getters.getResult.ripeness.toString().includes('Not Papaya')">
          <img v-bind:src="'data:image/jpeg;base64,'+this.$store.getters.getResult.img" height="400"  />
        </div>
      </div>
    </div>
    <div style="margin-top: 20px" ></div>
    <div style="padding-left: 30%; padding-right: 30% " v-if="this.$store.getters.getResult!=''||this.$store.getters.getError!=''">
      <div class="size">
        <UploadImages
          @changed="handleImages"
          uploadMsg="Drop your image here, or click to select image"
          fileError="images files only accepted"
          :max="1"
          maxError="Max files exceed"
        />
      </div>
      <h4 style="color: red">{{this.$store.getters.getError}}</h4>
    </div>
  </div>
  <!-- UploadBox -->
</template>

<script>
import UploadImages from "vue-upload-drop-images";
export default {
  components: { UploadImages },
  methods: {
    handleImages(files) {
      console.log('handle Image Toggle')
      this.picture = window.URL.createObjectURL(files[0]);
      console.log(files[0].name);
      let formData = new FormData();
      formData.append("file", files[0]);
      this.$store.dispatch("clearResult")
      this.$store.dispatch("clearError")
      this.$store.dispatch("setShowUploadBox",false)
      console.log(this.$store.getters.getShowUploadBox)
      this.$store.dispatch("setLoading",true)
      this.$store.dispatch("getResult",formData)
      
    },
  }
  // return predictionResult;
}
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