<template>
    <div class="menu_block" @click="showMenu()">
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        menu
    </div>
</template>

<script>
export default {
    methods: {
        showMenu() {
            this.$store.dispatch("setGameStatus", "menu")
        }
    }
}
</script>

<style lang="scss">
.menu_block{
    font-size: 14px;
    color: #483e34;
    font-weight: 600;
    position: relative;
    margin-top: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    .hamburger{
        margin-right: 10px;
    }
    span{
        width: 20px;
        height: 2px;
        background: #483e34;
        display: block;
        &:nth-child(2){
            margin-top: 5px;
        }
        &:nth-child(3){
            margin-top: 5px;
        }
    }
}
</style>
