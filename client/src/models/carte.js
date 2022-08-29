export const Sorte = {
    COEUR: 'coeur',
    PIQUE: 'pique',
    CARREAU: 'carreau',
    TREFLE: 'trèfle',
    JOKER: 'joker',
    BLANCHE: 'blanche',
    SANS_ATOUT: 'sans atout'
}

const Couleur = {
    NOIR: 'black',
    ROUGE: 'red'
}

export const Symbole = {
    SEPT: '7',
    HUIT: '8',
    NEUF: '9',
    DIX: '10',
    JACK: 'J',
    DAME: 'Q',
    ROI: 'K',
    AS: 'A',
}

export class Carte {
    constructor(rang, sorte, symbole) {
        this.rang = rang;
        this.key = `${symbole}|${sorte}`;
        this.sorte = sorte;
        this.symbole = symbole;
        switch (this.sorte) {
            case Sorte.COEUR: {
                this.image = 'coeur.png';
                break;
            }
            case Sorte.PIQUE: {
                this.image = 'pique.png';
                break;
            }
            case Sorte.CARREAU: {
                this.image = 'carreau.png';
                break;
            }
            case Sorte.TREFLE: {
                this.image = 'trefle.png';
                break;
            }            
            case Sorte.JOKER: {
                this.image = 'joker.png';
                break;
            }
            case Sorte.BLANCHE: {
                this.image = 'blanche.png';
                break;
            }
            default: {
                this.image = 'blanche.png';
                break;
            }
        }
        this.couleur = this.sorte === Sorte.COEUR || this.sorte === Sorte.CARREAU || this.sorte === Sorte.JOKER ? Couleur.ROUGE : Couleur.NOIR;
        this.points = 0;
        if (symbole === Symbole.DIX) {
            this.points = 10;
        } else if (this.symbole === Symbole.ROI) {
            this.points = 25;
        }
    }
}