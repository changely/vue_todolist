var app;
app = new Vue({
    el: '#main',
    data: {
        list: [],
        newitem: {
            title: '',
            isChecked: false
        },
        showStatus: [true, false],
        edititem: "",    //记录正在编辑的数据
        beforeTitle: ""    //记录正在编辑的数据的title
    },
    computed:{
        noCheckeLength: function () {
            return this.list.filter(function (item) {
                return !item.isChecked
            }).length
        }
    },
    mounted() {
        var data = this.getData();
        if (data) {
            this.list = this.getData();
        } else {
            this.list = []
        }
    },
    watch: {
        list: {
            handler: function () {
                this.storeData();
            },
            deep: true
        }
    },
    methods: {
        //输入框添加任务
        addOnelist(newitem){
            if (newitem.title != '') {
                this.list.push(newitem);
                this.newitem = {title: '', isChecked: false};
            } else {
                alert('请输入任务');
            }
        },
        //按删除按钮删除任务
        deleteitem(index){
            this.list.splice(index, 1);
        },
        //正再编辑
        editOne(item){
            this.beforeTitle = item.title;
            this.edititem = item;
            console.log(this.beforeTitle);
        },
        //编辑完
        editedOne(item){
            this.edititem = '';
        },
        //返回数据
        cancelOne(item){
            console.log(123)
           item.title = this.beforeTitle;
           this.beforeTitle ='';
           this.edititem = '';
        },
        //显示所有未完成任务
        showUnchecked(){
            this.showStatus = [false];
        },
        //显示所有已完成任务
        showChecked(){
            this.showStatus = [true];
        },
        //显示所有任务
        showAll(){
            this.showStatus = [true, false];
        },
        storeData() {
            localStorage.setItem('list', JSON.stringify(this.list))
        },
        getData() {
            return JSON.parse(localStorage.getItem('list'));
        }
    }
})