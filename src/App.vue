<script>
   import MusicGenre from "./components/MusicGenre.vue"
    export default {
      components: {
        MusicGenre
      },
    }
</script>

<template>
  <nav>
    <div class="iconAndTitle">
      <img src="./assets/logo.png" alt="">
      <ul>
        <li><a>音樂風格辨識</a></li>
      </ul>
      
    </div>
  </nav>
    
  
  <header>
    <h1>線上辨識音樂的類型</h1>
  </header>
  
  <MusicGenre/>
</template>

<style>
/* 全域設定 */
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: 'Noto Sans TC', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Noto Sans TC", sans-serif;
}

/* 導航列 */
nav {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  margin-bottom: 30px;
  box-shadow: 2px 2px 4px 1px rgb(211, 211, 211);
  transition: all 0.4s ease; /*配合js滑動變色漸變*/
}
nav img {
  padding: 5px 1px 5px 15px ;
  height: 60px;
}

nav ul {
  display: flex;
  list-style-type: none;
  align-items: center;
}

nav ul li {
  padding: 0.5rem 0.75rem;

}

nav ul li a {
  /*color: white;*/
  text-decoration: none;
  font-size: 1.5rem;
}

.iconAndTitle {
  display: flex;
}

.navLink {
  display: flex;
}


/* 大標題 */

header h1{
  color:  #337ecc;
  margin: 2rem 0rem 1rem 0rem;
}

</style>
