import { Symbole } from "./carte";

class AsInfo {
    constructor(as) {
        this.as = as;
        this.beu = null;
        this.nSorte = 0;
    }
}

class ChienInfo {
    constructor(chien) {
        this.chien = chien;
        this.ratio = 0;
    }
}

export class MeilleureCarte {
    constructor() {
    }

    piger(cartes, contrainte) {
        if (cartes.length === 1) {
            return cartes[0];
        }
        let choix = [];
        switch (contrainte) {
            case 'min': {
                const minVal = Math.min(...cartes.map(c => c.poids));
                choix = cartes.filter(c => c.poids === minVal);
                break;
            }
            case 'max': {
                const minVal = Math.max(...cartes.map(c => c.poids));
                choix = cartes.filter(c => c.poids === minVal);
                break;
            }
            default: {
                choix = cartes;
                break;
            }
        }
        const idx = Math.floor(Math.random() * choix.length);
        return cartes[idx];
    }

    getCarte4(sorteDemandee, atout, mesCartes) {
        const cartes = mesCartes.filter(c => !c.isDisabled(mesCartes, sorteDemandee, atout));
        
        const pointSec = this.getPointSec(this.getCartesSeches(cartes, atout), 13);
        if (pointSec !== null) {
            return pointSec;
        }
        return cartes[0];
    }

    getMain1Carte1(mesCartes, atout) {
        const cartesAs = mesCartes.filter(c => c.symbole === Symbole.AS);
        const cartesBeu = mesCartes.filter(c => c.symbole === Symbole.ROI)

        // Cherche une pair beu-as (pas d'atout)
        const asInfos = [];
        for (let as of cartesAs) {
            if (!as.isAtout(atout)) {
                const asInfo = new AsInfo(as);
                const beuMemeSorte = cartesBeu.find(c => c.sorte === as.sorte);
                if (beuMemeSorte !== undefined) {
                    asInfo.beu = beuMemeSorte;
                }
                asInfo.nSorte = mesCartes.filter(c => c.sorte === as.sorte).length;
                asInfos.push(asInfo);
            }
        }
        if (asInfos.length > 0){
            const avecBeu = asInfos.filter(as => as.beu !== null);
            if (avecBeu.length > 0) {
                // Joue le beu accoté par un as qui a le plus faible nombre de cartes de cette sorte
                const nMin = Math.min(...avecBeu.map(as => as.nSorte));
                const avecBeuMin = avecBeu.filter(as => as.nSorte === nMin);
                return this.piger(avecBeuMin.map(as => as.beu));
            }
            // Joue l'as qui a le plus faible nombre de cartes de cette sorte
            const nMin = Math.min(...asInfos.map(as => as.nSorte));
            const asMin = asInfos.filter(as => as.nSorte === nMin);
            return this.piger(asMin.map(as => as.as));
        }

        // Cherche une carte sèche (sauf atout)
        const cartesSeches = this.getCartesSeches(mesCartes, atout);
        const chienSec = this.getChienSec(cartesSeches, atout);
        if (chienSec !== null) {
            // Priorise chien
            return chienSec;
        }
        const pointSec = this.getPointSec(cartesSeches, 10);
        if (pointSec !== null) {
            // Priorise 10, ensuite beu
            return pointSec;
        }

        // Cherche un chien
        const chien = this.getMeilleurChien(mesCartes, atout,[],[]);
        if (chien === !null) {
            return chien;
        }

        // Joue un 10 qui n'est pas de l'atout
        const dix = mesCartes.filter(c => c.poids === 10 && !c.isAtout(atout));
        if (dix.length > 0) {
            return this.piger(dix);
        }

        // À ce stade-ci, il ne reste que de l'atout, jouer la plus forte
        return mesCartes[mesCartes.length - 1];
    }

    getCartesSeches(mesCartes, atout) {
        return mesCartes.filter(c => c.isSeche(mesCartes, atout) && !c.isAtout(atout));
    }

    getChienSec(cartesSeches, atout) {
        const chiensSecs = cartesSeches.filter(c => c.isChien(atout, true));
        if (chiensSecs.length > 0) {
            // Priorise les chiens
            return this.piger(chiensSecs, 'min');
        }
        return null;
    }

    getDixSec(cartesSeches) {
        const dixSecs = cartesSeches.filter(c => c.poids === 10);
        if (dixSecs.length > 0) {
            // Priorise 10
            return this.piger(dixSecs);
        }
        return null;
    }

    getBeuSec(cartesSeches){
    const beuxSecs = cartesSeches.filter(c => c.symbole === Symbole.ROI);
        if (beuxSecs.length > 0) {
            // Priorise beu
            return this.piger(beuxSecs);
        }
        return null;
    }

    getMeilleurChien(mesCartes, atout, pile, cartes) {
        let chiens = mesCartes.filter(c => c.isChien(atout, true));
        
        let ratios = [];
        if (chiens.length > 0) {
            // Priorise les chiens qui ont le meilleur ratio chien/point
            for (let chien of chiens) {
                const pointsSorte = mesCartes.filter(c => c.sorte === chien.sorte && c.points > 0);
                let totPoints = 0;
                for (let p of pointsSorte) {
                    const maitre = this.isCarteMaitre(p, mesCartes, atout, pile, cartes);
                    totPoints += p.points;
                }
                const chiensSorte = chiens.filter(c => c.sorte === chien.sorte);
                ratios.push(new ChienInfo(chien, chiensSorte.length/totPoints));
            }
            const minRatio = Math.min(...ratios.map(r => r.ratio));
            const chiensMinRatio = ratios.filter(r => r.ratio === minRatio);
            return this.piger(chiensMinRatio.map(c => c.chien), 'min');
        }
        return null;
    }

    getPointSec(cartesSeches, priorite) {
        const beuSec = this.getBeuSec(cartesSeches);
        if (beuSec !== null && priorite === 13) {
            return beuSec;
        }

        const dixSec = this.getDixSec(cartesSeches);
        if (dixSec !== null && priorite === 10) {
            return dixSec;
        }
        return null;
    }

    /**
     * Teste si la carte est maître
     * @param carte: carte à tester
     */
    isCarteMaitre(carte, mesCartes, atout, pile, cartes) {
        const cartesMeilleures = cartes.filter(c => c.isSorteDemandee(carte.sorte,atout) && c.poids > carte.poids);
        for (let mCarte of cartesMeilleures) {
            const cPile = pile.find(c => c.key === mCarte.key);
            const cMoi = mesCartes.find(c => c.key === mCarte.key);
            if (cPile === undefined && cMoi === undefined) {
                return false;
            }
        }
        return true;
    }
}