// import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

import MovieCard from './movieCard';

function MovieCards ({ movies }) {
    return (
        <div
            className="movieCards"
        >
            <h4>List of available movies</h4>
            {
                movies.map((movie, i) => {
                    return (
                        <motion.div key={ movie.title }
                            animate={{ x: 0 }}
                            initial={{ x: i % 2 === 0 ?'100vw' : '-100vw' }}
                            transition={{ type: 'spring', stiffness: 120 , delay: i + 1 }}
                        >
                            <MovieCard 
                                movie={ movie }
                            />
                        </motion.div>
                    )
                })
            }
        </div>
    );
}

export default MovieCards;