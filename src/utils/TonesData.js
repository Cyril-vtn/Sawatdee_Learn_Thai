//* DONNEE TONNALITE
function createData(ton, symbole, exemple) {
  return { ton, symbole, exemple };
}

export const Tones = [
  createData("Moyen", "Pas de symbole", "kaa"),
  createData("Bas", "`", "kaa`"),
  createData("Descendant", "ˆ", "kaaˆ"),
  createData("Élevé", "´", "kaa´"),
  createData("Montant", "ˇ", "kaaˇ"),
];
