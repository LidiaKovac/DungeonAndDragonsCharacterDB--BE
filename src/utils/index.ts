export const calculateProf = (lvl:number) => {
    if(lvl >=1 && lvl <=4) {
        return 2
    } 
    if(lvl >=5 && lvl <=8) {
        return 3
    }
    if(lvl >=9 && lvl <=12) {
        return 4
    }
    if(lvl >=13 && lvl <=16) {
        return 5
    }
    if(lvl >=17 && lvl <=20) {
        return 6
    }
}