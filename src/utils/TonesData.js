//* DONNEE TONNALITE
function createData(ton, symbole, exemple) {
  return { ton, symbole, exemple };
}

export const Tones = [
  createData("ton moyen", "Pas de symbole", "kaa"),
  createData("ton bas", "`", "kaa`"),
  createData("ton descendant", "ˆ", "kaaˆ"),
  createData("ton élevé", "´", "kaa´"),
  createData("ton montant", "ˇ", "kaaˇ"),
];
