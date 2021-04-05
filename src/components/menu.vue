<template>
    <div class="menu">
        <div class="menu_item" @click="startNewGame()">Новая игра</div>
        <div class="menu_item"
            :class="{disabled: !saved}"
            @click="continueGame()"
        >Продолжить</div>
        <div class="menu_item" @click="showRecord()">Рекорд</div>
        <div class="menu_item" @click="showSettings()">Настройки</div>
        <div class="menu_item" @click="showAbout()">О программе</div>
    </div>
</template>

<script>
export default {
    data: () => ({
        saved: false
    }),
    mounted() {
        if (localStorage.getItem('saved_game')) {
            this.saved = true
        }
    },
    methods: {
        startNewGame() {
            this.$store.dispatch('setGameStatus', "new_game")
        },
        continueGame() {
            this.$store.dispatch('setGameStatus', "continue_game")
        },
        showRecord() {
            this.$store.dispatch('setGameStatus', "record")
        },
        showAbout() {
            this.$store.dispatch('setGameStatus', "about")
        },
        showSettings() {
            this.$store.dispatch('setGameStatus', "settings")
        }
    }
}
</script>

<style lang="scss" scoped>
    .menu{
        width: 100%;
        height: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .menu_item{
            margin: 30px 0;
            font-size: 30px;
            cursor: pointer;
            color: #595959;
            transition: color .3s;
            &.disabled{
                opacity: 0.6;
                pointer-events: none;
                &:hover{
                    color: #595959;
                }
            }
            &:hover{
                color: chocolate;
            }
        }
    }
    .black_theme {
        .menu_item{
            color: #fff;
        }
    }
</style>
