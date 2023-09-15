import { Op } from "sequelize"
import Character from "../db/models/character"
import Classes from "../db/models/classes"
import Race from "../db/models/races"
import Skill from "../db/models/skills"
import Source from "../db/models/sources"
import Inspo from "../db/models/inspo"

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
    cha: {
      mods: [],
      total: 0
    },
    str: {
      mods: [],
      total: 0
    },
    con: {
      mods: [],
      total: 0
    },
    dex: {
      mods: [],
      total: 0
    },
    int: {
      mods: [],
      total: 0
    },
    wis: {
      mods: [],
      total: 0
    },
  } as Modifiers
  let charClass = await Classes.findByPk(char.Class.id)
  if (!charClass) return null //replace with throw and add trycatch
  let fields = ["prof_1", "prof_2", "prof_3", "prof_4"]
  for (const field of fields) {
    if (charClass[field] !== null) {
      //if there is no mod, it will be null
      let modValue = char[charClass[field]]


      modfs[charClass[field]].mods = [...modfs[charClass[field]].mods, {
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
      modfs[ab].mods.push({
        amount: parseInt(modValue) as number,
        source: "race",
      })
    }
    modfs[ab].mods.push({
      amount: getAbilityLevelModifier(char[ab]) as number,
      source: "die",

    })
  }
  for (const key in modfs) {
    if (Object.prototype.hasOwnProperty.call(modfs, key)) {
      const ab = modfs[key];
      for (const mod of ab.mods) {
        ab.total += mod.amount
      }
    }
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
export const raceAttributes = ["id", "name", "source_name", ...abs, "speed"]
export const charAttributes = [
  'initiativeMod', 'currentInitiative', 'deathScore', 'description', "skillProfLeft",
  ...abs,
  "hit_points", "curr_hp",
  "id",
  "name",
  "level", "UserId", "prof", "updatedAt"
]

export const findOneCharOptions = {

  attributes: charAttributes,
  include: [
    {
      model: Classes,
      attributes: classAttributes,
      include: [{ model: Source, attributes: ["name", "shorthand"] }],
    },
    {
      model: Race,
      attributes: raceAttributes,
      include: [{ model: Source, attributes: ["name", "shorthand"] }],
    },
    {
      model: Inspo,
      attributes: ['url']
    },
    { model: Skill, attributes: ["name", "ab"] }
  ],
}

export const getSkills = async (char: Character) => {
  let charSkills = char.Class.skillProf as string
  const skills = await Skill.findAll({
    where: {
      name: {
        [Op.iLike]: {
          [Op.any]: charSkills.split(","),
        },
      },
    },
    attributes: ["name", "ab"],
  })
  const allSkills = await Skill.findAll()

  let copyOfSel = char
  copyOfSel.Class.skillProf = skills
  return { charWithProfs: copyOfSel, skills: allSkills }
}