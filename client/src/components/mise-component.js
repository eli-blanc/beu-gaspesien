import React, { Component } from 'react';

import { Form, InputNumber, Select, Radio } from 'antd';

import "antd/dist/antd.css";
import { Sorte } from '../models/carte';
import { Mise, Montant } from '../models/mise';

export class MiseComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radioIdx: 1
        }

        this.joueurs = [];
        this.props.joueurs.map((item, index) => {
            this.joueurs.push(<Select.Option key={index}>{item}</Select.Option>);
        });

        this.atoutsList = [Sorte.COEUR, Sorte.PIQUE, Sorte.CARREAU, Sorte.TREFLE, Sorte.SANS_ATOUT];
        this.atouts = [];
        this.atoutsList.map((item, index) => {
            this.atouts.push(<Select.Option key={index}>{item}</Select.Option>);
        });
    }

    onJoueur(idx) {
        this.props.mise.joueur = this.props.joueurs[idx];
    }

    onAtout(idx) {
        this.props.mise.atout = this.atoutsList[idx];
    }

    onMontant(value) {
        this.props.mise.montant = value;
    }

    onMontantRadio(idx) {
        this.setState({
            radioIdx: idx
        });
        
        if (idx > 1) {
            this.props.mise.montant = 150;
        }
        if (idx === 2) {
            this.props.mise.petite = true;
        }
    }

    render() {

        return (
            <div>
                <Form
                    colon={false}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                >
                    <Form.Item label="Qui?" required style={{width: '600px'}}>
                        {/* Joueur */}
                        <Select
                            allowClear
                            onChange={(joueur) => this.onJoueur(joueur)}
                        >
                            {this.joueurs}
                        </Select>
                    </Form.Item>
                    {/* Montant */}
                    <Form.Item label="Combien?" required style={{width: '600px'}}>
                        <Radio.Group onChange={(e) => this.onMontantRadio(e.target.value)} value={this.state.radioIdx} style={{width: '600px'}}>
                            <Radio value={1}><InputNumber style={{width:'70px'}} defaultValue="60" step="5" min="50" max="140" onChange={(value) => this.onMontant(value)} /></Radio>
                            <Radio value={2}>{Montant.PETITE}</Radio>
                            <Radio value={3}>{Montant.GROSSE}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/* Atout */}
                    <Form.Item label="En quoi?" required style={{width: '600px'}}>
                        <Select
                            allowClear
                            onChange={(atout) => this.onAtout(atout)}
                        >
                            {this.atouts}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}