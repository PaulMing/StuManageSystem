<template>
    <div class="student-list content">
        <stu-search></stu-search>
        <stu-table></stu-table>
        <turn-page></turn-page> 
        <model v-if="showModel"></model>             
    </div>
</template>

<script>
import stuSearch from '../components/stuSearch.vue'
import stuTable from '../components/stuTable.vue'
import turnPage from '../components/turnPage.vue'
import model from '../components/model.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    components: {
        stuSearch,
        stuTable,
        turnPage,
        model
    },
    computed: {
        ...mapState(['showModel'])
    }
}
</script>
