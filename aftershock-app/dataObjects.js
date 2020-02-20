export const TeamData = {
    players: [
        {
            number: "33",
            name: "E. Tweedle",
            status: "Good",
            active: true,
            max: 3.2,
            battery: 0,
            id: "1"
        },
        {
            number: "13",
            name: "M. Laferriere",
            status: "Poor",
            active: true,
            max: 10,
            battery: 20,
            id: "2"
        },
        {
            number: "96",
            name: "C. Drysdale",
            status: "Okay",
            active: true,
            max: 5.7,
            battery: 40,
            id: "3"
        },
        {
            number: "54",
            name: "C. Blair",
            status: "Good",
            active: true,
            max: 0,
            battery: 60,
            id: "4"
        },
        {
            number: "7",
            name: "B. McAllister",
            status: "Poor",
            active: true,
            max: 9.8,
            battery: 80,
            id: "5"
        },
        {
            number: "87",
            name: "S. Crosby",
            status: "Off",
            active: false,
            max: 0,
            battery: 0,
            id: "6"
        }
    ]
}

export const PlayerData = {
    1: {
        number: "33",
        name: "Eric Tweedle",
        status: "Good",
        active: true,
        max: 3.2,
        battery: 100,
        age: "22",
        team: "Lincoln Blades",
        position: "Defense",
        height: `6'5"`,
        weight: "220 lbs",
        gamesPlayed: 13,
        totalCollisions: 54,
        risk: 55,
        currentGame: [
            { time: 1, acceleration: 12, rotational: 3},
            { time: 2, acceleration: 3.5, rotational: 2.1 },
            { time: 3, acceleration: 6.7, rotational: 2.5 },
            { time: 4, acceleration: 25, rotational: 5 },
            { time: 5, acceleration: 10, rotational: 2.9 },
            { time: 6, acceleration: 0.5, rotational: 0.5 },
            { time: 7, acceleration: 0.3, rotational: 0.3 },
            { time: 8, acceleration: 2, rotational: 1.2 },
            { time: 9, acceleration: 4.8, rotational: 1.5 },
            { time: 10, acceleration: 7.1, rotational: 1.7 },
            { time: 11, acceleration: 9.81, rotational: 9.81 },
            { time: 12, acceleration: 0.02, rotational: 0.1 }
        ]
    },
    2: {
        number: "13",
        name: "Marcus Lafarriere",
        status: "Poor",
        active: false,
        max: 25,
        battery: 30,
        age: "22",
        team: "Waterloo Warriors",
        position: "Left Wing",
        height: `5'11"`,
        weight: "180 lbs",
        gamesPlayed: 27,
        totalCollisions: 140,
        risk: 85,
        currentGame: [
            { time: 1, acceleration: 12, rotational: 3},
            { time: 2, acceleration: 3.5, rotational: 2.1 },
            { time: 3, acceleration: 6.7, rotational: 2.5 },
            { time: 4, acceleration: 25, rotational: 5 },
            { time: 5, acceleration: 10, rotational: 2.9 },
            { time: 6, acceleration: 30, rotational: 0.5 },
            { time: 7, acceleration: 0.3, rotational: 0.3 },
            { time: 8, acceleration: 2, rotational: 1.2 },
            { time: 9, acceleration: 4.8, rotational: 5.2 },
            { time: 10, acceleration: 7.1, rotational: 1.7 },
            { time: 11, acceleration: 9.81, rotational: 9.81 },
            { time: 12, acceleration: 3, rotational: 0.1 },
            { time: 13, acceleration: 4, rotational: 10 },
            { time: 14, acceleration: 5, rotational: 2 },
            { time: 15, acceleration: 6, rotational: 3.75 }
        ]
    }
}