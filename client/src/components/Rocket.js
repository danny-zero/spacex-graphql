import React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";

import '../App.css'

const ROCKET_QUERY = gql`
        query RocketQuery($id: String!) {
            rocket(id: $id) {
                type
                name
                description
                flickr_images
            }
        }
    `;



const Rocket = ({ id, img, setImg }) => {
    const { loading, error, data } = useQuery(ROCKET_QUERY, {
    variables: { id }});
    console.log('loading', loading);
    console.log('error', error);
    console.log('data', data);
    console.log('rocketId', id)


    const openImage = (link) => {
        if (img) {
            setImg('')
        } else {
            setImg(link)
        }
}

    return (
        <div>
            <span className="text-primary rocket-name" onClick={() => openImage(data?.rocket.flickr_images[0])}>{data?.rocket.name}</span>
        </div>
    )
}

export default Rocket
