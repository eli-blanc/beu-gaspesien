import { ActionType } from "./action";
import { Carte, Sorte, Symbole } from "./carte";
import { Joueur } from "./joueur";
import { MeilleureCarte } from "./meilleure-carte";

export class Paquet {
    constructor(avecQuettee) {
        this.cartes = [];
        let rang = 0;
        for (let sorte of [Sorte.COEUR, Sorte.PIQUE, Sorte.CARREAU, Sorte.TREFLE]) {
            let poids = 7;
            for (let symbole of [Symbole.SEPT, Symbole.HUIT, Symbole.NEUF, Symbole.DIX, Symbole.JACK, Symbole.DAME, Symbole.ROI, Symbole.AS]) {
                this.cartes.push(new Carte(rang++, sorte, symbole, poids++));
            }
        }

        this.quettee = null;
        if (avecQuettee) {
            this.quettee = [];
            this.cartes.push(new Carte(rang++, Sorte.JOKER, '', 15));
            this.cartes.push(new Carte(rang, Sorte.BLANCHE, '', 16));
        }

        this.joueur1 = new Joueur('Gilberte', 0, 'Georgette');
        this.joueur2 = new Joueur('Xavier', 1, 'Alexis');
        this.joueur3 = new Joueur('Georgette', 2, 'Gilberte');
        this.joueur4 = new Joueur('Alexis', 3, 'Xavier');

        this.joueurs = [this.joueur1, this.joueur2, this.joueur3, this.joueur4];

        this.sorteDemandee = null;

        this.clearMain();

        this.pile = [];

        this.attendre = false;

        this.points = [0, 0];

        this.brasser();
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
        this.main = [new Carte(), new Carte(), new Carte(), new Carte()];
        this.sorteDemandee = null;
    }

    prendreQuettee(mise) {
        const joueur = this.getJoueurParNom(mise.joueur);
        if (joueur !== null) {
            const carte1 = this.quettee[0];
            const carte2 = this.quettee[1];
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
        // Remet les bibittes dans l'ordre initial        
        const joker = this.cartes.find(carte => carte.sorte === Sorte.JOKER);
        joker.rang = 32;
        const blanche = this.cartes.find(carte => carte.sorte === Sorte.BLANCHE);
        blanche.rang = 33;
        for (let i = this.cartes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.cartes[i];
            this.cartes[i] = this.cartes[j];
            this.cartes[j] = temp;
        }
        this.joueur1.cartes = this.cartes.slice(0, 8).sort((a, b) => a.rang - b.rang);
        this.joueur2.cartes = this.cartes.slice(8, 16).sort((a, b) => a.rang - b.rang);
        this.joueur3.cartes = this.cartes.slice(16, 24).sort((a, b) => a.rang - b.rang);
        this.joueur4.cartes = this.cartes.slice(24, 32).sort((a, b) => a.rang - b.rang);

        if (this.quettee !== null) {
            this.quettee = this.cartes.slice(32, 34).sort((a, b) => a.rang - b.rang);
        }

        this.points = [0, 0];

        for (let joueur of this.joueurs) {
            joueur.resetRefuseSorte();
        }
    }

    cliqueCarte(carte, joueur, action, atout) {
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
                    return;
                }
                case ActionType.DISCARTER: {
                    const idx = joueur.cartes.findIndex((item) => item.key === carte.key);
                    joueur.cartes.splice(idx, 1);
                    return;
                }
                case ActionType.JOUER: {
                    const joueurIdx = joueur.getIndex();
                    this.main[joueurIdx] = carte.copy();
                    this.pile.push(carte);
                    joueur.setRefuseSorte(this.sorteDemandee, carte, atout);
                    const idx = joueur.cartes.findIndex((item) => item.key === carte.key);
                    joueur.cartes.splice(idx, 1);
                    return;
                }
                default: {
                    return;
                }
            }
        }
    }

    getCarteLead(atout, petite) {

        let carteGagnante = this.main[0];
        let remporteur = this.joueur1;
        for (let i = 1; i < this.main.length; ++i) {
            let carte = this.main[i];
            if (carte.isAtout(atout) && !carteGagnante.isAtout(atout)) {
                carteGagnante = carte;
                remporteur = this.getJoueurParIdx(i);
            } else if (carte.sorte === this.sorteDemandee && carteGagnante.sorte !== this.sorteDemandee && !carteGagnante.isAtout(atout)) {
                carteGagnante = carte;
                remporteur = this.getJoueurParIdx(i);
            } else if (carte.sorte === carteGagnante.sorte || (carte.isAtout(atout) && carteGagnante.isAtout(atout))) {
                if (petite) {
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
        let points = 0;
        for (let carte of this.main) {
            points += carte.points;
        }
        return { carte: carteGagnante, joueur: remporteur, points: points };
    }

    getRemporteur(mise, mainDeTable) {
        const lead = this.getCarteLead(mise.atout, mise.petite);

        this.points[lead.joueur.equipeIdx] += lead.points;
        if (mainDeTable) {
            this.points[lead.joueur.equipeIdx] += 10;
        }
        return lead.joueur;
    }

    trierBibittes(mise) {
        let rang1 = -1;

        switch (mise.atout) {
            case Sorte.COEUR: {
                rang1 = 7;
                break;
            }
            case Sorte.PIQUE: {
                rang1 = 15;
                break;
            }
            case Sorte.CARREAU: {
                rang1 = 23;
                break;
            }
            case Sorte.TREFLE: {
                rang1 = 31;
                break;
            }
            case Sorte.SANS_ATOUT: {
                rang1 = 0;
                break;
            }
            default: {
                break;
            }
        }

        const joker = this.cartes.find(carte => carte.sorte === Sorte.JOKER);
        const blanche = this.cartes.find(carte => carte.sorte === Sorte.BLANCHE);

        if (mise.atout === Sorte.SANS_ATOUT) {
            if (mise.petite) {
                if (joker !== undefined) joker.rang = rang1 + 0.25;
                if (blanche !== undefined) blanche.rang = rang1 + 0.75;
            } else {
                if (joker !== undefined) joker.rang = rang1 - 0.25;
                if (blanche !== undefined) blanche.rang = rang1 - 0.75;
            }
        } else {
            if (joker !== undefined) joker.rang = rang1 + 0.25;
            if (blanche !== undefined) blanche.rang = rang1 + 0.75;
        }
        for (let joueur of this.joueurs) {
            joueur.cartes.sort((a, b) => a.rang - b.rang);
        }
    }

    getMeilleureCarte(action, atout, petite) {
        const cartes = action.joueur.cartes;
        const meilleureCarte = new MeilleureCarte();
        // 1re main, 1re carte
        if (action.cptCarte === 0 && action.cptJoueur === 0) {
            return meilleureCarte.getMain1Carte1(cartes, atout, this.pile);
        }
        // 1re carte
        // if (action.cptJoueur === 0) {
        //     return meilleureCarte.getCarte1(cartes, atout, this.pile);
        // }
        // Dernière carte de la main
        if (action.cptJoeur === 3) {
            const lead = this.getCarteLead(atout, petite);
            return meilleureCarte.getCarte4(this.sorteDemandee, cartes);
        }
        return cartes.find(c => !c.isDisabled(cartes, this.sorteDemandee, atout));
    }

    getCarte(poids, sorte) {
        return this.cartes.find(c => c.sorte === sorte && c.poids === poids);
    }

    setSorteDemandee(carte, atout) {
        if (carte.isAtout(atout)) {
            this.sorteDemandee = atout;
        } else {
            this.sorteDemandee = carte.sorte;
        }
    }
}