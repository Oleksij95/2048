<template>
    <div class="record_wrapper">
        <h1>Ваш рекорд:</h1>
        <p class="record_value">{{ recordScore }}</p>
    </div>
</template>

<script>
    export default {
        computed: {
            recordScore () {
                return this.$store.getters.best_score
            }
        }
    }
</script>

<style lang="scss" scoped>
    .record_wrapper{
        height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        h1{
            text-align: center;
        }
        p.record_value{
            font-size: 90px;
            text-align: center;
            line-height: 20px;
        }
    }
</style>