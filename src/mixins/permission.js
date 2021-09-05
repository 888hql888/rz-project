
export default {
    methods:{
        //判断是否拥有权限
        filterPermission(params){
            return this.$store.getters.userInfo.roles.points.includes(params)
        }
    }
}