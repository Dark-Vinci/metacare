import { withRouter, useHistory } from 'react-router-dom';

function MovieCard ({ movie }) {
    const { push } = useHistory();
    const { url, title, producer, release_date, director } = movie;

    // extracting the number/id if the movie by slicing out the last two...
    // ...word and the last word since the id appears to be at nth(-2) index of the url;
    const id = url.slice(-2, url.length-1)

    // click function for the card
    const movieClickHandler = () => {
        push(`/movie/${ id }`)
    }

    return (
        <div
            className="movieCard"
            onClick={ movieClickHandler }
        >
            <h3>{ title }</h3>
            <h4 className="producer" >producer by { producer }</h4>
            <h4>director by { director }</h4>
            <p>released in { release_date }</p>
        </div>
    )
}

export default withRouter(MovieCard);