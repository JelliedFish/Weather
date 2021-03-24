
function clouds(point){

    let res;
   switch (point){

        case (poitn >= 1) && (point <=3):
            res = "Незначительная"
            break;

        case (poitn >= 4) && (point <=5):
            res = "Разбросанная"
            break;

        case (poitn >= 6) && (point <=9):
            res = "Значительная"
            break;

        case 10:
            res = "Сплошная"
            break;

        case 7:
            res = "Ясно"
            break;

        default:
            res = "Неопределенность"
    }
    return res;
}