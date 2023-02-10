function createData(lettres, sonInitial, sonFinal, nom) {
  return { lettres, sonInitial, sonFinal, nom };
}

export const MiddleConsonants = [
  createData("ก", "k – /k/", "k", "ก ไก่ /ko kai/ poulet"),
  createData("จ", "ch – /tɕ/", "t", "จ จาน /cho chan/ assiette"),
  createData("ด", "d – /d/", "t", "ด เด็ก /do dek/ enfant"),
  createData("ฎ", "d – /d/", "t", "ฎ ชฎา /do cha-da/ coiffure (à plume)"),
  createData("ต", "t – /t/", "t", "ต เต่า /to tao/ tortue"),
  createData("ฏ", "t – /t/", "t", "ฏ ปฏัก /to pa-tak/ lance"),
  createData("บ", "b – /b/", "p", "บ ใบไม้ /bo baimai/ feuille"),
  createData("ป", "p – /p/", "p", "ป ปลา /po pla/ poisson"),
  createData("อ", "(lettre muette)", "-", "อ อ่าง /o ang/ bassine"),
];

export const HighConsonants = [
  createData("ข", "kh – /kʰ/", "k", "ข ไข่ /kho khai/ oeuf"),
  createData("ฃ", "kh – /kʰ/", "k", "ฃ ขวด /kho khuat/ bouteille (obsolète)"),
  createData("ฉ", "ch – /tɕʰ/", "-", "ฉ ฉิ่ง /cho ching/ cymbale"),

  createData("ถ", "th – /tʰ/", "t", "ถ ถุง /tho thung/ sac"),

  createData("ฐ", "th – /tʰ/", "t", "ฐ ฐาน /tho than/ piédestal"),
  createData("ผ", "ph – /pʰ/", "-", "ผ ผึ้ง /pho phueng/ abeille"),
  createData("ฝ", "f – /f/", "-", "ฝ ฝา /fo fa/ couvercle"),
  createData("ส", "s – /s/", "t", "ส เสือ /so suea/ tigre"),
  createData("ษ", "s – /s/", "t", "ษ ฤๅษี /so rue-si/ ermite"),
  createData("ศ", "s – /s/", "t", "ศ ศาลา /so sala/ pavillon"),
  createData("ห", "h – /h/", "-", "ห หีบ /ho hip/ coffre"),
];
export const LowConsonants = [
  createData("ค", "kh – /kʰ/", "k", "ค ควาย /kho khwai/ boeuf"),
  createData("ฅ", "kh – /kʰ/", "k", "ฅ คน /kho khon/ personne (obsolète)"),
  createData("ฆ", "kh – /kʰ/", "k", "ฆ ระฆัง /kho ra-khang/ cloche"),
  createData("ช", "ch – /t͡ɕʰ/", "t", "ช ช้าง /cho chang/ éléphant"),
  createData("ฌ", "ch – /t͡ɕʰ/", "-", "ฌ เฌอ /cho choe/ arbre"),
  createData("ท", "th – /tʰ/", "t", "ท ทหาร /tho thahan/ soldat"),
  createData("ธ", "th – /tʰ/", "t", "ธ ธง /tho thong/ drapeau"),
  createData("ฒ", "th – /tʰ/", "t", "ฒ ผู้เฒ่า /tho phu-thao/ vieil homme"),
  createData("ฑ", "th – /tʰ/", "t", "ฑ มณโฑ /tho montho/ la Reine Montho"),
  createData("พ", "ph – /pʰ/", "p", "พ พาน /pho phan/ phan"),
  createData("ภ", "ph – /pʰ/", "p", "ภ สำเภา /pho sam-phao/ bateau sampan"),
  createData("ฟ", "f – /f/", "p", "ฟ ฟัน /fo fan/ dent"),
  createData("ซ", "s – /s/", "t", "ซ โซ่ /so so/ chaîne"),
  createData("ฮ", "h – /h/", "-", "ฮ นกฮูก /ho nok-huk/ hibou"),
  createData("ม", "m – /m/", "m", "ม ม้า /mo ma/ cheval"),
  createData("น", "n – /n/", "n", "น หนู /no nu/ souris"),
  createData("ณ", "n – /n/", "n", "ณ เณร /no nen/ samanera (jeune moine)"),
  createData("ง", "ng – /ŋ/", "ng", "ง งู /ngo ngu/ serpent"),
  createData("ย", "y –/j/", "-", "ย ยักษ์ /yo yak/ yaksha"),
  createData("ญ", "y – /j/", "n", "ญ หญิง /yo ying/ femme"),
  createData("ร", "r – /r/", "n", "ร เรือ /ro ruea/ bateau"),
  createData("ล", "l – /l/", "n", "ล ลิง /lo ling/ singe"),
  createData("ฬ", "l – /l/", "n", "ฬ จุฬา /lo chu-la/ cerf-volant"),
  createData("ว", "w – /w/", "-", "ว แหวน /wo waen/ bague"),
];
