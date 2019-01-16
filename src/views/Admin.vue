<template>
    <my-page title="管理平台" :page="page">
        呵呵
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'home',
                            to: '/',
                            title: '首页'
                        }
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
.box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    // justify-content: center;
    align-items: center;
}
.slogan {
    font-size: 30px;
    margin-bottom: 80px;
}
.search-box {
    position: relative;
    display: flex;
    width: 256px;
    height: 48px;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    background-color: #fff;
    .input {
        height: 48px;
        padding-left: 16px;
        flex-grow: 1;
        border: none;
        outline: none;
    }
    .type {
        position: relative;
        width: 48px;
    }
    .img {
        width: 32px;
        height: 32px;
        margin: 8px;
        cursor: pointer;
    }
    .type-menu {
        position: absolute;
        left: 0;
        top: 50px;
        background-color: #fff;
    }
}
.list-box {
    display: flex;
    position: absolute;
    left: 16px;
    bottom: 16px;
    .list {
        display: flex;
    }
    .item {
        margin-right: 8px;
    }
}
.empty-box {
    .text {
        margin-bottom: 8px;
    }
}
</style>
