import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import './DetailsCard.modules.css';

const DetailsCard = props => {
    return (
        <div className="details-card">
            <div className="details-card__section">
                <i className="fa fa-birthday-cake fa-3x"></i>
                <p className="details-card__text">{props.details.age} years old</p>
            </div>
            <div className="details-card__section">
                <i className="fa fa-venus-mars fa-3x"></i>
                <p className="details-card__text">{props.details.gender}</p>
            </div>
            <div className="details-card__section">
                <i className="fa fa-paw fa-3x"></i>
                <p className="details-card__text">{props.details.breed}</p>
            </div>
            <div className="details-card__section">
                <i className="fa fa-thumbs-up fa-3x"></i>
                <p className="details-card__text">{props.details.likes.join(', ')}</p>
            </div>
            <div className="details-card__section">
                <i className="fa fa-thumbs-down fa-3x"></i>
                <p className="details-card__text">{props.details.dislikes.join(', ')}</p>
            </div>
            <div className="details-card__section">
                <i className="fa fa-medkit fa-3x"></i>
                <p className="details-card__text">{props.details.healthIssues.join(', ')}</p>
            </div>
            <div className="details-card__section">
                <i className="fa fa-child fa-4x"></i>
                <p className="details-card__text">{props.details.goodWithChildren ? 'Good with children' : 'Not accustomed to children'}</p>
            </div>

        </div>
    );
};

export default DetailsCard;