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

export const abs = ["cha", "str", "con", "dex", "int", "wis"]
export const classAttributes = ["id",
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
              "prof_4",]
export const raceAttributes = ["id", "name", "source_name", ...abs]
export const charAttributes = [
          "ab_prof_1",
          "ab_prof_2",
          "ab_prof_3",
          "ab_prof_4",
          ...abs,
          "hit_points",
          "id",
          "name",
          "level",
        ]