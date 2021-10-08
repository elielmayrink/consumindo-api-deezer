import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMusic } from "../reduxModules/favoriteSlice";
import { Title, Container, List, Delete } from "../styles";
import { Link } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import CardListComponent from "../components/cardListComponent";

export default function Favorites () {
    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites.value)
    console.log(favorites)
    return (
        <>
        
            <Container>
              <div className="head-container">
                <Title>Favorites</Title>
                <nav>
                  <Link className="link" to="/">Home</Link>
                </nav>
              </div>
                <List>
                    {favorites.map(music => {
                        return (
                          <CardListComponent
                            disabled={music.isFavorite === true}
                            isFavorite={music.isFavorite}
                            title={music.title}
                            imgAlbum={music.artist.picture_medium}
                            artist={music.artist.name}
                            deezer={music.link}
                            preview={music.preview}
                          >
                            <Delete onClick={() => dispatch(removeMusic(music))}><IoTrashOutline className="delete-icon"/></Delete>
                          </CardListComponent>
                        )
                    })}
                </List>
            </Container>
        </>
    )
}