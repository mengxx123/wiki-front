<template>
    <my-page :title="title" :page="page">
        <div class="empty-box" v-if="empty">
            <div class="text">云设百科暂未收录词条 “{{ word }}”</div>
            <div class="text">欢迎您来创建，与广大网友分享关于该词条的信息。 </div>
            <ui-raised-button primary label="我来创建" @click="create" />
        </div>
        <div v-if="detail">
            <ui-article v-html="detail.content"></ui-article>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                empty: false,
                title: '词条详情',
                word: '',
                detail: null,
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
            let id = this.$route.params.id
            let id2 = this.$route.params.id2
            this.word = id
            this.$http.get(`/wiki/items/${id2 || id}?convert=true`).then(
                response => {
                    let data = response.data
                    console.log(data)
                    if (!data.length) {
                        this.empty = true
                        return
                    }
                    this.detail = data[0]
                    this.title = this.detail.word
                },
                response => {
                    console.log(response)
                })
            window.addEventListener('keydown', this.onKeyDown = e => {
                console.log(e.keyCode)
                if (e.keyCode === 69) {
                    this.$router.push('/admin/items/' + this.detail.id)
                }
            })
        },
        destroyed() {
            window.removeEventListener('keydown', this.onKeyDown)
        },
        methods: {
            create() {
                this.$message({
                    type: 'danger',
                    text: '功能暂未实现'
                })
            }
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
