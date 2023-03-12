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