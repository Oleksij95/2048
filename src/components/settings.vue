<template>
    <div class="settings_wrapper">
        <h1>Настройки:</h1>
        <div class="setting">
            <p class="title">Тема</p>
            <div class="radio_wrapper">
                <input type="radio" name="theme" id="white" value="white" checked>
                <label for="white">Светлая</label>
            </div>

            <div class="radio_wrapper">
                <input type="radio" name="theme" id="black" value="black">
                <label for="black">Темная</label>
            </div>
        </div>

        <div class="setting in_progress">
            <p class="title">Размер</p>

            <div class="radio_wrapper">
                <input type="radio" name="size" id="standart" value="standart" checked>
                <label for="standart">4x4</label>
            </div>

            <div class="radio_wrapper">
                <input type="radio" name="size" id="big" value="big">
                <label for="big">8x8</label>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
       
    }
</script>

<style lang="scss" scoped>
    .settings_wrapper{
        h1{
            text-align: center;
        }
        .setting{
            border-bottom: 1px solid #ccc;
            padding-bottom: 20px;
            margin-bottom: 20px;
            .radio_wrapper{
                margin-bottom: 15px;
            }
            label{
                font-size: 19px;
            }
            &.in_progress{
                pointer-events: none;
                position: relative;
                &::before{
                    content: "В разработке";
                    width: 100%;
                    height: 100%;
                    line-height: 150px;
                    position: absolute;
                    background: rgba(234, 234, 234, 0.8);
                    text-align: center;
                    font-size: 20px;
                    color: #000;
                    opacity: 1;
                }
            }
        }
        p.title{
            font-size: 25px;
        }
    }
</style>