// DONNEE VOYELLES
function createData(vowels, pronunciation, example) {
  return { vowels, pronunciation, example };
}

export const ShortVowels = [
  createData("-ะ", "a", "กะ ka`"),
  createData("–", "i", "กิ ki`"),
  createData("–", "ue:", "กึ kue:`"),
  createData("–", "u", "กุ ku`"),
  createData("เ–ะ", "e:", "เกะ ke:`"),
  createData("แ–ะ", "ae:", "แกะ kae:`"),
  createData("โ–ะ", "o:", "โกะ ko:`"),
  createData("เ–าะ", "aw:", "เกาะ kaw:`"),
  createData("เ–อะ", "ə:", "เกอะ kə:`"),
];

export const LongVowels = [
  createData("–า", "aa", "กา kaa"),
  createData("–", "ii", "กี kii"),
  createData("–", "ue", "กื kue"),
  createData("–", "uu", "กู kuu"),
  createData("เ–", "e", "เก ke"),
  createData("แ–", "ae", "แก kae"),
  createData("โ–", "o", "โก ko"),
  createData("–อ", "aw", "กอ kaw"),
  createData("เ–อ", "ə", "เกอ kə"),
];

export const LongDiphthongs = [
  createData("เ– ียะ", "ia:", "เกียะ kia:`"),
  createData("เ– ือะ", "uea:", "เกือะ kuea:`"),
  createData("– ัวะ", "ua:", "กัวะ kua:`"),
  createData("– ำ", "am", "กำ kam"),
  createData("ไ–", "ai", "ไก kai"),
  createData("ไ–", "ai", "ใก kai"),
  createData("เ–า", "au", "เกา kau"),
];

export const ShortDiphthongs = [
  createData("เ– ีย", "ia", "เกีย kia"),
  createData("เ– ือ", "uea", "เกือ kuea"),
  createData("– ัว", "ua", "เกัว kua"),
];
