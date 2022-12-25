import { Sorte, Symbole } from "../../models/carte";
import { MeilleureCarte } from "../../models/meilleure-carte";
import { Paquet } from "../../models/paquet";

// Tester la méthode Joueur.getMain1Carte1()
export class GetMain1Carte1 {
    constructor() {
        this.paquet = new Paquet(true);
     }

    runAll() {
        this.beuAvecAs();
        this.as();
        this.chienSec();
        this.dixSec();
        this.beuSec();
        this.chienPasSec();
        this.dixAvecBeu();        
        this.atout();
    }

    // Beu avec as de même sorte
    beuAvecAs(){
        const cartes = [
            this.paquet.getCarte(14, Sorte.PIQUE),
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(14, Sorte.COEUR),
            this.paquet.getCarte(13, Sorte.COEUR),
            this.paquet.getCarte(7, Sorte.COEUR),
            this.paquet.getCarte(14, Sorte.TREFLE),
            this.paquet.getCarte(13, Sorte.TREFLE),
            this.paquet.getCarte(11, Sorte.CARREAU)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.TREFLE);
        const ok = carte.symbole === Symbole.ROI && carte.sorte === Sorte.PIQUE;
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: beuAvecAs`);
    }    

    // As sans beu
    as(){
        const cartes = [
            this.paquet.getCarte(14, Sorte.PIQUE),
            this.paquet.getCarte(12, Sorte.PIQUE),
            this.paquet.getCarte(14, Sorte.COEUR),
            this.paquet.getCarte(12, Sorte.COEUR),
            this.paquet.getCarte(7, Sorte.COEUR),
            this.paquet.getCarte(14, Sorte.TREFLE),
            this.paquet.getCarte(12, Sorte.TREFLE),
            this.paquet.getCarte(11, Sorte.CARREAU)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.TREFLE);
        const ok = carte.symbole === Symbole.AS && carte.sorte === Sorte.PIQUE;
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: as`);
    }
    
    // Chien sec
    chienSec(){
        const cartes = [
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(12, Sorte.PIQUE),
            this.paquet.getCarte(11, Sorte.PIQUE),
            this.paquet.getCarte(9, Sorte.PIQUE),
            this.paquet.getCarte(8, Sorte.PIQUE),
            this.paquet.getCarte(7, Sorte.TREFLE),
            this.paquet.getCarte(10, Sorte.COEUR),
            this.paquet.getCarte(11, Sorte.CARREAU)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.TREFLE);
        const ok = carte.symbole === Symbole.JACK && carte.sorte === Sorte.CARREAU;
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: chienSec`);
    }
    
    // 10 sec
    dixSec(){
        const cartes = [
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(12, Sorte.PIQUE),
            this.paquet.getCarte(11, Sorte.PIQUE),
            this.paquet.getCarte(9, Sorte.PIQUE),
            this.paquet.getCarte(8, Sorte.PIQUE),
            this.paquet.getCarte(7, Sorte.TREFLE),
            this.paquet.getCarte(13, Sorte.COEUR),
            this.paquet.getCarte(10, Sorte.CARREAU)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.TREFLE);
        const ok = carte.symbole === Symbole.DIX && carte.sorte === Sorte.CARREAU;
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: dixSec`);
    }
    
    // Beu sec
    beuSec(){
        const cartes = [
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(12, Sorte.PIQUE),
            this.paquet.getCarte(11, Sorte.PIQUE),
            this.paquet.getCarte(9, Sorte.PIQUE),
            this.paquet.getCarte(8, Sorte.PIQUE),
            this.paquet.getCarte(7, Sorte.TREFLE),
            this.paquet.getCarte(8, Sorte.TREFLE),
            this.paquet.getCarte(13, Sorte.CARREAU)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.TREFLE, []);
        const ok = carte.symbole === Symbole.ROI && carte.sorte === Sorte.CARREAU;
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: beuSec`);
    }

    // Chien pas sec
    chienPasSec(){
        const cartes = [
            this.paquet.getCarte(10, Sorte.PIQUE),
            this.paquet.getCarte(11, Sorte.PIQUE),
            this.paquet.getCarte(11, Sorte.COEUR),
            this.paquet.getCarte(10, Sorte.COEUR),
            this.paquet.getCarte(13, Sorte.COEUR),
            this.paquet.getCarte(7, Sorte.CARREAU),
            this.paquet.getCarte(8, Sorte.CARREAU),
            this.paquet.getCarte(13, Sorte.CARREAU)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.TREFLE, []);
        const ok = carte.symbole === Symbole.JACK && carte.sorte === Sorte.COEUR;
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: chienPasSec`);
    } 
    
    // Juste de l'atout avec des pairs de beu/10
    dixAvecBeu(){
        const cartes = [
            this.paquet.getCarte(13, Sorte.COEUR),
            this.paquet.getCarte(10, Sorte.COEUR),
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(10, Sorte.PIQUE),
            this.paquet.getCarte(13, Sorte.CARREAU),
            this.paquet.getCarte(10, Sorte.CARREAU),
            this.paquet.getCarte(11, Sorte.TREFLE),
            this.paquet.getCarte(12, Sorte.TREFLE)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.TREFLE);
        const ok = carte.symbole === Symbole.DIX && (carte.sorte === Sorte.COEUR || carte.sorte === Sorte.CARREAU || carte.sorte === Sorte.PIQUE);
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: dixAvecBeu`);
    }    

    // Juste de l'atout
    atout(){
        const cartes = [
            this.paquet.getCarte(7, Sorte.PIQUE),
            this.paquet.getCarte(8, Sorte.PIQUE),
            this.paquet.getCarte(9, Sorte.PIQUE),
            this.paquet.getCarte(10, Sorte.PIQUE),
            this.paquet.getCarte(11, Sorte.PIQUE),
            this.paquet.getCarte(12, Sorte.PIQUE),
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(15, Sorte.JOKER)
        ]
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getMain1Carte1(cartes, Sorte.PIQUE);
        const ok = carte.sorte === Sorte.JOKER;
        console.log(`${ok}: TestMeilleureCarte: getMain1Carte1: atout`);
    }
} 
