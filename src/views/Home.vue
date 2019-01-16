<template>
    <my-page title="百科" :page="page">
        <div class="box">
            <div class="slogan">
                企业百科解决方案
            </div>
            <div class="search-box">
                <input class="input" v-model="keyword" @input="handlerChange" @keydown="keyDown($event)" placeholder="输入关键词查看或搜索词条">
                <ui-icon-button class="icon" icon="search" @click="search" />
            </div>
        </div>
        <div class="list-box">
            <h2>最新词条：</h2>
            <ul class="list">
                <li class="item" v-for="item in items">
                    <router-link :to="`/items/${item.word}/${item.id}`">{{ item.word }}</router-link>
                </li>
            </ul>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                items: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?&utm_source=wiki',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.$http.get('/wiki/items?page_size=10').then(
                response => {
                    let data = response.data
                    console.log(data)
                    this.items = data
                },
                response => {
                    console.log(response)
                })
        },
        methods: {
            keyDown(e) {
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.search()
                }
            },
            search() {
                if (!this.keyword) {
                    return
                }
                // this.$router.push('/search?keyword=' + this.keyword)
                this.$router.push('/items/' + this.keyword)
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
</style>
