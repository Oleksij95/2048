<template>
    <div class="menu">
        <div class="menu_item" @click="startNewGame()">Новая игра</div>
        <div class="menu_item disabled">Продолжить</div>
        <div class="menu_item">Рекорд</div>
        <div class="menu_item">О программе</div>
    </div>
</template>

<script>
export default {
   methods: {
       startNewGame(){
           this.$store.dispatch('startNewGame', "new_game")
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
</style>
