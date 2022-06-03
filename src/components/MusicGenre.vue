<script>
  import { UploadFilled } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  export default {
    data() {
      return{
        musicGenre: '',
        isResult: false,
        loading: false,
        myFile: null,
        newFile : '',
        url : 'https://musicgenre-fcu.herokuapp.com/'
      }
    },
    methods: {
      
      submitFile(file) {
        this.loading = true

        // 處理檔案
        this.myFile = file.file
        console.log(this.myFile)
        const formData = new FormData();
        formData.append('file', this.myFile);
        const headers = { 'Content-Type': 'multipart/form-data' };

        //https://musicgenre-fcu.herokuapp.com/
        //http://localhost:8000/
        console.log(formData)
        console.log(headers)
        this.axios.post(this.url + 'uploadfile', formData, { headers }).then((res) => {       
          console.log('server is received the file')
          console.log(res)
          if(res.data.status == 'error'){
            this.isResult = false
            this.loading = false
            ElMessage.error(res.data.message)
            return
          }
          return res.data.convertedFile

        }).then((res) => {
          console.log('get ready to predict')
          console.log(res)
          this.axios.get(this.url + 'predict/?fileName=' + res).then((res) =>{
            console.log(res)

            this.musicGenre = res.data.genre
    
            this.isResult = true
            this.loading = false
          })
        } );

       
        

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
        
        
        if((file.size/1024/1024) > 3){
          ElMessage.error('檔案大小不得超過3MB')
          return false
        }
             
      },
      hideText(){
          this.isResult = false;
      } 
    },
    mounted() {
      this.axios.get(this.url).then((res) =>
        console.log(res.data)
      )
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
      僅支援WAV及MP3檔案，檔案大小需在3MB以下
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
