<template @keyup="moveBlock()">
    <div class="game_wrapper">
        <div class="game_wrapper_top">
            <h2>2048</h2>
            <div class="game_wrapper_score">
                <div class="score current_score">
                    <div class="title">score</div>
                    <div class="value">{{currentScore}}</div>
                </div>
                <div class="score best_score">
                    <div class="title">best</div>
                    <div class="value">{{bestScore}}</div>
                </div>
            </div>
        </div>

        <div class="restart_wrapper">
            <div class="restart" @click="startGame()">New Game</div>
        </div>

        <div class="gameTablet">
            <div class="gridRow" v-for="i in gameSize" :key="i">
                <div class="gridColumn" v-for="j in gameSize" :key="j"></div>
            </div>
            <div class="gameGeneretedElements" id="gameGeneretedElements"></div>
        </div>
        
        
    </div>
</template>

<script>
export default {

    data: () => ({
        rand_value: [2, 4],
    }),

    computed: {
        currentScore() {
            return this.$store.getters.current_score
        },
        bestScore() {
            return this.$store.getters.best_score
        },
        gameSize() {
            return this.$store.getters.game_size
        },
        closePosition() {
            return this.$store.getters.close_position
        }
    },


    methods: {
        startGame () {
            this.celarGame()
            this.generateEl()
            this.generateEl()
        },

        generateEl() {
            let el_wrapper = new_el = null;
            let rand_x = this.getRandomIntInclusive(1, this.gameSize)
            let rand_y = this.getRandomIntInclusive(1, this.gameSize)
            let new_el = document.createElement("div");
            el_wrapper = document.getElementById("gameGeneretedElements");

            if (!this.closePosition.includes("position_" + rand_x + "_" + rand_y)) {
                new_el.innerHTML = this.rand_value[this.getRandomIntInclusive(0, this.rand_value.length - 1)];
                new_el.className = "g_el position_" + rand_x + "_" + rand_y;
                el_wrapper.append(new_el);
                console.log("push: " + "position_" + rand_x + "_" + rand_y);
                this.$store.dispatch("setPosition", "position_" + rand_x + "_" + rand_y);
            } else { 
                this.generateEl();
            }

        },

        getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        celarGame() {
            this.close_position = [];
            document.getElementById("gameGeneretedElements").innerHTML = ""
        },

        moveBlock() {
            console.log("move!!!")
        }
    },
    mounted() {
        this.startGame()
        window.addEventListener('keyup', (e) => {
            if (e.code === "ArrowLeft") {
                this.generateEl()
            }
            if (e.code === "ArrowRight") {
                this.generateEl()
            }
            if (e.code === "ArrowUp") {
                this.generateEl()
            }
            if (e.code === "ArrowDown") {
                this.generateEl()
            }
        });
    }
}
</script>

<style lang="scss">
    .game_wrapper_top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
        h2{
            font-size: 80px;
            font-weight: bold;
            margin: 0;
            display: block;
            color: #776e65;
        }
        .game_wrapper_score{
            display: flex;
            justify-content: space-between;
        }
        .score{
            position: relative;
            display: block;
            background: #bbada0;
            padding: 7px 15px;
            font-size: 25px;
            font-weight: bold;
            border-radius: 3px;
            color: white;
            text-align: center;
            max-height: 55px;
            margin-left: 10px;
            min-width: 43px;
            .title{
                text-transform: uppercase;
                width: 100%;
                font-size: 13px;
                line-height: 13px;
                text-align: center;
                color: #eee4da;
                margin-bottom: 4px;
            }
        }
    }

    .restart_wrapper{
        display: flex;
        text-align: center;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
    }

    .restart{
        background: #8f7a66;
        border-radius: 3px;
        padding: 0 20px;
        text-decoration: none;
        color: #f9f6f2;
        height: 40px;
        line-height: 42px;
        cursor: pointer;
        max-width: 130px;
        width: 119px;
    }

    .gameTablet{
        background: #bbada0;
        width: 500px;
        height: 500px;
        margin-top: 50px;
        border-radius: 8px;
        position: relative;
        padding: 15px;
        .gridRow{
            display: flex;
            justify-content: space-between;
            margin-bottom: 13.5px;
        }
        .gridColumn{
            width: 23%;
            height: 115px;
            border-radius: 3px;
            background: rgba(238, 228, 218, 0.35);
        }
    }
    .gameGeneretedElements{
        position: absolute;
        z-index: 5;
        top: 0;
        left: 0;
        padding: 15px;
    }

    .g_el {
        position: absolute;
        width: 115px;
        height: 115px;
        line-height: 115px;
        background: #eee4da;
        border-radius: 3px;
        background: #eee4da;
        text-align: center;
        font-weight: bold;
        z-index: 10;
        font-size: 55px;
        color: #8f7a66;
    }

    .position_1_1{
        transform: translate(0px, 0px);
    }
    .position_1_2{
        transform: translate(128px, 0px);
    }
    .position_1_3{
        transform: translate(256px, 0px);
    }
    .position_1_4{
        transform: translate(384px, 0px);
    }


    .position_2_1{
        transform: translate(0px, 129px);
    }
    .position_2_2{
        transform: translate(128px, 129px);
    }
    .position_2_3{
        transform: translate(256px, 129px);
    }
    .position_2_4{
        transform: translate(384px, 129px);
    }


    .position_3_1{
        transform: translate(0px, 257px);
    }
    .position_3_2{
        transform: translate(128px, 257px);
    }
    .position_3_3{
        transform: translate(256px, 257px);
    }
    .position_3_4{
        transform: translate(384px, 257px);
    }


    .position_4_1{
        transform: translate(0px, 386px);
    }
    .position_4_2{
        transform: translate(128px, 386px);
    }
    .position_4_3{
        transform: translate(256px, 386px);
    }
    .position_4_4{
        transform: translate(384px, 386px);
    }
</style>