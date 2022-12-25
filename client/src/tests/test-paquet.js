import { Sorte } from "../models/carte";
import { Paquet } from "../models/paquet";

export class TestPaquet {
    runAll() {
        const getCarteLead = new GetCarteLead();
        getCarteLead.runAll();
        const trierBibittes = new TrierBibittes();
        trierBibittes.runAll();
    }
}

// Tester la méthode Paquet.getCarteLead(atout, petite)
export class GetCarteLead {
    constructor() {
    }

    runAll() {
        this.basic();
        this.atout();
        this.plusieursAtouts();
        this.petite();
        this.petiteAtout();
    }

    // Cas de base
    basic(){
        const paquet = new Paquet(true);
        paquet.trierBibittes({atout: Sorte.TREFLE, petite: false});
        paquet.sorteDemandee = Sorte.PIQUE;
        paquet.main = [
            paquet.getCarte(10, Sorte.PIQUE), 
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(8, Sorte.COEUR)
        ];
        const lead = paquet.getCarteLead(Sorte.TREFLE, false);
        const ok = lead.carte === paquet.main[1] && lead.joueur.index === 1 && lead.points === 10;
        console.log(`${ok}: TestPaquet: getCarteLead: basic`);
    }
    
    // 1 atout
    atout(){
        const paquet = new Paquet(true);
        paquet.trierBibittes({atout: Sorte.COEUR, petite: false});
        paquet.sorteDemandee = Sorte.PIQUE;
        paquet.main = [
            paquet.getCarte(10, Sorte.PIQUE), 
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(8, Sorte.COEUR)
        ];
        const lead = paquet.getCarteLead(Sorte.COEUR, false);
        const ok = lead.carte === paquet.main[2] && lead.joueur.index === 2 && lead.points === 10;
        console.log(`${ok}: TestPaquet: getCarteLead: atout`);
    }
    
    // Plusieurs atout
    plusieursAtouts(){
        const paquet = new Paquet(true);
        paquet.trierBibittes({atout: Sorte.TREFLE, petite: false});
        paquet.sorteDemandee = Sorte.PIQUE;
        paquet.main = [
            paquet.getCarte(10, Sorte.PIQUE), 
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(8, Sorte.COEUR),
            paquet.getCarte(15, Sorte.JOKER)
        ];
        const lead = paquet.getCarteLead(Sorte.TREFLE, false);
        const ok = lead.carte === paquet.main[3] && lead.joueur.index === 3 && lead.points === 10;
        console.log(`${ok}: TestPaquet: getCarteLead: plusieursAtouts`);
    }
    
    // Petite
    petite(){
        const paquet = new Paquet(true);
        paquet.trierBibittes({atout: Sorte.TREFLE, petite: true});
        paquet.sorteDemandee = Sorte.PIQUE;
        paquet.main = [
            paquet.getCarte(10, Sorte.PIQUE), 
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(8, Sorte.COEUR)
        ];
        const lead = paquet.getCarteLead(Sorte.TREFLE, true);
        const ok = lead.carte === paquet.main[0] && lead.joueur.index === 0 && lead.points === 10;
        console.log(`${ok}: TestPaquet: getCarteLead: petite`);
    }

    // Petite avec atout
    petiteAtout(){
        const paquet = new Paquet(true);
        paquet.trierBibittes({atout: Sorte.COEUR, petite: true});
        paquet.sorteDemandee = Sorte.PIQUE;
        paquet.main = [
            paquet.getCarte(10, Sorte.PIQUE), 
            paquet.getCarte(12, Sorte.PIQUE),
            paquet.getCarte(8, Sorte.COEUR),
            paquet.getCarte(15, Sorte.JOKER)
        ];
        const lead = paquet.getCarteLead(Sorte.COEUR, true);
        const ok = lead.carte === paquet.main[2] && lead.joueur.index === 2 && lead.points === 10;
        console.log(`${ok}: TestPaquet: getCarteLead: petiteAtout`);
    }
} 



// Tester la méthode Paquet.trierBibittes(atout, petite)
export class TrierBibittes {
    constructor() {
    }

    runAll() {
        this.basic();
        this.sansAtout();
    }

    // Cas de base
    basic(){
        const paquet = new Paquet(true);
        paquet.trierBibittes({atout: Sorte.COEUR, petite: false});
        const joker = paquet.getCarte(15, Sorte.JOKER);
        const blanche = paquet.getCarte(16, Sorte.BLANCHE);
        const ok = joker.rang === 7.25 && blanche.rang === 7.75;
        console.log(`${ok}: TestPaquet: trierBibittes: basic`);
    }

    // Sans atout
    sansAtout(){
        const paquet = new Paquet(true);
        paquet.trierBibittes({atout: Sorte.SANS_ATOUT, petite: false});
        const joker = paquet.getCarte(15, Sorte.JOKER);
        const blanche = paquet.getCarte(16, Sorte.BLANCHE);
        const ok = joker.rang === -0.25 && blanche.rang === -0.75;
        console.log(`${ok}: TestPaquet: trierBibittes: sansAtout`);
    }
}
