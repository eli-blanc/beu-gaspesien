import { Sorte } from "../models/carte";
import { Joueur } from "../models/joueur";
import { Paquet } from "../models/paquet";

export class TestJoueur {
    runAll() {
        const compteSorte = new CompteSorte();
        compteSorte.runAll();
        const setRefuseSorte = new SetRefuseSorte();
        setRefuseSorte.runAll();
    }
}

// Tester la méthode Joueur.compteSorte(sorte, atout)
export class CompteSorte {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.basic();
        this.pasDeCarte();
        this.bibittes();
    }

    // Cas de base
    basic(){
        const joueur = new Joueur('Blabla', 1, 'Fnn');
        joueur.setCartes([this.paquet.getCarte(8, Sorte.PIQUE),this.paquet.getCarte(8, Sorte.CARREAU),this.paquet.getCarte(10, Sorte.PIQUE)]);
        const ok = joueur.compteSorte(Sorte.PIQUE, Sorte.COEUR) === 2;
        console.log(`${ok}: TestJoueur: CompteSorte: basic`);
    }    

    // Aucune carte de cette sorte
    pasDeCarte(){
        const joueur = new Joueur('Blabla', 1, 'Fnn');
        joueur.setCartes([this.paquet.getCarte(8, Sorte.PIQUE),this.paquet.getCarte(8, Sorte.CARREAU),this.paquet.getCarte(10, Sorte.PIQUE)]);
        const ok = joueur.compteSorte(Sorte.TREFLE, Sorte.COEUR) === 0;
        console.log(`${ok}: TestJoueur: CompteSorte: pasDeCarte`);
    }    

    // Avec bibittes
    bibittes(){
        const joueur = new Joueur('Blabla', 1, 'Fnn');
        joueur.setCartes([this.paquet.getCarte(15, Sorte.JOKER), this.paquet.getCarte(8, Sorte.CARREAU),this.paquet.getCarte(16, Sorte.BLANCHE)]);
        const ok = joueur.compteSorte(Sorte.PIQUE, Sorte.PIQUE) === 2;
        console.log(`${ok}: TestJoueur: CompteSorte: bibittes`);
    }   
} 

// Tester la méthode Joueur.setRefuseSorte(carte, refuse, atout)
export class SetRefuseSorte {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.droitRefus();
        // this.droitRefusAtout();
    }

    // Peut refuser la prochaine fois
    droitRefus() {
        const carte = this.paquet.getCarte(8, Sorte.CARREAU);
        const joueur = this.paquet.getJoueur1();
        joueur.setRefuseSorte(Sorte.PIQUE, carte, Sorte.COEUR);
        const ok = joueur.getRefuseSorte(Sorte.PIQUE)
        console.log(`${ok}: TestJoueur: SetRefuseSorte: droitRefus`);
    }
} 
