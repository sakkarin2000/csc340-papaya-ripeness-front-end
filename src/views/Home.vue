<template>
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
          &nbsp; Upload your papaya image that you want to classify its ripeness
        </h4>
      </div>
    </div>hey
    <UploadImages @change="handleImages" uploadMsg="upload papaya images" fileError="images files only accepted" :max="1" maxError="Max files exceed"/>
  </div>
</template>

<script>
import UploadImages from "vue-upload-drop-images";

export default {
               components:{UploadImages}
               }

</script>

<style>

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