export default {
    id: "1",
        name: "Магия",
    description: "Магические навыки.",
    img: "",
    complex: true,
    spellSchools: [
    {
        id: "2",
        name: "Школа огня",
        description: "Школа магии огня. Обучение происходит в огненной обстановке. Учитель просто огонь.",
        img: "",
        minSpellCountToUpgrade: 3,
        schoolLvls: [
            {
                lvl: 1,
                upgradePriceCombinations: [
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
                spells: [
                    {
                        img: "",
                        name: "Файербол",
                        description: "Простой огненный шар."
                    },
                    {
                        img: "",
                        name: "Потение",
                        description: "Маг покрывыается потом, что увеличивает защиту от огня на 5%."
                    }
                ]
            }

        ]

    }
]
}
