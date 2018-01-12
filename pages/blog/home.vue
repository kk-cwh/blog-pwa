<template>


    <!-- 博客主体 -->
      <!-- 博客主体 -->
  <transition name="custom-classes-transition"
   enter-active-class="animated fadeInRight"
  leave-active-class="animated fadeOutLeft">

    <div class="app-body">
      <div class="body-header">
        <div class="title">Yake's Blog</div>
        <div class="sub-title">全栈程序员成长之旅</div>
      </div>

      <div class="body-item" v-for="(item,index) in list" :key="'mu-card'+index">
        <div class="article-time" v-text="item.created_at"></div>
        <div class="article-title" v-text="item.title" @click="toArticle(item.id)"></div>
        <div class="article-content" v-html="item.content.slice(0,item.content.indexOf('MORE'))">

        </div>
        <a @click="toArticle(item.id)" class="read-more">阅读全文…</a>
        <div class="article-tags">
          <ul class="article-tag-list">
            <li class="article-tag-list-item" v-for="x in item.tags" :key="'mu-card-'+x.id">
              <span class="article-tag-list-link waves-effect waves-button" v-text="x.name"></span>
            </li>

          </ul>
        </div>
      </div>

      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
    </div>
  </transition>




</template>

<script>

import muInfiniteScroll from '../../components/infiniteScroll.vue'
export default {
  components: {
    muInfiniteScroll
  },
  data () {
    return {
      show: false,
      list: [],
      loading: false,
      page: 1,
      scroller: null,
      noArticle: false
    }
  },
  mounted () {
    this.scroller = this.$el
    let page = this.page
    this.$store.dispatch('blog/ArticleList', { page }).then((response) => {
      // console.log(response)
      let list = response.data.articles.list
      if (list && list.length) {
        if (list.length < 15) {
          this.noArticle = true
        }
        for (let i = 0; i < list.length; i++) {
          this.list.push(list[i])
        }
      }
    })
  },
  methods: {
    showSilder () {
      this.show = !this.show
    },
    toArticle (id) {
      this.$router.push({ name: 'blogArticle', params: { 'id': id } })
    },
    loadMore () {
      this.page = this.page + 1
      let page = this.page
      if (!this.noArticle) {
        this.$store.dispatch('blog/ArticleList', { page }).then((response) => {
          let list = response.data.articles.list
          if (list && list.length) {
            this.loading = true
            setTimeout(() => {
              for (let i = 0; i < list.length; i++) {
                this.list.push(list[i])
              }
              this.loading = false
            }, 2000)
          } else {
            this.noArticle = true
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.app-shade {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  background-color: #000;
  z-index: 1000;
}
.app-slider {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  bottom: 0;
  background-color: #ffffff;
  z-index: 1001;
   animation-duration:0.2s;
}
.app-slider .slider-header {
  background-image: url(../../assets/brand.jpg);
  background-size: 100% 100%;
  padding: 20px;
}
.author-image {
  width: 76px;
  height: 76px;
  background-image: url(../../assets/uicon.jpg);
  background-size: 100% 100%;
  border-radius: 50%;
  box-shadow: 0 0 2px 2px #ffffff;
}
.author-name {
  margin: 12px 0;
  font-size: 16px;
  color: rgb(255, 255, 255);
}
.author-email {
  font-size: 0.83em;
  color: #000;
}
.author-email a {
  text-decoration: none;
  color: #f0f2ff;
}
.list-menu {
  padding-top: 20px;
}
.list-li {
  display: flex;
  padding-left: 20px;
  justify-content: center;
  align-items: center;
  height: 36px;
}
.list-li:hover{
    background-color: #f2f2f2;
}
.list-li .li-icon {
  flex: 1;
  font-size: 19px;
}
.list-li .li-title {
  flex: 3;
  /* font-size: 18px; */
}
.app-bar {
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #3f51b5;
  height: 56px;
  display: flex;
}
.app-bar .icon-menu {
  flex-basis: 56px;
  margin-top: 16px;
  margin-left: 16px;
}
.space {
  flex: 1;
}
.icon-searchs {
  flex-basis: 56px;
  margin-top: 16px;
}

.app-body {
  margin-top: 56px;
  background-color: #f6f6f6;
}

.app-body .body-header {
  padding: 40px 0 36px 36px;
  background-color: #3f51b5;
}
.body-header .title {
  font-size: 24px;
  line-height: 30px;
  color: #ffffff;
}
.body-header .sub-title {
  padding-top: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  color: #c5cae9;
}

@media screen and (min-width: 968px) {
  .app-body .body-item {
    margin-top: 20px;
    background-color: #ffffff;
    /* height: 200px; */
    padding: 16px 20px 0;
    margin-left: 15%;
    margin-right: 15%;
  }
}

@media screen and (max-width: 967px) {
  .app-body .body-item {
    margin-top: 20px;
    background-color: #ffffff;
    /* height: 200px; */
    padding-top: 16px;
  }
}

.article-time {
  margin: 0 0 10px;
  line-height: 14px;
  font-size: 13px;
  font-weight: bold;
  color: #727272;
  padding-left: 20px;
}
.article-title {
  color: #3f51b5;
  position: relative;
  display: inline-block;
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 10px;
  padding-left: 20px;
}
.article-content {
  padding-left: 20px;
  padding-right: 20px;
  word-break: break-all;
  padding-bottom: 18px;
  line-height: 1.8;
  font-size: 15px;
}
.read-more {
  display: block;
  font-size: 14px;
  text-decoration-line: none;
}
.article-tags {
  border-top: 1px solid #ddd;
  padding: 10px 20px 0 20px;
}
.article-tag-list {
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-size: 13px;
  list-style: none;
}
.article-tag-list-item {
  display: inline-block;
  margin: 0 8px 8px 0;
  border-radius: 2px;
}
.article-tag-list-item:nth-child(n + 1) {
  background: #8bc34a;
}
.article-tag-list-item:nth-child(n + 2) {
  background: #673ab7;
}
.article-tag-list-item:nth-child(n + 3) {
  background: #ff9800;
}
.article-tag-list-item:nth-child(n + 4) {
  background: #f44336;
}
.article-tag-list-item:nth-child(n + 5) {
  background: #00abc0;
}
.waves-button,
.waves-button:hover,
.waves-button:visited,
.waves-button-input {
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 1em;
  text-align: center;
  text-decoration: none;
  z-index: 1;
}
.article-tag-list-link {
  display: block;
  padding: 0 16px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.8);
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}


.app-body {
  margin-top: 56px;
  background-color: #f6f6f6;
  animation-duration:0.5s;
}

.body-header .title {
  font-size: 24px;
  line-height: 30px;
  color: #ffffff;
}
.body-header .sub-title {
  padding-top: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  color: #c5cae9;
}

@media screen and (min-width: 987px) {
  .app-body .body-item {
    /* margin-top: 20px; */
    background-color: #ffffff;
    /* height: 200px; */
    padding: 16px 20px 0;
    width: 960px;
    margin: 10px auto;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
  }
  .app-body .body-header {
    text-align: center;
    padding: 20px 0 30px 30px;
    background-color: #3f51b5;
  }
}

@media screen and (max-width: 986px) {
  .app-body .body-item {
    margin-top: 10px;
    background-color: #ffffff;
    /* height: 200px; */
    padding-top: 16px;
    border-radius: 3px;
    box-sizing: border-box;
    /* box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58); */
  }
  .app-body .body-header {
    padding: 20px 0 30px 30px;
    background-color: #3f51b5;
  }
}

.article-time {
  margin: 0 0 10px;
  line-height: 14px;
  font-size: 13px;
  font-weight: bold;
  color: #727272;
  padding-left: 20px;
}
.article-title {
  color: #3f51b5;
  position: relative;
  display: inline-block;
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 10px;
  padding-left: 20px;
}
.article-content {
  padding-left: 20px;
  padding-right: 20px;
  word-break: break-all;
  padding-bottom: 0px;
  line-height: 1.8;
  font-size: 15px;
}
.read-more {
  display: block;
  font-size: 14px;
  text-decoration-line: none;
  margin-left: 20px;
  margin-top: -3px;
  margin-bottom: 8px;
}
.article-tags {
  border-top: 1px solid #ddd;
  padding: 10px 20px 0 20px;
}
.article-tag-list {
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-size: 13px;
  list-style: none;
}
.article-tag-list-item {
  display: inline-block;
  margin: 0 8px 8px 0;
  border-radius: 2px;
}
.article-tag-list-item:nth-child(n + 1) {
  background: #ff9800;
}
.article-tag-list-item:nth-child(n + 2) {
  background: #673ab7;
}
.article-tag-list-item:nth-child(n + 3) {
  background: #8bc34a;
}
.article-tag-list-item:nth-child(n + 4) {
  background: #f44336;
}
.article-tag-list-item:nth-child(n + 5) {
  background: #00abc0;
}
.waves-button,
.waves-button:hover,
.waves-button:visited,
.waves-button-input {
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 1em;
  text-align: center;
  text-decoration: none;
  z-index: 1;
}
.article-tag-list-link {
  display: block;
  padding: 0 16px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.8);
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}
</style>
