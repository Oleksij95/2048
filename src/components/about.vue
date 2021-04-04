<template>
    <div class="about_wrapper">
        <h1>О программе:</h1>
        <p>Целю разработки данной игры было изучения Vue.js(версии 2). При разработке был использован компонентных подход. Задействован VUEX.</p>
        <p>Все исходники можно посмотреть на <a href="https://github.com/Oleksij95/2048">GitHub</a></p>
        <p>По всем вопросам пишите на <a href="mailto:anisimovoleksey@gmail.com">мою почту</a></p>

        <p>P.S адаптива нет, так как хотелось изучить именно Vue :))</p>
    </div>
</template>

<script>
    export default {
       
    }
</script>

<style lang="scss" scoped>
    .about_wrapper{
        h1{
            text-align: center;
        }
        p{
            font-size: 18px;
            line-height: 30px;
        }
    }
    .black_theme{
        .about_wrapper{
            h1, p{
                color: #fff;
            }
        }
    }
</style>