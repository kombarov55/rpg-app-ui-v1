class Roles {
    MAIN_ADMIN = "MAIN_ADMIN"
    NET_ADMIN  = "NET_ADMIN"
    SUBNET_ADMIN = "SUBNET_ADMIN"
    GAME_ADMIN = "GAME_ADMIN"
    GAME_MASTER = "GAME_MASTER"
    QUESTIONNAIRE_MANAGER = "QUESTIONNAIRE_MANAGER"
    PLAYER = "PLAYER"
    VISITOR = "VISITOR"

    values() {
        return [
            {value: this.MAIN_ADMIN, label: "Главный администратор"},
            {value: this.NET_ADMIN, label: "Администратор сети"},
            {value: this.SUBNET_ADMIN, label: "Администратор подсети"},
            {value: this.GAME_ADMIN, label: "Администратор игры"},
            {value: this.GAME_MASTER, label: "Мастер игры"},
            {value: this.QUESTIONNAIRE_MANAGER, label: "Анкетолог"},
            {value: this.PLAYER, label: "Игрок"},
            {value: this.VISITOR, label: "Посетитель"}
        ]
    }

    findByLabel(label) {
        console.log(label)
        console.log(this.values())

        return this.values().find(v => v.label === label).value
    }
}

export default new Roles()