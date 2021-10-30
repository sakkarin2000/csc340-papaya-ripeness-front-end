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
    <div class="reduce">
      <div class="size" v-if="resultOne">
        <UploadImages
          @changed="handleImages"
          uploadMsg="Drop your image here, or click to select image"
          fileError="images files only accepted"
          :max="1"
          maxError="Max files exceed"
        />
      </div>
      <div v-else>
        <div id="div-1"></div>
        <div class="flex">
          <div class="center">
            <h5 class="display-2 font-weight-light">Result</h5>
          </div>
        </div>
      </div>
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
    </div>
     <img v-bind:src="picture" height="500"/>
     <h5 class="display-1 font-weight-light">Number of papayas</h5>
     <h2 class="font-weight-light">Ripe: 9</h2>
     <h2 class="font-weight-light">Medium: 9</h2>
     <h2 class="font-weight-light">Unripe: 9</h2>
  </div>
</template>

<script>

import UploadImages from "vue-upload-drop-images";
let picture;
function handleImages(files){
                this.picture = window.URL.createObjectURL(files[0]);
                console.log(files[0].name)
                this.upload = false;
                this.resultOne = false;
                
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
  data(){
    return{
      upload: true,
      resultOne: true,
      picture
    }
  },
  components: { UploadImages},
  methods:{
            handleImages
        }
};

</script>

<style>
.left{
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
  padding-left: 30%;
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