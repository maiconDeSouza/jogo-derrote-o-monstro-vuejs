new Vue({
    el: '#app',
    data: {
        running: false,
        gameResult: '',
        playerLife: 100,
        monsterLife: 100,
        playerAttack: 0,
        monsterAttack: 0,
        playerHeal: 0,
        logs: [],
        buttonEspecial: 3,
        buttonHeal: 3
    },
    computed: {
        result(){

            if(this.playerLife === 0){
                this.gameResult = 'lose'
            }

            if(this.monsterLife === 0){
                this.gameResult = 'win'
            }
        }
    },
    methods: {
        startGameReset(){
            this.running = !this.running
            this.playerLife = 100,
            this.monsterLife = 100,
            this.logs = []
            this.gameResult = ''
            this.buttonEspecial = 3
            this.buttonHeal = 3
    
        },
        attack(){
            this.playerAttack = _.random(7, 10)
            this.monsterAttack = _.random(7, 12)
            this.playerLife -= this.monsterAttack
            this.monsterLife -= this.playerAttack
            this.logs.unshift({
                player: `Seu ataque foi de ${this.playerAttack}`,
                monster: `O ataque do Monstro foi de ${this.monsterAttack}`
            })
            this.playerAttack = 0
            this.monster = 0
        },
        attackEspecial(){
            this.playerAttack = _.random(7, 12)
            this.monsterAttack = _.random(5, 10)
            this.playerLife -= this.monsterAttack
            this.monsterLife -= this.playerAttack
            this.logs.unshift({
                player: `Seu ataque especial foi de ${this.playerAttack}`,
                monster: `O ataque especial do Monstro foi de ${this.monsterAttack}`
            })
            this.buttonEspecial--
            this.playerAttack = 0
            this.monster = 0
        },
        heal(){
            this.playerHeal = _.random(12, 20)
            this.monsterAttack = _.random(5, 12)
            this.playerLife += (this.playerHeal - this.monsterAttack)
            this.logs.unshift({
                player: `Sua recuperação foi de ${this.playerHeal}`,
                monster: `O ataque do Monstro foi de ${this.monsterAttack}`
            })
            this.buttonHeal--
            this.playerHeal = 0
        }
    },
    watch: {
        playerLife(){
            if(this.playerLife <= 0){
                this.playerLife = 0
                this.running = false
                this.result()
            }
        },
        monsterLife(){
            if(this.monsterLife <= 0){
                this.monsterLife = 0
                this.running = false
                this.result()
            }
        },
        playerHeal(){
            if(this.playerLife > 100){
                this.playerLife = 100
            }
        }
    }
})