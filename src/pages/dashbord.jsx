import { useEffect, useState } from "react";
import { Title, Container, List } from "../styles";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addMusic } from "../reduxModules/favoriteSlice";
import axios from "axios";
import CardListComponent from "../components/cardListComponent";
export default function Dashbord() {
  const [deezerPlaylist, setDeezerPlaylist] = useState([]);
  const [initialPlaylist, setInitialPlaylist] = useState([]);
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.value)
  const[initialIndex, setInitialIndex] = useState(0);
  const amountMusicsInPg = 12;
  const limitOfmusics = 100;
  const[loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  //API
  const api = axios.create({
    baseURL: `https://api.deezer.com/chart?index=${initialIndex}&limit=${amountMusicsInPg}`,
  });
  useEffect(() => {
    setLoading(true);
        let playlist = [];
        api.get().then(({data}) => {
          playlist= data.tracks.data.map(music => ({...music, play_preview: false, isFavorite: false}));
          lookingForFavorite(favorites, playlist);
          setDeezerPlaylist([...deezerPlaylist,  ...playlist]);
          setInitialPlaylist([...initialPlaylist, ...playlist]);
          setLoading(false);
        });
          

      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex]);

  useEffect(() => {

    window.addEventListener("scroll", handlerScroll);
    return () => window.removeEventListener("scroll", handlerScroll);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerScroll]);

  function lookingForFavorite(arr1, arr2) {
    if(arr1.length === 0){
      return
    }
    for(let f = 0; f < arr1.length; f++) {
      for(let m = 0; m < arr2.length; m++) {
        if(arr1[f].id === arr2[m].id) {
          arr2[m] = arr1[f];
        }
      }
    }
  }
  function handlerScroll() {
    if(window.innerHeight + document.documentElement.scrollTop < 
      document.documentElement.offsetHeight || initialIndex === limitOfmusics - 12 || loading) {
        return
      }

      setInitialIndex(initialIndex + amountMusicsInPg)
  }


  function handlerSearch({target}) {
    setSearch(target.value)
    if(!target.value) {
      setDeezerPlaylist(initialPlaylist);
      return;
    }
    const filterPlaylist = deezerPlaylist.filter(music => {
      return music.title.toLowerCase().includes(search.toLowerCase()) || 
      music.album.title.toLowerCase().includes(search.toLocaleLowerCase) ||
      music.artist.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    }
    )
    setDeezerPlaylist(filterPlaylist)
  }
  function addFavoriteMusic(music) {
    let newList = []
    for (let i = 0; i<deezerPlaylist.length; i++) {
        if(deezerPlaylist[i].id === music.id ) {
          deezerPlaylist[i].isFavorite = true
          newList.push(deezerPlaylist[i]);
          dispatch(addMusic(deezerPlaylist[i]))
        }else {
          newList.push(deezerPlaylist[i]);
        }
    }
    setDeezerPlaylist(newList);
  }
    return (
        <div>
          <Container>
            <div className="head-container">
              <Title>Deezer playlist</Title> 
              <nav>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/favorites">Favoritas</Link>
              </nav>
            </div>
            <input type="text" name="search" id="" value= {search} onChange={handlerSearch} placeholder="Pesquise aqui sua musica" />
            <List>
              {deezerPlaylist.map((music) => {
                return (
                  <CardListComponent 
                    key={music.id}
                    disabled={music.isFavorite === true}
                    addMusic={() => addFavoriteMusic(music)}
                    isFavorite={music.isFavorite}
                    title={music.title}
                    imgAlbum={music.artist.picture_medium}
                    artist={music.artist.name}
                    deezer={music.link}
                    preview={music.preview}
                   > </CardListComponent>
                )
                })}
            </List>
          </Container>
        </div>
    )
}

{/* <CardList key={music.id}> 
                          <button disabled={music.isFavorite === true} onClick={() => favoritar(music)}  className="heart">
                            {!music.isFavorite ? <IoIosHeartEmpty title="Favoritar" className="heart-icon"/> : <IoIosHeart className="heart-icon-favorite" />} 
                          </button>
                          <div>
                            <h2>{music.title}</h2>
                          </div>
                          <img src={music.artist.picture_medium} alt="" />
                          <p>{music.artist.name}</p>
                          <a href={music.link}>Acessar no Deezer</a>
                          <audio src={music.preview} controls>audio</audio>
                      </CardList> */}