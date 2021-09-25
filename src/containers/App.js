import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import '../App.css';
import SingleMovie from './singleMovie';
import MovieCards from '../components/movieCards';
import Loading from '../components/loader';


function App() {
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ movies, setMovies ] = useState([]);

  async function fetchData () {
    const url = 'https://swapi.dev/api/films';
    setLoading(true);

    try {
      // fetching the data and extracting the body of the response
      const response = await axios.get(url);
      const { results } = response.data;

      // transforming logic for the movies gotten from the [url];
      const transformedMovies = results.map((movie) => {
        const transformedMovie = {
          title: movie.title,
          release_date: movie.release_date,
          producer: movie.producer,
          url: movie.url,
          director: movie.director
        }

        return transformedMovie;
      });

      // setting the componenets states for sucessful fetch data
      setMovies(transformedMovies);
      setLoading(false);
      setError(false);
    } catch (ex) {
      // setting the componenets states for failure to fetch data
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  let toDisplay = null;

  if (loading) {
    toDisplay = (
      <div className='container'>
        <Loading />
      </div>
    )
  } else if (!loading && error) {
    toDisplay = (
      <div className='container'>
        <p className='error'>something went wrong</p>
      </div>
    )
  } else {
    toDisplay = <MovieCards movies={ movies } />
  }


  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <div className='container'>
            <motion.h3
              className="button"
              animate={{ y: 0 }}
              initial={{ y: '200vh' }}
              transition={{ type: 'spring', stiffness: 120 }}
            >STAR WARS</motion.h3>
            { toDisplay }
            <motion.div 
              className='footer'
              animate={{ y: 0 }}
              initial={{ y: '-200vh' }}
              transition={{ type: 'spring', stiffness: 120, delay: 2 }}
            >
              Made with love <FaHeart color='red' fontSize='20px'/> by Tomiwa
            </motion.div>
          </div>
        </Route>

        <Route path='/movie/:id'>
          <h4>List of available movies</h4>
          <SingleMovie />
        </Route>

        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
