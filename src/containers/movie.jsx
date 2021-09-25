import { useReducer, useState } from 'react';
import { motion } from 'framer-motion';

import { 
    compareHeightDescending, compareHeightAscending, 
    compareNameDescending, compareName, icon,
    sortGender, meterToFeet, totalCharacterHeightInCentiMeter
} from '../utils/compareName';

function Movie ({ data }) {
    // extracting the needed information from the [data] props
    const { 
        characters, title, opening_crawl,
        director, producer, release_date
    } = data;

    // state for knowing if the sorting should be ascending/descending....
    // ... and in the case of gender, [male, female]
    const [ heightSort, setHeightSort ] = useState('ASCENDING');
    const [ nameSort, setNameSort ] = useState('ASCENDING');
    const [ genderSort, setGenderSort ] = useState('MALE');

    const reducer = (state, action) => {
        switch (action.type) {
            case "SORT_NAME_ASCENDING":
                const toBeSortedAscending = [ ...state ];
                const sorted = toBeSortedAscending.sort(compareName);
                return sorted;
            case "SORT_NAME_DESCENDING":
                const toBeSortedDescending = [ ...state ];
                const sortedCharactersDescending = toBeSortedDescending.sort(compareNameDescending);
                return sortedCharactersDescending;
            case "HEIGHT_SORT_ASCENDING":
                const toBeSortedHeight = [ ...state ];
                const sortedWithHeightAscending = toBeSortedHeight.sort(compareHeightAscending);
                return sortedWithHeightAscending;
            case "HEIGHT_SORT_DESCENDING":
                const toBeSortedHeightDes = [ ...state ];
                const sortedWithHeightDescending = toBeSortedHeightDes.sort(compareHeightDescending);
                return sortedWithHeightDescending;
            case "FEMALE_FILTER":
                const femaleCharacters = characters.filter(character => character.gender === 'female')
                return femaleCharacters;
            case "MALE_FILTER":
                const maleCharacters = characters.filter(character => character.gender === 'male');
                return maleCharacters;
            case "OTHERS_FILTER":
                const otherCharacters = characters.filter(character => {
                    return character.gender !== 'male' && character.gender !== 'female'
                });
                return otherCharacters;
            case "SHOW_ALL":
                return [ ...characters ];
            case "SORT_MALE_FIRST":
                let maleFirst = sortGender(state);
                return [ ...maleFirst.M, ...maleFirst.F, ...maleFirst.R ];
            case "SORT_FEMALE_FIRST":
                let femaleFirst = sortGender(state);
                return [ ...femaleFirst.F, ...femaleFirst.M, ...femaleFirst.R ];
            default:
                return state
        }
    }

    const [ stateCharacter, dispatch ] = useReducer(reducer, characters);

    // getting the height in (ft/in) by invoking function [meterToFeet]
    const totalHeightInCentimeters = totalCharacterHeightInCentiMeter(stateCharacter);
    const totalCharacterHeightInFeet = meterToFeet(totalHeightInCentimeters);

    // handler for sorting the height of characters in [ASC, DESC] order
    const heightSortHandler = () => {
        if (heightSort === 'ASCENDING') {
            dispatch({ type: 'HEIGHT_SORT_ASCENDING' });
            setHeightSort('DESCENDING');
        } else {
            dispatch({ type: 'HEIGHT_SORT_DESCENDING' });
            setHeightSort('ASCENDING');
        }
    }

    // handler for sorting name name of characters in [ASC, DESC] order
    const nameSortHandler = () => {
        if (nameSort === 'ASCENDING') {
            dispatch({ type: 'SORT_NAME_ASCENDING'});
            setNameSort('DESCENDING');
        } else {
            dispatch({ type: 'SORT_NAME_DESCENDING'});
            setNameSort('ASCENDING');
        }
    }

    // handler for sorting by gender of characters
    const genderSortHandler = () => {
        if (genderSort === 'MALE') {
            dispatch({ type: 'SORT_MALE_FIRST' });
            setGenderSort('FEMALE');
        } else {
            dispatch({ type: 'SORT_FEMALE_FIRST' });
            setGenderSort('MALE')
        }
    }

    // handler for filtering out male character
    const femaleFilterHandler = () => {
        dispatch({ type: "FEMALE_FILTER" })
    }

    // handler for filtering out female character
    const maleFilterHandler = () => {
        dispatch({ type: "MALE_FILTER" })
    }

    // handler for showing all the characters
    const showAllHandler = () => {
        dispatch({ type: "SHOW_ALL" })
    }

    // handler for viewing characters that are [agender, hermaphrodite]
    const otherGenderHandler = () => {
        dispatch({ type: "OTHERS_FILTER" })
    }

    return (
        <div className='movie'>
            {/* movie information */}
            <div className="info">
                <h3>{ title }</h3>
                <h4>released in { (new Date(release_date)).toDateString() }</h4>
                <h4>produced by { producer }</h4>
                <h4>directed by { director }</h4>
                <motion.p
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ type: 'tween', duration: 3, delay: 1 }}
                >
                    { opening_crawl }
                </motion.p>
            </div>

            <div className="button">
                <h2>show</h2>
                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: '200vw' }}
                    transition={{ type: 'spring', stiffness: 120 }}
                >
                    <button
                        onClick={ maleFilterHandler }
                    >Male</button>
                    <button
                        onClick={ femaleFilterHandler }
                    >Female</button>
                </motion.div>

                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: '-200vw' }}
                    transition={{ type: 'spring', stiffness: 120 }}
                >
                    <button
                        onClick={ otherGenderHandler }
                    >Others</button>
                    <button
                        onClick={ showAllHandler }
                    >All </button>
                </motion.div>
            </div>

            {/* table of characters in the movie */}
            <table>
                <thead
                    onClick={ nameSortHandler }
                    style={{ cursor: 'pointer' }}
                >
                    <tr>
                        <th onDoubleClick={ nameSortHandler }>Name</th>
                        <th onDoubleClick={ genderSortHandler }>Gender</th>
                        <th onDoubleClick={ heightSortHandler }>Height(cm)</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        // looping through the array of characters and...
                        // ...generating the characters row of data
                        stateCharacter.map((character, i) => {
                            // extracting the data to be displayed
                            const { name, gender, height } = character;

                            return (
                                <motion.tr 
                                    key={ name }
                                    animate={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ type: 'tween', delay: (i + 1) * 0.15 }}
                                >
                                    <td>{ name }</td>
                                    <td>{ icon(gender) }</td>
                                    <td>{  height }</td>
                                </motion.tr>
                            )
                        })
                    }

                    <motion.tr
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ type: 'tween', delay: (stateCharacter.length + 1) * 0.15 }}
                    >
                        <td>{ stateCharacter.length } characters</td>
                        <td colSpan='2'>{ `${ totalHeightInCentimeters }cm ${ totalCharacterHeightInFeet }` }</td>
                    </motion.tr>
                </tbody>
            </table>
        </div>
    );
}

export default Movie;