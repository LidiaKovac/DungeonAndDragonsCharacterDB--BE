import Character from "../db/models/character"
import Classes from "../db/models/classes"
import Race from "../db/models/races"
import Skill from "../db/models/skills"

export const calculateProf = (lvl: string): number => {
  const numLvl = Number(lvl)
  if (numLvl >= 1 && numLvl <= 4) {
    return 2
  }
  if (numLvl >= 5 && numLvl <= 8) {
    return 3
  }
  if (numLvl >= 9 && numLvl <= 12) {
    return 4
  }
  if (numLvl >= 13 && numLvl <= 16) {
    return 5
  }
  if (numLvl >= 17 && numLvl <= 20) {
    return 6
  }
  return 0
}

export const getAbilityLevelModifier = (dieRoll: number) => {
  return Math.floor((dieRoll - 10) / 2)
}

export const getModifiers = async (char: Character) => {
  const modfs = {
    cha: [],
    str: [],
    con: [],
    dex: [],
    int: [],
    wis: [],
  } as Modifiers
  let charClass = await Classes.findByPk(char.Class.id)
  if (!charClass) return null //replace with throw and add trycatch
  let fields = ["prof_1", "prof_2", "prof_3", "prof_4"]
  for (const field of fields) {
    if (charClass[field] !== null) {
      //if there is no mod, it will be null
      let modValue = char[charClass[field]]


      modfs[charClass[field]] = [...modfs[charClass[field]], {
        amount: calculateProf(String(char.level)),
        source: "class",
      }]
    }
  }
  let charRace = await Race.findByPk(char.Race.id, { raw: true })
  if (!charRace) return null //replace with throw and add trycatch

  for (const ab of abs) {
    if (charRace[ab as keyof Race] !== "0" && charRace[ab as keyof Race] !== null) {
      //if there is no mod, it will be "0"
      let modValue = charRace[ab as keyof Race] //modif
      modfs[ab].push({
        amount: modValue as number,
        source: "race",
      })
    }
    modfs[ab].push({
      amount: getAbilityLevelModifier(char[ab]) as number,
      source: "die"
    })
  }

  return modfs
}

export const abs = ["cha", "str", "con", "dex", "int", "wis"]
export const classAttributes = [
  "id",
  "name",
  "source_name",
  "hit_die",
  "skillProfNum",
  "skillProf",
  "weaponProf",
  "armorProf",
  "prof_1",
  "prof_2",
  "prof_3",
  "prof_4",
]
export const raceAttributes = ["id", "name", "source_name", ...abs]
export const charAttributes = [
  'initiativeMod', 'currentInitiative', 'deathScore', 'description',
  ...abs,
  "hit_points",
  "id",
  "name",
  "level",
]
