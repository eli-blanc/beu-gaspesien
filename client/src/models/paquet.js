import { ActionType } from "./action";
import { Carte, Sorte, Symbole } from "./carte";
import { Joueur } from "./joueur";

export class Paquet {
    constructor(avecQuettee) {
        this.cartes = [];
        let rang = 0;
        for (let sorte of [Sorte.COEUR, Sorte.PIQUE, Sorte.CARREAU, Sorte.TREFLE]) {
            for (let symbole of [Symbole.SEPT, Symbole.HUIT, Symbole.NEUF, Symbole.DIX, Symbole.JACK, Symbole.DAME, Symbole.ROI, Symbole.AS]) {
                this.cartes.push(new Carte(rang++, sorte, symbole));
            }
        }

        this.quettee = null;
        if (avecQuettee) {
            this.quettee = [];
            this.cartes.push(new Carte(rang++, Sorte.JOKER, ''));
            this.cartes.push(new Carte(rang, Sorte.BLANCHE, ''));
        }

        this.joueur1 = new Joueur('Gilberte', 0, 'Georgette');
        this.joueur2 = new Joueur('Xavier', 1, 'Alexis');
        this.joueur3 = new Joueur('Georgette', 2, 'Gilberte');
        this.joueur4 = new Joueur('Alexis', 3, 'Xavier');

        this.joueurs = [this.joueur1, this.joueur2, this.joueur3, this.joueur4];

        this.sorteDemandee = null;

        this.clearMain();

        this.pile = [];
    }

    setJoueurActif(joueurActif) {
        for (let joueur of this.joueurs) {
            if (joueur.getNom() === joueurActif.getNom()) {
                joueur.actif = true;
            } else {
                joueur.actif = false;
            }
        }
    }

    getCartes() {
        return this.cartes;
    }

    getJoueur1() {
        return this.joueur1;
    }

    getJoueur2() {
        return this.joueur2;
    }

    getJoueur3() {
        return this.joueur3;
    }

    getJoueur4() {
        return this.joueur4;
    }

    getJoueurs() {
        return this.joueurs.map((item) => item.getNom());
    }

    getQuettee() {
        return this.quettee;
    }

    getNextJoueur(joueur) {
        let idx = joueur.getIndex() + 1;
        if (idx >= 4) {
            idx = 0;
        }
        return this.getJoueurParIdx(idx);
    }

    clearMain() {
        this.main = [new Carte(),new Carte(),new Carte(),new Carte()];
    }

    prendreQuettee(mise) {
        const joueur = this.getJoueurParNom(mise.joueur);
        if (joueur !== null) {
            const carte1 = this.quettee[0].copy();
            const carte2 = this.quettee[1].copy();
            carte1.surelevee = true;
            carte2.surelevee = true;
            joueur.cartes.push(carte1);
            joueur.cartes.push(carte2);
            joueur.cartes.sort((a, b) => a.rang - b.rang);
            this.quettee = [];
        }
    }

    getJoueurParNom(nom) {
        return this.joueurs.find((item) => item.getNom() === nom);
    }

    getJoueurParIdx(idx) {
        return this.joueurs.find((item) => item.getIndex() === idx);
    }

    brasser() {
        for (let i = this.cartes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.cartes[i];
            this.cartes[i] = this.cartes[j];
            this.cartes[j] = temp;
        }
        this.joueur1.setCartes(this.cartes.slice(0, 8).sort((a, b) => a.rang - b.rang));
        this.joueur2.setCartes(this.cartes.slice(8, 16).sort((a, b) => a.rang - b.rang));
        this.joueur3.setCartes(this.cartes.slice(16, 24).sort((a, b) => a.rang - b.rang));
        this.joueur4.setCartes(this.cartes.slice(24, 32).sort((a, b) => a.rang - b.rang));

        if (this.quettee !== null) {
            this.quettee = this.cartes.slice(32, 34).sort((a, b) => a.rang - b.rang);
        }
    }

    cliqueCarte(carte, joueur, action) {
        if (joueur !== null) {
            switch (action.type) {
                case ActionType.PASSER: {
                    const partenaire = this.getJoueurParNom(joueur.partenaire);
                    const copie = carte.copy();
                    copie.surelevee = true;
                    partenaire.cartes.push(copie);
                    partenaire.cartes.sort((a, b) => a.rang - b.rang);
                    const idx = joueur.cartes.findIndex((item) => item.key === carte.key);
                    joueur.cartes.splice(idx, 1);
                    break;
                }
                case ActionType.DISCARTER: {
                    const idx = joueur.cartes.findIndex((item) => item.key === carte.key);
                    joueur.cartes.splice(idx, 1);
                    break;
                }
                case ActionType.JOUER: {
                    const joueurIdx = action.joueur.getIndex();
                    this.main[joueurIdx] = carte.copy();
                    const idx = joueur.cartes.findIndex((item) => item.key === carte.key);
                    joueur.cartes.splice(idx, 1);
                }
            }
        }
    }

    getRemporteur(mise) {
        let carteGagnante = this.main[0];
        let remporteur = this.joueur1;
        for (let i = 1; i < 4; ++i) {
            let carte = this.main[i];
            if (carte.isAtout(mise.atout) && !carteGagnante.isAtout(mise.atout)) {
                carteGagnante = carte;
                remporteur = this.getJoueurParIdx(i);
            } else if (carte.sorte === this.sorteDemandee && carteGagnante.sorte !== this.sorteDemandee && !carteGagnante.isAtout(mise.atout)) {
                carteGagnante = carte;                
                remporteur = this.getJoueurParIdx(i);
            } else if (carte.sorte === carteGagnante.sorte || carte.isAtout(mise.atout) && carteGagnante.isAtout(mise.atout)) {
                if (mise.petite) {
                    if (carte.rang < carteGagnante.rang) {
                        carteGagnante = carte;                        
                        remporteur = this.getJoueurParIdx(i);
                    }
                } else {
                    if (carte.rang > carteGagnante.rang) {
                        carteGagnante = carte;
                        remporteur = this.getJoueurParIdx(i);
                    }
                }
            }
        }
        return remporteur;
    }
}