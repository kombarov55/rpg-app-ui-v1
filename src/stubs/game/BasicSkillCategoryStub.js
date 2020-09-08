export default {
    name: "Общие",
        img: "",
    description: "общие навыки",
    complex: false,
    skills: [
    {
        img: "",
        name: "Кулинария",
        description: "Описание навыка",
        prices: [
            [
                {
                    name: "Золото",
                    amount: 500
                }
            ],
            [
                {
                    name: "Золото",
                    amount: 100
                },
                {
                    name: "Опыт",
                    amount: 1000
                }
            ],
        ],
        upgradable: false
    },
    {
        img: "",
        name: "Сила",
        description: "Описание навыка",
        upgradable: true,
        upgrades: [
            {
                lvlNum: 1,
                description: "lvl1",
                prices: [
                    [
                        {
                            name: "Золото",
                            amount: 500
                        }
                    ],
                    [
                        {
                            name: "Золото",
                            amount: 100
                        },
                        {
                            name: "Опыт",
                            amount: 1000
                        }
                    ],
                ]
            },
            {
                lvlNum: 2,
                description: "lvl2",
                prices: [
                    [
                        {
                            name: "Золото",
                            amount: 500
                        }
                    ],
                    [
                        {
                            name: "Золото",
                            amount: 100
                        },
                        {
                            name: "Опыт",
                            amount: 1000
                        }
                    ],
                ]
            }
        ]
    },
    {
        img: "",
        name: "Ловкость",
        description: "Описание навыка",
        upgradable: false
    }
]
}
