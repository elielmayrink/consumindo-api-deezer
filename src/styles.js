import styled, { keyframes } from "styled-components";

const opacityanimation = keyframes `
    from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`

export const Title = styled.h1 `
    color: #0A522D;
    margin-right: 700px;
`   
export const Container = styled.div `

    width: 100%;
    max-width: 1490px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 10px;
    text-align: center;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .5 );
    .head-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        nav {
            /* margin-bottom: 50px; */
            .link {
                margin: 10px;
                text-decoration: none;
            }
        }
    }

    input {
        width: 100%;
        height: 30px;
        margin-bottom: 20px;
        border: 1px solid rgba(231, 125, 47, .3);
        border-radius: 5px;
        padding: 10px;
        
        :focus {
            outline: 0.5px solid #E77D2F;
        }
    }
    
`
export const List = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    justify-self: center;
    align-self: center;
    


    @media(max-width: 1290px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media(max-width: 950px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 50px;
        
    }
    @media(max-width: 950px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }
`
export const Delete = styled.button `
    width: 50px;
        height: 50px;
        position: absolute;
        top: 12px;
        left: 2px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        .delete-icom{
            width: 35px;
            height: 35px;
            color: #0A522D;
        }
`
export const CardList = styled.div `
    width: 350px;
    height: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    border-radius: 12px;
    background-image: linear-gradient(to right, #FFFFFF 0%, #D6EDE1 100%);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .5 );
    animation: ${opacityanimation} 1s ease-in;
    .heart {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 12px;
        right: 2px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        .heart-icon {
            width: 25px;
            height: 25px;
            color: #0A522D;
        }
        .heart-icon-favorite {
            width: 25px;
            height: 25px;
            color: #0A522D;
        }
    }
    div {
        height: 53px;
        background-image: linear-gradient(to right, #FFFFFF 0%, #D6EDE1 100%);
        border-radius: 12px 12px 0 0 ;
        margin-bottom: 10px;
        
    }
    h2 {
        color: #0A522D;
    }
    p {
        color: #0A522D;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.5px;
        margin-top: 10px;
    }
    a {
        margin-top: -10px;
        margin-bottom: 10px;
        text-decoration: none;
    }
    audio {
        width: 100%;
        height: 30px;
        opacity: .8;
        
    }
    audio::-webkit-media-controls {
        display: flex;
    }
    audio::-webkit-media-controls-panel {
        
    }
`   
export const PlayButton = styled.div `
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    .play {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #FFFFFF;

    }
`