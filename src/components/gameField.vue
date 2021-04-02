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
            <div class="gameGeneretedElements" id="gameGeneretedElements">

            </div>
        </div>
        
    </div>
</template>

<script>
export default {

    data: () => ({
        rand_value: [2, 4]
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
        },
        gameStatus() {
            return this.$store.getters.game_status
        }
    },


    methods: {
        startNewGame () {
            this.celarGame()
            this.generateEl()
            this.generateEl()
        },

        loadGame() {
            if (localStorage.getItem("saved_game")) {
                let save_game_object = JSON.parse(localStorage.getItem("saved_game"))
                document.querySelector("#gameGeneretedElements").innerHTML = save_game_object.blocks_string
                this.$store.dispatch('setSaveGame', save_game_object)
            } else {
                this.startNewGame()
            }
        },

        generateEl() {
            let el_wrapper = new_el = null;
            let rand_x = this.getRandomIntInclusive(1, this.gameSize)
            let rand_y = this.getRandomIntInclusive(1, this.gameSize)
            let new_el = document.createElement("div");
            el_wrapper = document.getElementById("gameGeneretedElements");

            if (!this.closePosition.includes("position_" + rand_x + "_" + rand_y)) {
                new_el.innerHTML = this.rand_value[this.getRandomIntInclusive(0, this.rand_value.length - 1)];
                new_el.title = new_el.innerText
                new_el.setAttribute("x", rand_x)
                new_el.setAttribute("y", rand_y)
                new_el.className = "g_el position_" + rand_x + "_" + rand_y;
                el_wrapper.append(new_el);
                this.$store.dispatch("setPosition", "position_" + rand_x + "_" + rand_y);
            } else { 
                this.generateEl();
            }
        },

        move(to) {
            
            let gridRow = document.querySelectorAll(".gridRow");
            let was_movement = false;
           
            if (to === "toLeft" || to === "toRight") {
                for (let i = 0; i < gridRow.length; i++) {
                    let row_els = document.querySelectorAll(".gameGeneretedElements .g_el[x='" + parseInt(i + 1) + "']");
                    let row_els_arr = Array.prototype.slice.call(row_els, 0);
                    
                    if (to === "toLeft") {
                        row_els_arr = row_els_arr.sort((a, b) => { return parseFloat(a.getAttribute("y")) - parseFloat(b.getAttribute("y")) })
                        for (let el = 0; el < row_els_arr.length; el++) {
                            let y = 4;
                            let current_el = row_els_arr[el];
                            let current_el_y = parseInt(current_el.getAttribute("y"))
                            while (y >= 1) {
                                if (y < current_el_y) {
                                    let prev_el = document.querySelector(".gameGeneretedElements .g_el[x='" + parseInt(i + 1) + "'][y='" + y + "']")
                                    if (prev_el === null) {
                                        current_el.setAttribute("y", y);
                                        was_movement = true
                                    }
                                    if (prev_el) {
                                        let prev_el_value = parseInt(prev_el.innerText)
                                        let prev_el_y = parseInt(prev_el.getAttribute("y"))
                                        if (prev_el_value === parseInt(current_el.innerText) && !prev_el.classList.contains("be_apply")) {
                                            current_el.setAttribute("y", prev_el_y)
                                            was_movement = true
                                            prev_el.remove()

                                            current_el.classList.add("be_apply")
                                            current_el.innerText = parseInt(current_el.innerText) * 2
                                            this.$store.commit("setCurrentScore", parseInt(current_el.innerText))
                                            current_el.setAttribute("title", parseInt(current_el.innerText))
                                            break
                                        } else {
                                            break
                                        }
                                    }
                                }
                                current_el.classList.remove("be_apply");
                                y--;
                            }
                        }
                    }

                    if (to === "toRight") {
                        row_els_arr = row_els_arr.sort((a, b) => { return parseFloat(b.getAttribute("y")) - parseFloat(a.getAttribute("y")) })
                        for (let el = 0; el < row_els_arr.length; el++) {
                            let y = 1;
                            let current_el = row_els_arr[el];
                            let current_el_y = parseInt(current_el.getAttribute("y"))
                            while (y <= 4) {
                                if (y > current_el_y) {
                                    let prev_el = document.querySelector(".gameGeneretedElements .g_el[x='" + parseInt(i + 1) + "'][y='" + y + "']")
                                    if (prev_el === null) {
                                        current_el.setAttribute("y", y)
                                        was_movement = true
                                    }
                                    if (prev_el) {
                                        let prev_el_value = parseInt(prev_el.innerText)
                                        let prev_el_y = parseInt(prev_el.getAttribute("y"))
                                        if (prev_el_value === parseInt(current_el.innerText) && !prev_el.classList.contains("be_apply")) {
                                            current_el.setAttribute("y", prev_el_y)
                                            was_movement = true
                                            prev_el.remove()
                                            current_el.classList.add("be_apply")
                                            current_el.innerText = parseInt(current_el.innerText) * 2
                                            this.$store.commit("setCurrentScore", parseInt(current_el.innerText))
                                            current_el.setAttribute("title", parseInt(current_el.innerText))
                                            break
                                        } else {
                                            break
                                        }
                                    }
                                }
                                current_el.classList.remove("be_apply");
                                y++;
                            }
                        }
                    }
                }
            }

            if (to === "toDown") {
                for (let i = 4; i >= 1; i--) {
                    let row_els = document.querySelectorAll(".gameGeneretedElements .g_el[y='" + parseInt(i) + "']");
                    let row_els_arr = Array.prototype.slice.call(row_els, 0);
                    row_els_arr = row_els_arr.sort((a, b) => { return parseFloat(b.getAttribute("x")) - parseFloat(a.getAttribute("x")) })
    
                    for (let el = 0; el < row_els_arr.length; el++) {
                        let x = 1;
                        let current_el = row_els_arr[el];
                        while (x <= 4) {
                            let current_el_x = parseInt(current_el.getAttribute("x"))
                            let prev_el = document.querySelector(".gameGeneretedElements .g_el[x='" + parseInt(current_el_x + 1) + "'][y='" + i + "']")
                            if (prev_el === null && current_el_x < x) {
                                current_el.setAttribute("x", parseInt(x))
                                was_movement = true
                            }
                            if (prev_el){
                                let prev_el_value = parseInt(prev_el.innerText)
                                let current_el_value = parseInt(current_el.innerText)
                                if (prev_el_value === current_el_value && !prev_el.classList.contains("be_apply")) {
                                    current_el.innerText = parseInt(current_el.innerText) * 2
                                    current_el.setAttribute("x", parseInt(prev_el.getAttribute("x")))
                                    was_movement = true
                                    prev_el.remove()
                                    current_el.classList.add("be_apply")
                                    this.$store.commit("setCurrentScore", parseInt(current_el.innerText))
                                    current_el.setAttribute("title", parseInt(current_el.innerText))
                                    break
                                } else {
                                    break
                                }
                            }
                            current_el.classList.remove("be_apply");
                            x++
                        }
                    }
                }
            }


            if (to === "toUp") {
                for (let i = 1; i <= 4; i++) {
                    let row_els = document.querySelectorAll(".gameGeneretedElements .g_el[y='" + parseInt(i) + "']");
                    let row_els_arr = Array.prototype.slice.call(row_els, 0);
                    row_els_arr = row_els_arr.sort((a, b) => { return parseFloat(a.getAttribute("x")) - parseFloat(b.getAttribute("x")) })
                    for (let el = 0; el < row_els_arr.length; el++) {
                        let x = 4;
                        let current_el = row_els_arr[el];
                        while (x >= 1) {
                            let current_el_x = parseInt(current_el.getAttribute("x"))
                            let prev_el = document.querySelector(".gameGeneretedElements .g_el[x='" + parseInt(current_el_x - 1) + "'][y='" + i + "']")
                            if (prev_el === null && current_el_x > x) {
                                current_el.setAttribute("x", parseInt(x))
                                was_movement = true
                            }
                            if (prev_el){
                                let prev_el_value = parseInt(prev_el.innerText)
                                let current_el_value = parseInt(current_el.innerText)
                                if (prev_el_value === current_el_value && !prev_el.classList.contains("be_apply")) {
                                    current_el.innerText = parseInt(current_el.innerText) * 2
                                    current_el.setAttribute("x", parseInt(prev_el.getAttribute("x")))
                                    was_movement = true
                                    prev_el.remove()
                                    current_el.classList.add("be_apply")
                                    this.$store.commit("setCurrentScore", parseInt(current_el.innerText))
                                    current_el.setAttribute("title", parseInt(current_el.innerText))
                                    break
                                } else {
                                    break
                                }
                            }
                            x--;
                        }
                        current_el.classList.remove("be_apply");
                    }
                }
            }

            this.setState()

            if (was_movement ) {
                setTimeout(() => {
                    this.generateEl()
                }, 200)
            }
        },
        setState() {
            let current_state_elements = document.querySelectorAll("#gameGeneretedElements .g_el")
            let new_el_array = [];
            let setting_save_game = true // добаить в меню настроек
            for (let i = 0; i < current_state_elements.length; i++) {
                let el_x = parseInt(current_state_elements[i].getAttribute("x"))
                let el_y = parseInt(current_state_elements[i].getAttribute("y"))
                new_el_array.push("position_" + el_x + "_" + el_y)

                if (current_state_elements[i].classList.contains("be_apply")) {
                   
                    current_state_elements[i].classList.remove("be_apply")
                }
            }
            this.$store.dispatch("setNewStateElements", new_el_array);

            if (setting_save_game) {
                
                setTimeout(() => {
                    let save_game = {}
                    let blocks_string = document.querySelector("#gameGeneretedElements").innerHTML
                    save_game.blocks_string = blocks_string
                    save_game.score = this.currentScore
                    localStorage.setItem("saved_game", JSON.stringify(save_game))
                }, 300)
               
            }
            
        },

        getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        celarGame() {
            this.$store.dispatch("celarGame");
            document.getElementById("gameGeneretedElements").innerHTML = ""
        },

    },
    mounted() {
        if (this.gameStatus === "continue_game") {
            this.loadGame()
        } else {
            this.startNewGame()
        }
        
        window.addEventListener('keyup', (e) => {
            if (e.code === "ArrowLeft") {
                this.move("toLeft")
            }
            if (e.code === "ArrowRight") {
                this.move("toRight")
            }
            if (e.code === "ArrowUp") {
                this.move("toUp")
            }
            if (e.code === "ArrowDown") {
                this.move("toDown")
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
        transition: all .15s;
        color: #8f7a66;
    }
    .g_el[title="4"]{
        background: #eee1c9;
    }
    .g_el[title="8"]{
        background: #f3b27a;
        color: #fff;
    }
    .g_el[title="16"]{
        background: #f69664;
        color: #fff;
    }
    .g_el[title="32"]{
        background: #f77c5f;
        color: #fff;
    }
    .g_el[title="64"]{
        background: #f75f3b;
        color: #fff;
    }
    .g_el[title="128"]{
        background: #edd073;
        color: #fff;
    }
    
    .g_el[title="256"]{
        background: #edcc62;
        color: #fff;
    }
    .g_el[title="512"]{
        color: #fff;
        background: #edc950;
        box-shadow: 0 0 30px 10px rgb(243, 215, 116 / 40%), inset 0 0 0 1px rgb(255, 255, 255 / 24%);
    }
    .g_el[title="1024"]{
        color: #f9f6f2;
        background: #edc53f;
        box-shadow: 0 0 30px 10px rgb(243, 215, 116 / 48%), inset 0 0 0 1px rgb(255, 255, 255 / 29%);
        font-size: 41px;
    }

    .g_el[title="2048"]{
        color: #f9f6f2;
        background: #edc22e;
        box-shadow: 0 0 30px 10px rgb(243, 215, 116 / 48%), inset 0 0 0 1px rgb(255, 255, 255 / 29%);
        font-size: 41px;
    }

    .g_el[title="4096"]{
        color: #fff;
        background: #9e0c0c;
        box-shadow: 0 0 30px 10px rgb(243, 215, 116 / 48%), inset 0 0 0 1px rgb(255, 255, 255 / 29%);
        font-size: 41px;
    }

    
    .g_el[x="1"][y="1"]{
        transform: translate(0px, 0px);
    }

    .g_el[x="1"][y="2"]{
        transform: translate(128px, 0px);
    }

    .g_el[x="1"][y="3"]{
        transform: translate(256px, 0px);
    }

    .g_el[x="1"][y="4"]{
       transform: translate(384px, 0px);
    }


    .g_el[x="2"][y="1"]{
        transform: translate(0px, 129px);
    }

    .g_el[x="2"][y="2"]{
        transform: translate(128px, 129px);
    }

    .g_el[x="2"][y="3"]{
        transform: translate(257px, 129px);
    }

    .g_el[x="2"][y="4"]{
       transform: translate(384px, 129px);
    }


    .g_el[x="3"][y="1"]{
        transform: translate(0px, 257px);
    }

    .g_el[x="3"][y="2"]{
        transform: translate(128px, 257px);
    }

    .g_el[x="3"][y="3"]{
        transform: translate(256px, 257px);
    }

    .g_el[x="3"][y="4"]{
       transform: translate(385px, 257px);
    }

    .g_el[x="4"][y="1"]{
        transform: translate(0px, 386px);
    }

    .g_el[x="4"][y="2"]{
        transform: translate(128px, 386px);
    }

    .g_el[x="4"][y="3"]{
        transform: translate(257px, 386px);
    }

    .g_el[x="4"][y="4"]{
       transform: translate(384px, 386px);
    }


</style>