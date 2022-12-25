import { IsCarteMaitre } from "./test-isCarteMaitre";
import { GetMain1Carte1 } from "./test-get-main1-carte1";

export class TestMeilleureCarte {
    runAll() {

        const getMain1Carte1 = new GetMain1Carte1();
        getMain1Carte1.runAll();

        const isCarteMaitre = new IsCarteMaitre();
        isCarteMaitre.runAll();
    }
}

