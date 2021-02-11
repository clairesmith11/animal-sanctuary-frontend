import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../shared/context/authContext';
import Button from '../../components/Forms/Button';
import './DetailsText.css';

const DetailsText = (props) => {
    const auth = useContext(AuthContext);
    let statusMessage = '';

    // Set adoption status text which will display with special color denoting status

    if (props.animal.adoptionStatus === 'adopted') {
        statusMessage = (`${props.animal.name} has already found a forever home!`);
    } else if (props.animal.adoptionStatus === 'pending') {
        statusMessage = (`${props.animal.name}'s adoption is pending. You may still submit an application`);
    } else {
        statusMessage = (`${props.animal.name} is available to adopt!`);
    }

    return <React.Fragment>
        <div className="animal-details__img">
            <img src={props.animal.image} alt={props.animal.name} />
            <h3 className={props.animal.adoptionStatus === 'available' ? 'green' : 'red'}>{statusMessage}</h3>
            <p className="animal-details__applications">{props.animal.name} has {props.animal.applications.length} submitted applications.</p>
            {auth.isAdmin &&
                <Link className="animal-details__edit"
                    to={`/edit/${props.animal._id}`}>
                    <Button
                        type="button"
                        text={`Edit ${props.animal.name}`}
                        isValid={true} />
                </Link>
            }
        </div>
        <h1 className="animal-details__name">{props.animal.name}</h1>
        <p className="animal-details__summary">{props.animal.summary}</p>
    </React.Fragment>;
};

export default DetailsText;;