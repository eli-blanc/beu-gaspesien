import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import "antd/dist/antd.min.css";
import { CartesComponent } from './cartes-component';
import { JoueurComponent } from './joueur-component';
import { ActionType } from '../models/action';
import { MainComponent } from './main-component';

export class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.cartesAtout = 0;
    }

    onCliqueCarte(carte) {
        if (this.props.paquet.attendre) {
            return;
        }
        this.props.paquet.cliqueCarte(carte, this.props.action.joueur, this.props.action);
        if (this.props.action.cptJoueur === 0) {
            this.props.paquet.setSorteDemandee(carte, this.props.mise.atout);
        }

        if (this.props.action.type === ActionType.DISCARTER && carte.isAtout(this.props.mise.atout)) {
            this.cartesAtout++;
        }
        if (this.props.action.cptCarte === 1) {
            if (this.cartesAtout > 0) {
                this.onDiscarterAtout();
            }
            this.cartesAtout = 0;
        }
        this.props.nextAction();
    }

    onDiscarterAtout = () => {
        const nCartes = this.cartesAtout === 1 ? '1 carte' : '2 cartes';
        message.info(`${this.props.action.joueur.getNom()} a discarter ${nCartes} d'atout.`);
    };

    render() {
        return (
            <div>
                {/* Partenaire */}
                <div style={{ marginBottom: '60px' }}>
                    <JoueurComponent mise={this.props.mise} sorteDemandee={this.props.paquet.sorteDemandee}  action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} ouvert={this.props.ouvert} auto={this.props.auto} joueur={this.props.paquet.getJoueur3()}></JoueurComponent>
                </div>
                {/* Adversaires et Quettée */}
                <Row style={{ marginTop: '0px', marginBottom: '30px' }}>
                    {/* Gauche */}
                    <Col style={{ marginRight: '120px' }}>
                        <JoueurComponent mise={this.props.mise} sorteDemandee={this.props.paquet.sorteDemandee} action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} ouvert={this.props.ouvert} auto={this.props.auto} joueur={this.props.paquet.getJoueur2()}></JoueurComponent>
                    </Col>
                    {/* Quettée */}
                    {
                        (this.props.avecQuettee && this.props.action.type === ActionType.GAGER) &&
                        <Col style={{ marginTop: '38px' }} onClick={this.onQuettee}>
                            <CartesComponent action={this.props.action} actif={false} ouvert={this.props.ouvert} auto={this.props.auto} cartes={this.props.paquet.getQuettee()}></CartesComponent>
                        </Col>
                    }
                    {/* Main */}
                    {
                        (this.props.action.type === ActionType.JOUER || this.props.action.type === ActionType.REMPORTER) &&
                        <Col>
                            <MainComponent paquet={this.props.paquet} ouvert={this.props.ouvert} auto={this.props.auto}></MainComponent>
                        </Col>
                    }
                    {/* Droite */}
                    <Col style={{ marginLeft: '120px' }}>
                        <JoueurComponent mise={this.props.mise} sorteDemandee={this.props.paquet.sorteDemandee} action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} ouvert={this.props.ouvert} auto={this.props.auto} joueur={this.props.paquet.getJoueur4()}></JoueurComponent>
                    </Col>
                </Row>
                {/* Moi */}
                <div style={{ marginTop: '105px' }}>
                    <JoueurComponent mise={this.props.mise} sorteDemandee={this.props.paquet.sorteDemandee} action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} moi='true' ouvert='true' joueur={this.props.paquet.getJoueur1()}></JoueurComponent>
                </div>
            </div>
        )
    }
}