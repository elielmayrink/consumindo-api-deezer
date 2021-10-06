import { useEffect, useState, useRef } from "react";
import { Title, Container, List, CardList } from "../styles";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from "axios";
export default function Dashbord() {
  const [deezerPlaylist, setDeezerPlaylist] = useState([]);
  const [initialPlaylist, setInitialPlaylist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const[initialIndex, setInitialIndex] = useState(0);
  const amountMusicsInPg = 12;
  const limitOfmusics = 100;
  const[loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const api = axios.create({
    baseURL: `https://api.deezer.com/chart?index=${initialIndex}&limit=${amountMusicsInPg}`,
  });

  const audioPlay = useRef();
  useEffect(() => {
    setLoading(true);
        let playlist = [];
        api.get().then(({data}) => {
          playlist= data.tracks.data.map(music => ({...music, play_preview: false, isFavorite: false, audio_ref: audioPlay}));
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

  function handlerScroll() {
    if(window.innerHeight + document.documentElement.scrollTop < 
      document.documentElement.offsetHeight || initialIndex === limitOfmusics - 12 || loading) {
        return
      }

      setInitialIndex(initialIndex + amountMusicsInPg)
  }
  
  // const togglePlaying = (music) => {

  //   document.getElementById(music.title)

  //   // let newPlaylist = [];
  //   // for(let i = 0; i<deezerPlaylist.length; i++) {
  //   //   if(deezerPlaylist[i].id === music.id) {
  //   //     deezerPlaylist[i].play_preview = !deezerPlaylist[i].play_preview
  //   //     newPlaylist.push(deezerPlaylist[i])
  //   //   }else {
  //   //     newPlaylist.push(deezerPlaylist[i])
  //   //   }
  //   // }
  //   // setDeezerPlaylist(newPlaylist)
  //   // const prevValue = music.play_preview
  //   // if(prevValue) {
  //   //   music.audio_ref.current.play()
  //   // }else {
  //   //   music.audio_ref.current.pause();
  //   // }

  //   // console.log(music.play_preview)
  // }
  const handlerSearch = ({target}) => {
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
  const toggleFavorite = (music) => {
    let newMusics = [];
    for (let i = 0; i<deezerPlaylist.length; i++) {
      if(deezerPlaylist[i].id === music.id) {
        deezerPlaylist[i].isFavorite = !deezerPlaylist[i].isFavorite;
        newMusics.push(deezerPlaylist[i]);
      }else {
        newMusics.push(deezerPlaylist[i]);
      }
    }
    setDeezerPlaylist(newMusics);
    let newFavorites = deezerPlaylist.filter(music => music.isFavorite === true);
    setFavorites(newFavorites);
  }
  console.log(deezerPlaylist)

    return (
        <div>

          <Container>
            <Link to="/favorites">Favoritas</Link>
            <Title>Deezer playlist</Title>
            <input type="text" name="search" id="" value= {search} onChange={handlerSearch} />
            <List>
              {deezerPlaylist.map((music) => {
                return <CardList key={music.id}> 
                          <button onClick={() => toggleFavorite(music)} className="heart">
                            {!music.isFavorite ? <IoIosHeartEmpty title="Favoritar" className="heart-icon"/> : <IoIosHeart className="heart-icon-favorite" />} 
                          </button>
                          <div>
                            <h2>{music.title}</h2>
                            <div>
                            </div>

                          </div>
                          <img src={music.artist.picture_medium} alt="" />
                          <p>{music.artist.name}</p>
                          <a href={music.link}>Acessar no Deezer</a>
                          <audio src={music.preview} controls>audio</audio>
                      </CardList>
                })}
            </List>
          </Container>
        </div>
    )
}