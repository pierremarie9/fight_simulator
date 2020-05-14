let atkBtnR = document.querySelector("#attackRocky");
let atkBtnI = document.querySelector("#attackIvan");
let startBtn = document.querySelector("#start_button");
let dfcBtnR = document.querySelector("#defendRocky");
let msgBox  = document.querySelector("#msgbox");
let santeRocky = document.querySelector("#vieRocky");
let santeIvan = document.querySelector("#vieIvan");

class Personnage {
    constructor(pseudo, classe, sante, attaque, defaite){
        this.pseudo  = pseudo;
        this.classe  = classe;
        this.sante   = sante;
        this.attaque = attaque;
        this.defaite = defaite;
    }


    verifierSante(){
        if (this.sante <= 0){
            this.sante = 0;
            this.defaite = true;
        }
    }

    get informations(){
        return this.pseudo + " (" + this.classe + ") a " + this.sante + " points de vie.";
    }
}

class Star extends Personnage {

    constructor(pseudo){
        super(pseudo, "star", 200, 50, false);
    }

    attaquer(personnage){
        let degatsRocky = Math.floor(Math.random()*this.attaque)+ 1;
        personnage.sante -= degatsRocky;
        personnage.verifierSante();
        return this.pseudo + " attaque " + personnage.pseudo + " en assenant un crochet du droit (" + degatsRocky + " degats)";
    }

    defendre(personnage){
        this.sante += Math.floor(Math.random()*40) + 1;
        return this.pseudo + " esquive l'attaque de " + personnage.pseudo + " ses points de vie montent desormais à  " + this.sante
    }

    coupSpecial(personnage){
        personnage.sante -= 60;
        console.log(this.pseudo + " attaque avec son coup spécial uppercut de l'espace " + personnage.pseudo + " (" + 5*this.attaque + " degats)");
        personnage.verifierSante();
    }

}

class Rival extends Personnage {

    constructor(pseudo){
        super(pseudo, "rival", 200, 50, false);
    }

    attaquer(personnage){
        let degatsIvan = Math.floor(Math.random()*this.attaque)+ 1;
        personnage.sante -= degatsIvan;
        personnage.verifierSante();
        return this.pseudo + " attaque " + personnage.pseudo + " avec coup rusé dans les côtes (" + degatsIvan + " degats)";
    }

    defendre(personnage){
        this.sante += Math.floor(Math.random()*40) +1;
        return this.pseudo + " esquive l'attaque de " + personnage.pseudo + " ses points de vie montent desormais à  " + this.sante
    }

    coupSpecial(personnage){
        personnage.sante -= 60;
        console.log(this.pseudo + " attaque avec son coup spécial: coup de genou dans la mâchoire " + personnage.pseudo + " (" + 5*this.attaque + " degats)");
        personnage.verifierSante();
    }

    jouer(){
        if(this.sante > 0){
            let hasard = Math.floor(Math.random()*2);
            if(hasard < 1){
                return this.attaquer(rocky);
            }else{
                return this.defendre(rocky);
            }
        }
        else{
            return this.attaquer(rocky);
        }
    }

}

rocky = new Star("Rocky");
ivan = new Rival("Ivan");

santeRocky.textContent = rocky.sante;
santeIvan.textContent  = ivan.sante;
var textRocky = document.createElement('p');
var textIvan = document.createElement('p');
textRocky.classList.add('fin');
textIvan.classList.add('fin');

function afficheFin (santeRocky, santeIvan){

    if (santeRocky == 0 && santeIvan == 0){

        textRocky.textContent = "Match nul!";
        textIvan.textContent = "Match nul!";
        document.querySelector("#rocky").append(textRocky);
        document.querySelector("#ivan").append(textIvan);
        santeRocky.textContent = rocky.sante;
        santeIvan.textContent  = ivan.sante;


    }else if(santeRocky == 0){

        textRocky.textContent = "Tu as perdu";
        textIvan.textContent = "Ivan a gagné avec " + ivan.sante + " points de vie restant!";
        document.querySelector("#rocky").append(textRocky);
        document.querySelector("#ivan").append(textIvan);
        santeRocky.textContent = rocky.sante;
        santeIvan.textContent  = ivan.sante;

    }else if(santeIvan == 0){

        textRocky.textContent = "Tu as gagné avec " + rocky.sante + " points de vie restant !";
        textIvan.textContent = "Ivan a perdu";
        document.querySelector("#rocky").append(textRocky);
        document.querySelector("#ivan").append(textIvan);
        santeRocky.textContent = rocky.sante;
        santeIvan.textContent  = ivan.sante;
    }
}

startBtn.addEventListener('click', ()=>{
    document.querySelector("#start").style.display = 'none';
    document.querySelector("#fight").style.display = 'flex';
})

atkBtnR.addEventListener('click', ()=>{
    atkBtnR.style.display = 'none';
    dfcBtnR.style.display = 'none';
    let instruction = document.createElement('div');
    instruction.innerHTML = rocky.attaquer(ivan) + "<br />" + ivan.informations;
    instruction.style.backgroundColor = 'rgba(0, 51, 153, 0.2)';
    msgBox.prepend(instruction);
    santeRocky.textContent = rocky.sante;
    santeIvan.textContent  = ivan.sante;

    let resultIvan = ivan.jouer();
    let instructionI = document.createElement('div');
    instructionI.style.backgroundColor = 'rgba(255, 51, 0, 0.2)';
    instructionI.innerHTML = resultIvan + "<br />" + rocky.informations;
    setTimeout(() => { msgBox.prepend(instructionI); }, 3000);
    if(rocky.sante != 0 && ivan.sante !=0){
        setTimeout(() => { 
            santeRocky.textContent = rocky.sante;
            santeIvan.textContent  = ivan.sante;
            atkBtnR.style.display = 'block';
            dfcBtnR.style.display = 'block';
        }, 3000);
    }

    if(rocky.sante == 0 || ivan.sante == 0){

        setTimeout(() =>{ 
            santeRocky.textContent = rocky.sante;
            santeIvan.textContent  = ivan.sante;
            afficheFin(rocky.sante, ivan.sante)
        }, 3000);
    };

})

dfcBtnR.addEventListener('click', ()=>{
    atkBtnR.style.display = 'none';
    dfcBtnR.style.display = 'none';
    let instruction = document.createElement('div');
    instruction.innerHTML = rocky.defendre(ivan) + "<br />" + ivan.informations;
    instruction.style.backgroundColor = 'rgba(0, 51, 153, 0.2)';
    msgBox.prepend(instruction);
    santeRocky.textContent = rocky.sante;
    santeIvan.textContent  = ivan.sante;

    let resultIvan = ivan.jouer();
    let instructionI = document.createElement('div');
    instructionI.style.backgroundColor = 'rgba(255, 51, 0, 0.2)';
    instructionI.innerHTML = resultIvan + "<br />" + rocky.informations;
    setTimeout(() => { msgBox.prepend(instructionI); }, 3000);
    if(rocky.sante != 0 && ivan.sante !=0){
        setTimeout(() => { 
            santeRocky.textContent = rocky.sante;
            santeIvan.textContent  = ivan.sante;
            atkBtnR.style.display = 'block';
            dfcBtnR.style.display = 'block';
        }, 3000);
    };

    if(rocky.sante == 0 || ivan.sante == 0){
        setTimeout(() =>{
            santeRocky.textContent = rocky.sante;
            santeIvan.textContent  = ivan.sante;
            afficheFin(rocky.sante, ivan.sante)
        }, 3000);
    };

})