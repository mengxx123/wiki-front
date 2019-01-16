<template>
    <my-page :title="title" :page="page">
        <ui-text-field v-model="form.word" label="词语"></ui-text-field>
        <br>
        <ui-text-field v-model="form.content" label="内容" multiLine :rows="3" :rowsMax="10"></ui-text-field>
        <br>
        <ui-raised-button primary label="保存" @click="save" />
        <ui-raised-button secondary label="删除" @click="remove" />

    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    word: '',
                    content: '',
                },
                editType: 'add',
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
            this.id = this.$route.params.id
            if (!this.id) {
                return
            }
            this.editType = 'update'
            this.$http.get('/wiki/items/' + this.id).then(
                response => {
                    let data = response.data
                    console.log(data)
                    if (!data.length) {
                        this.empty = true
                        return
                    }
                    this.detail = data[0]
                    this.form.word = this.detail.word
                    this.form.content = this.detail.content
                },
                response => {
                    console.log(response)
                })
        },
        methods: {
            save() {
                if (this.editType === 'add') {
                    this.$http.post('/wiki/items', {
                        word: this.form.word,
                        content: this.form.content,
                    }).then(
                        response => {
                            let data = response.data
                            console.log(data)
                            this.$message({
                                type: 'danger',
                                text: '保存成功'
                            })
                            this.form.word = ''
                            this.form.content = ''
                        },
                        response => {
                            console.log(response)
                        })
                } else {
                    this.$http.put(`/wiki/items/${this.detail.id}`, {
                        word: this.form.word,
                        content: this.form.content,
                    }).then(
                        response => {
                            let data = response.data
                            console.log(data)
                            this.$message({
                                type: 'danger',
                                text: '保存成功'
                            })
                        },
                        response => {
                            console.log(response)
                        })
                }
            },
            remove() {
                this.$http.delete(`/wiki/items/${this.detail.id}`).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.$message({
                            type: 'danger',
                            text: '删除成功'
                        })
                        this.$router.push('/admin2')
                    },
                    response => {
                        console.log(response)
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
