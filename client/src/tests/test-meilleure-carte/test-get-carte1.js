import { Sorte, Symbole } from "../../models/carte";
import { Mise } from "../../models/mise";
import { Paquet } from "../../models/paquet";

export class GetCarte1 {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.joueAtout();
    }

    // La main est au partenaire, des points sont tombés et on a des points
    joueAtout() {
        const cartes = [
            this.paquet.getCarte(14, Sorte.PIQUE),
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(12, Sorte.PIQUE),
            this.paquet.getCarte(13, Sorte.COEUR),
            this.paquet.getCarte(7, Sorte.CARREAU),
            this.paquet.getCarte(14, Sorte.TREFLE),
            this.paquet.getCarte(13, Sorte.TREFLE),
            this.paquet.getCarte(11, Sorte.TREFLE)
        ]
        const atout = Sorte.TREFLE;
        const carte = this.paquet.getCarte1(this.paquet.getJoueur1(), new Mise('Gilberte', 60, Sorte.COEUR, false), null);
        const ok = carte.symbole === Symbole.ROI && carte.sorte === Sorte.COEUR;
        console.log(`${ok}: TestPaquet: getCarte1: partenaireAvecPoints`);
    }
}