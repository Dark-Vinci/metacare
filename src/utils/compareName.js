import { GiMale, GiFemale } from 'react-icons/gi';
import { FaGenderless } from 'react-icons/fa';

// function for comparing and sorting array of objects that has name property in [ASC] order
export  function compareName (a, b) {
    if (a.name < b.name) {
        return -1;
    }

    if (a.name > b.name) {
        return +1;
    }
    return 0;
}

// function for comparing and sorting array of objects that has name property in [DESC] order
export function compareNameDescending (a, b) {
    if (a.name > b.name) {
        return -1;
    }

    if (a.name < b.name) {
        return +1;
    }
    return 0; 
}

// function for comparing and sorting array of objects that has height property in [ASC] order
export function compareHeightAscending (a, b) {
    if (Number(a.height) < Number(b.height)) {
        return -1;
    }

    if (Number(a.height) > Number(b.height)) {
        return +1;
    }
    return 0;
}

// function for comparing and sorting array of objects that has name property in [DESC] order
export function compareHeightDescending (a, b) {
    if (Number(a.height) > Number(b.height)) {
        return -1;
    }

    if (Number(a.height) < Number(b.height)) {
        return +1;
    }
    return 0;
}

// function for getting the appropraite icon to display for each gender
export function icon(value) {
    let genderIcon;

    if (value === 'male') {
        genderIcon = <GiMale fontSize='20px' color='rgba(55, 55, 247, 0.734)'/>
    } else if (value === 'female') {   
        genderIcon = <GiFemale fontSize='20px' color='rgb(247, 78, 78)'/>
    } else if (value === 'hermaphrodite') {
        genderIcon = (
            <div>
                <GiMale fontSize='20px' color='rgba(55, 55, 247, 0.734)'/>
                <GiFemale fontSize='20px' color='rgb(247, 78, 78)'/>
            </div>
        )
    } else {
        genderIcon = <FaGenderless fontSize='20px'/>
    }

    return genderIcon;
}

// function for sorting characters based on their gender
export function sortGender (state) {
    const M = [];
    const F = [];
    const R = [];

    state.forEach((character) => {
        if (character.gender === 'male') {
            M.push(character);
        } else if (character.gender === 'female') {
            F.push(character);
        } else {
            R.push(character);
        }
    });

    return { F, M, R };
}

// function for converting heights
export function meterToFeet (value) {
    // get the amount of feet in the height value
    const feet = Math.floor(value * 0.03);
    // convert the [feet] to (cm) to get the remaining...
    // ... that was filtered by { Math.floor }
    const feetToMeter = (1 / 0.03) * feet;
    const remainder = value - feetToMeter;
    // convert remainder to (in)
    const inches = remainder * 0.39;

    // value in ft/in
    return `(${ feet }ft/${ inches.toFixed(2) }in)`;
}

// function for getting the total height of the characters
export function totalCharacterHeightInCentiMeter (stateCharacter) { 
    const heightSum = stateCharacter.reduce(
        (totalHeight, character) => {
            // get height for each character
            let { height } = character;

            // height gives a falsy value [unknown, other string that cant resolve to number]
            if (!Number(height)) {
                height = 0;
            }
            
            return totalHeight + Number(height);
    }, 0);

    return heightSum;
}
