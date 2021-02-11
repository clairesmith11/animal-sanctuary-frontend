import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../shared/context/authContext';

import './OverviewCard.css';

const OverviewCard = props => {
    const auth = useContext(AuthContext);

    // Filter through animal's applications to determine whether the currently authenticated user has an active app
    // Allows us to put an "App submitted" badge on that animal's card which will show the current use which animals he/she 
    // has applied to adopt
    const activeUserApps = props.applications.filter(app => app.creator === auth.userId);

    return (

        <Link to={`/animal/${props.id}`} className="animal-card__link">
            <div className="animal-card">
                {activeUserApps.length > 0 && <div className="animal-card__badge"><p>App <br /> submitted!</p></div>}
                <div className="animal-card__image">
                    <img src={props.photo} alt={props.name} />
                </div>
                <h2>{props.name}</h2>
                <div className="animal-card__info">
                    <i className="fa fa-venus-mars fa-2x"></i>
                    <p>{props.gender}</p>
                    <i className="fa fa-birthday-cake fa-2x"></i>
                    <p>{props.age} years old</p>
                    <i className="fa fa-paw fa-2x"></i>
                    <p>{props.breed}</p>


                </div>
            </div>
        </Link>



    );
};

export default OverviewCard;