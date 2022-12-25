import { Sorte } from "./carte";

export class refuseSorte {
    constructor(sorte) {
        // Sorte
        this.sorte = sorte;
        // True si a déjà refusé
        this.refuse = false;
    }
}

export class Joueur {
    constructor(nom, index, partenaire) {
        this.cartes = [];
        this.nom = nom;
        this.index = index;
        this.partenaire = partenaire;
        this.actif = false;
        this.equipeIdx = this.index % 2;
        this.refuseSorte = [new refuseSorte(Sorte.COEUR), new refuseSorte(Sorte.PIQUE), new refuseSorte(Sorte.CARREAU), new refuseSorte(Sorte.TREFLE)];
    }

    getNom() {
        return this.nom;
    }

    getIndex() {
        return this.index;
    }

    getPartenaire() {
        return this.partenaire;
    }

    setCartes(cartes) {
        this.cartes = cartes;
    }

    getCartes() {
        return this.cartes;
    }

    getRefuseSorte(sorte) {
        const item = this.refuseSorte.find(i => i.sorte === sorte);
        if (item !== undefined) {
            return item.refuse;
        }
    }

    setRefuseSorte(sorteDemandee, carte, atout) {
        if (sorteDemandee === null) {
            return;
        }
        let sorte = carte.sorte;
        if (carte.isAtout(atout)) {
            sorte = atout;
        }
        if (sorte !== sorteDemandee) {
            const item = this.refuseSorte.find(i => i.sorte === sorteDemandee);
            if (item !== undefined) {
                item.refuse = true;
            }
        }
    }

    resetRefuseSorte() {
        for(let sorte of this.refuseSorte) {
            sorte.refuse = false;
        }
    }

    compteSorte(sorte, atout) {
        let cartesSorte = this.cartes.filter(c => c.sorte === sorte);
        if (atout !== Sorte.SANS_ATOUT) {
            const bibittes = this.cartes.filter(c => c.sorte === Sorte.JOKER || c.sorte === Sorte.BLANCHE);
            cartesSorte = cartesSorte.concat(bibittes);
        }
        return cartesSorte.length;
    }
}