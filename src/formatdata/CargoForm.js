export function PostCargo(sede, rosterPosition, area,subArea,descripcionCargo,idversion,idGES) {
    return { sede, rosterPosition, area,subArea,descripcionCargo,idversion,idGES };
}

export function PutCargo(idCargo, sede, rosterPosition, area,subArea,descripcionCargo,idversion,idGES) {
    return { idCargo,sede, rosterPosition, area,subArea,descripcionCargo,idversion,idGES };
}


