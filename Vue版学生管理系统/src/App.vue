<template>
  <div id="app" class="wrapper">
    <sys-header></sys-header>
    <left-menu></left-menu>
  </div>
</template>

<script>
import sysHeader from './components/sysHeader.vue'
import leftMenu from './components/leftMenu.vue'
import api from './api.js'
import { mapActions } from 'vuex'
export default {
    components: {
      sysHeader,
      leftMenu
    },
    // 获取数据
    created() {
      this.getStuList()
      //this.$store.dispatch('getStuList')
    },
    methods: {
        ...mapActions(['getStuList'])
    }
}
</script>


<style>
*{
    padding: 0;
    margin: 0;
}

html, body,.wrapper {
    height: 100%;
    background-color: #eee;
}
button {
    cursor: pointer;
}
.wrapper .header {
    height: 70px;
    line-height: 70px;
    background: #354457;
    position: relative;
    z-index: 100;
}
.wrapper .header .logo {
    width: 200px;
    padding-left: 20px;
    height: 70px;
    line-height: 70px;
    color: #b3bcc5;
    font-size: 14px;
}
.wrapper .header .logo img {
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
}
.left-menu {
    width: 200px;
    background-color: #4d5e70;
    height: 100%;
    position: absolute;
    top: 0;
    padding-top: 70px;
    /* 设置的宽高 是包括padding border */
    box-sizing: border-box;
}
.left-menu dl {
    font-size: 14px;
    color: #b3bcc5;
}
.left-menu dl dt {
    font-weight: bold;
    padding: 10px;
}
.left-menu dl dd {
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
    cursor: pointer;
}
.left-menu dl dd.active {
    background-color: #ddd;
    color: #354457;
}
.right-content {
    min-width: 800px;
    width: calc(100% - 200px);
    padding-left: 200px;
    position: relative;
}

.right-content form {
    width: 400px;
    margin: 50px auto;
    
}
.right-content form label {
    display: inline-block;
    width: 150px;
    text-align: right;
    font-size: 16px;
}
.right-content form input {
    font-size: 16px;
}
.right-content form div {
    margin: 10px;
}
.right-content form .btn {
    padding: 5px 30px;
    font-size: 16px;
}

.student-list .search-bar {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 16px;
}
.search-bar label {
    font-size: 16px;
    color: #646987;
    font-weight: 800;
}
.search-bar  input {
    font-size: 16px;
    border: none;
    outline: none;
    height: 30px;
    width: 200px;
    color: #b3bcc5;
}
.search-bar .search-submit {
    padding: 0 10px;
    height: 30px;
    background-color: #354457;
    color: #fff;
    font-size: 16px;
    border: none;
    outline: none;
}
.search-submit:hover {
    background: #1e2936;
}
table {
    width: 100%;
    font-size: 14px;
    color: #354457;
    min-width: 800px;
    /* background-color: #fff; */
}
table thead {
    background-color: #e3e8ee;
}
table th, table td {
    text-align: center;
    padding: 10px;
}
table th {
    color: #646987;
}
table tbody {
    background-color: #fff;
}
table .btn {
    padding: 3px 10px;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
}
table .btn.edit {
    background-color: #5cb85c;
}
table .btn.edit:hover {
    background-color: #398439;
    border-color: #255625;
}
table .btn.del {
    background-color: #d9534f;
}
table .btn.del:hover {
    background-color: #c9302c;
}
#turn-page {
    float: right;
    margin: 20px;
}
#turn-page li {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #ddd;
    color: #b3bcc5;
    font-size: 14px;
    cursor: pointer;
}
#turn-page li.cur-page {
    background-color: #428bca;
    border: 1px solid #428bca;
    color: #fff;
}
.model {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.model .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
}
.model .model-content {
    width: 500px;
    height: 450px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -225px;
    margin-left: -250px;
    padding: 10px;
}
.model .model-content h3 {
    font-size: 16px;
    color: #b3bcc5;
}
.model .model-content form label {
    width: 80px;
}
.right-content .content {
    position: absolute;
    top: 0;
    width: calc(100% - 200px);
}
</style>
