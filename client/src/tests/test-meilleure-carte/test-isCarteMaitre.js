import { Sorte } from "../../models/carte";
import { isCarteMaitre, MeilleureCarte } from "../../models/meilleure-carte";
import { Paquet } from "../../models/paquet";

export class IsCarteMaitre {
    constructor() {
     }

    runAll() {
        this.maitreAbsolu();
        this.maitre();
        this.pasMaitre();
        this.maitreAbsoluAtout();
        this.maitreAtout();
        this.pasMaitreAtout();
    }

    // La carte est maître absolue
    maitreAbsolu(){
        const paquet = new Paquet(true);
        paquet.pile = [paquet.getCarte(14, Sorte.TREFLE)];
        const cartes = [
            paquet.getCarte(14, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.PIQUE),
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.COEUR),
            paquet.getCarte(7, Sorte.CARREAU),
            paquet.getCarte(14, Sorte.TREFLE),
            paquet.getCarte(7, Sorte.TREFLE),
            paquet.getCarte(13, Sorte.TREFLE)
        ]
        const atout = Sorte.PIQUE;
        const meilleure = new MeilleureCarte();
        const ok = isCarteMaitre(paquet.getCarte(13, Sorte.TREFLE), cartes, paquet.pile, atout);
        console.log(`${ok}: TestMeilleureCarte: isCarteMaitre: maitreAbsolu`);
    }    

    // La carte est bonne, mais pas la meilleure dans mon jeu
    maitre(){
        const paquet = new Paquet(true);
        paquet.pile = [paquet.getCarte(14, Sorte.TREFLE)];
        const cartes = [
            paquet.getCarte(14, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.PIQUE),
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.COEUR),
            paquet.getCarte(7, Sorte.CARREAU),
            paquet.getCarte(14, Sorte.TREFLE),
            paquet.getCarte(12, Sorte.TREFLE),
            paquet.getCarte(13, Sorte.TREFLE)
        ]
        const atout = Sorte.PIQUE;
        const meilleure = new MeilleureCarte();
        const ok = isCarteMaitre(paquet.getCarte(12, Sorte.TREFLE), cartes, paquet.pile, atout);
        console.log(`${ok}: TestMeilleureCarte: isCarteMaitre: maitre`);
    }     

    // La carte n'est pas maître
    pasMaitre(){
        const paquet = new Paquet(true);
        paquet.pile = [paquet.getCarte(12, Sorte.TREFLE)];
        const cartes = [
            paquet.getCarte(14, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.PIQUE),
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.COEUR),
            paquet.getCarte(7, Sorte.CARREAU),
            paquet.getCarte(10, Sorte.TREFLE),
            paquet.getCarte(7, Sorte.TREFLE),
            paquet.getCarte(13, Sorte.TREFLE)
        ]
        const atout = Sorte.PIQUE;
        const meilleure = new MeilleureCarte();
        const ok = !isCarteMaitre(paquet.getCarte(13, Sorte.TREFLE), cartes, paquet.pile, atout);
        console.log(`${ok}: TestMeilleureCarte: isCarteMaitre: pasMaitre`);
    }

    // La carte est maître absolue en atout
    maitreAbsoluAtout(){
        const paquet = new Paquet(true);
        paquet.pile = [paquet.getCarte(14, Sorte.TREFLE)];
        const cartes = [
            paquet.getCarte(14, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.PIQUE),
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.COEUR),
            paquet.getCarte(7, Sorte.CARREAU),
            paquet.getCarte(14, Sorte.TREFLE),
            paquet.getCarte(7, Sorte.TREFLE),
            paquet.getCarte(16, Sorte.BLANCHE)
        ]
        const atout = Sorte.TREFLE;
        const meilleure = new MeilleureCarte();
        const ok = isCarteMaitre(paquet.getCarte(16, Sorte.BLANCHE), cartes, paquet.pile, atout);
        console.log(`${ok}: TestMeilleureCarte: isCarteMaitre: maitreAbsoluAtout`);
    }    

    // La carte est bonne, mais pas la meilleure dans mon jeu, en atout
    maitreAtout(){
        const paquet = new Paquet(true);
        paquet.pile = [paquet.getCarte(14, Sorte.TREFLE)];
        const cartes = [
            paquet.getCarte(14, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.PIQUE),
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.COEUR),
            paquet.getCarte(7, Sorte.CARREAU),
            paquet.getCarte(14, Sorte.TREFLE),
            paquet.getCarte(15, Sorte.JOKER),
            paquet.getCarte(16, Sorte.BLANCHE)
        ]
        const atout = Sorte.PIQUE;
        const meilleure = new MeilleureCarte();
        const ok = isCarteMaitre(paquet.getCarte(15, Sorte.JOKER), cartes, paquet.pile, atout);
        console.log(`${ok}: TestMeilleureCarte: isCarteMaitre: maitreAtout`);
    }     

    // La carte n'est pas maître, en atout
    pasMaitreAtout(){
        const paquet = new Paquet(true);
        paquet.pile = [paquet.getCarte(12, Sorte.TREFLE)];
        const cartes = [
            paquet.getCarte(14, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.PIQUE),
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(13, Sorte.COEUR),
            paquet.getCarte(7, Sorte.CARREAU),
            paquet.getCarte(10, Sorte.TREFLE),
            paquet.getCarte(14, Sorte.TREFLE),
            paquet.getCarte(13, Sorte.TREFLE)
        ]
        const atout = Sorte.TREFLE;
        const meilleure = new MeilleureCarte();
        const ok = !isCarteMaitre(paquet.getCarte(14, Sorte.TREFLE), cartes, paquet.pile, atout);
        console.log(`${ok}: TestMeilleureCarte: isCarteMaitre: pasMaitreAtout`);
    }  
}