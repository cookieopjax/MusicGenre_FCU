<script>
  import { UploadFilled } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  export default {
    data() {
      return{
        musicGenre: '',
        isResult: false,
        myFile:null,
        loading: false
      }
  },
  computed: {
    hideText(){
        this.isResult = false;
      }
      
  },
  methods: {
      submitFile(file) {
        this.loading = true
        this.myFile = file.file
        console.log(this.myFile)
        const formData = new FormData();
        formData.append('file', this.myFile);
        const headers = { 'Content-Type': 'multipart/form-data' };
        this.axios.post('https://musicgenre-fcu.herokuapp.com/uploadfile/', formData, { headers }).then((res) => {       
          console.log('got the request')
          this.musicGenre = res.data.genre
          this.isResult = true
          this.loading = false
        });
        
      },
      checkFile(file) {
        //禁止在加載中上傳檔案
        if(this.loading === true){
          ElMessage.error('尚未加載完成，請稍後再試')
          return false
        }

        //限制上傳檔案類型
        const fileType = file.name.substring(file.name.lastIndexOf(".") + 1)
        if(fileType != 'mp3' && fileType != 'wav'){
          ElMessage.error('注意！僅能上傳WAV及MP3檔案')
          return false
        }
        
        let tempFile =  JSON.parse(JSON.stringify(file))
        
        let reader = new FileReader();

        
        reader.onload = function(e) {
            let arrayBuffer = new Uint8Array(reader.result);
            console.log(arrayBuffer);
        }

        reader.readAsArrayBuffer(tempFile);

        console.log(tempFile)

        
      },
     
    }
  }
 
</script>

<template>
  <div class="uploadArea">
    <el-upload
    class="upload-demo"
    drag
    action=""
    :http-request="submitFile"
    :on-success="submitFile"
    :before-upload ="checkFile"
    :on-remove ="hideText"
    accept="audio/*">

    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖曳檔案或<em>直接點擊我</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
      僅支援WAV及MP3檔案，檔案大小需在2MB以下
      </div>
    </template>
    
    </el-upload>
    
  </div>
    
  
  <div class="resultArea"  v-loading="loading"> 
      <p v-if="isResult">預測此音樂的風格為:</p>
      <h1 v-if="isResult"> {{musicGenre}} </h1>
   
  </div>
  
  
    
  

</template>

<style>
  .uploadArea{
    padding: 1rem 2rem 1rem 2rem ;
    display: flex;
    justify-content: center; 

    
  }

  .upload-demo{
    display: flex;
    flex-direction: column;
  }

  .el-upload__tip{
    min-width: 700px;
  }

  .resultArea{
    margin: 2rem 0rem 0rem 0rem;
  }

  .resultArea h1{
    color:  #337ecc;
  }

  @media screen and (max-width: 715px) {
    .el-upload__tip{
    min-width: 500px;
    }
  }

  @media screen and (max-width: 530px) {
    .el-upload__tip{
    min-width: 350px;
  }
}

</style>
