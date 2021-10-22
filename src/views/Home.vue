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
  </div>
</template>

<script>
import UploadImages from "vue-upload-drop-images";
function handleImages(files){
                console.log(files)
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
  components: { UploadImages},
  methods:{
            handleImages
        }
};

</script>

<style>
.size {
  border-radius: 25px;
  background-image: url("../assets/Papaya-fruit.jpg");
  background-size: 200% 200%;
  background-position: center bottom;
  padding: 20px;
}
.reduce{
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