import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CarteComponent } from './carte-component';

export class CartesComponent extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (e,carte) => {;
        if (e.detail === 2 && this.props.clickable) {  
            this.props.discarte(carte);
        }
    };

    render() {
        return (
            <div>
                <Row gutter={6}>
                    {/* Chaque carte */}
                    {this.props.cartes.map((item, index) => (
                        <Col onClick={e => this.onClick(e, item)}>
                            <CarteComponent carte={item} ouvert={this.props.ouvert}></CarteComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}