<template>
    <div class="search-bar">
        <label for="search-word">关键字搜索：</label>
        <input type="text" id="search-word" v-model="keyWord">
        <button class="search-submit" id="search-submit" @click="search">搜索</button>
    </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
    data() {
        return {
            keyWord: ''
        }
    },
    methods: {
        search() {
            this.setKeyword(this.keyWord)
            if(this.keyWord == '') {
                this.getStuList()
            } else {
                this.searchStu()
            }
        },
        ...mapActions(['searchStu', 'getStuList']),
        ...mapMutations(['setKeyword'])
    }
}
</script>

