import React, { useState, useEffect } from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
        id
        flight_number
        name
        date_local
        success
        rocket
    }
  }
`;


const Launches = () => {
    const [results, setResults] = useState([])
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    // console.log('loading', loading);
    // console.log('error', error);
    // console.log('data', data);

    useEffect(() => {
      if(data) {
        console.log("here's the data", data)
        setResults(data.launches)
      }
    }, [data])

    const filterResults = (bool) => {
      console.log('bool', bool)
      const temp = data.launches;

      if (bool === 'success') {
        const filtered = temp.filter(launch => launch.success)
        setResults(filtered)
      }

      if (bool === 'fail') {
        const filtered = temp.filter(launch => !launch.success && launch.success !== null)
        setResults(filtered)
      }

      if (bool === 'reset') {
        setResults(temp)
      }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    
    return (
        <div>
            <h1 className="display-4 my-3">Launches</h1>
            <div className="my-3">
              <select onChange={(e) => filterResults(e.target.value)}>
                <option value="reset">- Mission Status -</option>
                <option value="success">Success</option>
                <option value="fail">Fail</option>
              </select>
            </div>
            {
                results?.map((launch) => {
                  return <LaunchItem key={launch.flight_number} launch={launch}/>
                })
            }
        </div>
    )
}

export default Launches
