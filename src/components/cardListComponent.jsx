import { CardList } from "../styles";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";




export default function CardListComponent(props) {


    return (
        <>
          <CardList> 
            {props.children}
            <button disabled={props.disabled} onClick={props.addMusic}  className="heart">
              {!props.isFavorite ? <IoIosHeartEmpty title="Favoritar" className="heart-icon"/> : <IoIosHeart className="heart-icon-favorite" />} 
            </button>
            <div>
              <h2>{props.title}</h2>
            </div>
            <img src={props.imgAlbum} alt="" />
            <p>{props.artist}</p>
            <a href={props.deezer} target="_blank">Acessar no Deezer</a>
            <audio src={props.preview} controls>audio</audio>
          </CardList>
        </>
    )
}