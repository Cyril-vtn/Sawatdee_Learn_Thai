const userCreationData = {
  level: 1,
  xp: 0,
  finished: [],
  profilePic: "",
  friends: [{}],
  createdAt: new Date().toDateString(),
  dayStreak: [0, new Date().toDateString()],
  division: "Beginner",
  top3: 0,
  Succes: [
    {
      name: "Le début d'une belle histoire",
      img: ["_2yBMs", "_2N2OI"],
      description: "Complète ta premère leçon",
      completed: false,
      count: 0,
      tier: 0,
      reward: {
        xp: 50,
      },
    },
    {
      name: "Ami pour la vie",
      img: ["_2zNmn", "_2SNGW"],
      description: "Ajoute 3 amis",
      completed: false,
      count: 0,
      tier: 0,
      tierCounts: [3, 10, 20, 50, 100],
      reward: {
        xp: 50,
      },
    },
    {
      name: "Photogénique",
      img: ["_3Nhfm", "_1X1Kv"],
      description: "Ajoute une photo de profil",
      completed: false,
      count: 0,
      tier: 0,
      reward: {
        xp: 50,
      },
    },
    {
      name: "Sans-faute",
      img: ["_1pkpX", "_3c1H2"],
      description: "Terminer 1 leçons sans faire une seule faute",
      count: 0,
      tier: 0,
      completed: false,

      tierCounts: [1, 5, 20, 50, 100],
      reward: {
        xp: 50,
      },
    },
    {
      name: "Puits de science",
      img: ["_20zJn", "T0DDr"],
      description: "Gagner 100 XP",
      count: 0,
      completed: false,

      tier: 0,
      tierCounts: [
        100, 250, 500, 1000, 2000, 4000, 7500, 12500, 20000, 30000, 50000,
      ],
      reward: {
        xp: 50,
      },
    },
  ],
};

export default userCreationData;
