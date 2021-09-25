import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

import Movie from './movie';
import Loading from '../components/loader';

function SingleMovie () {
    // extracting the id param
    const { id } = useParams();

    // state of the components
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ movieData, setMovieData ] = useState({});

    // function to fetch the movie and the characters of the movie
    async function fetchMovieData (url) {
        // the fetching starts
        setLoading(true);

        try {
            // fetches the movie details
            const response = await axios.get(url);

            // extract needed data from the body of response
            const { 
                characters, title, opening_crawl,
                director, producer, release_date
            } = response.data;

            // transform the array of characters url into an array of promises
            const prom = characters.map(el => {
                return axios.get(el);
            });

            // fetch the data for all the user
            Promise.all(prom)
                .then(response => {
                    // success in fetching the characters data
                    const data = [];

                    // tranform the body of the response and extract the needed data
                    response.forEach((characterResponse) => {
                        const { name, gender, height } = characterResponse.data;
                        const extractedCharacterData = { name, gender, height };

                        data.push(extractedCharacterData)
                    })

                    // setting all the extracted data(movie, characters)
                    const extractedData = { 
                        title, director,
                        producer, release_date,
                        opening_crawl, characters: data 
                    };

                    // setting the state of the movie, loading and error
                    setMovieData(extractedData);
                    setLoading(false);
                    setError(false);
                })
                .catch( (ex) => {
                    // error occurred wile fetching the data of users state is set to an error case
                    setLoading(false);
                    setError(true);
                });
        } catch (ex) {
            // error in fetching the movie && state is set for failure in fetching
            setLoading(false);
            setError(true);
        }
    }

    // fetch the data when the component mounts
    useEffect(() => {
        fetchMovieData(`https://swapi.dev/api/films/${ id }`);
    }, []);

    let toDisplay = null;

    // seeting what should be displayed for every stage of the fetching procedure
    if (loading) {
        // the fetching is ongoing
        toDisplay = <Loading />
    } else if (!loading && error) {
        // the fetch of data failed
        toDisplay = <p className="error">something went wrong</p>
    } else if (!loading && !error && Object.keys(movieData).length > 0) {
        // data has been fetched
        toDisplay = (
            <div>
                <Movie data={ movieData }/>
            </div>
        )
    }

    return (
        <div className='container'>
            <motion.h3
                animate={{ x: 0 }}
                initial={{ x: '-300vw' }}
                transition={{ type: 'spring', stiffness: 120 }}
            >STAR WARS</motion.h3>
            { toDisplay }
            <motion.div 
                className='footer'
                animate={{ x: 0 }}
                initial={{ x: '300vh' }}
                transition={{ type: 'spring', stiffness: 120, delay: 2 }}
            >
                Made with love <FaHeart color='red' fontSize='20px'/> by Tomiwa
            </motion.div>
        </div>
    )
}

export default SingleMovie;