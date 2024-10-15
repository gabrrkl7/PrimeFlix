import { useEffect, useState } from "react";
import api from '../../services/api';
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { Link } from "react-router-dom";
import './home.css';

// URL da api: movie/now_playing?api_key=21b710399fa79065898a61aec02a3839&language=pt-br


function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
 
    useEffect(()=>{
    
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{ 
            params:{
                api_key:"21b710399fa79065898a61aec02a3839",
                language: "pt-br",
                page: 1,
              }
            })
            //console.log(response.data.results.slice(0, 10));

            setFilmes(response.data.results.slice(0, 10))
            setLoading(false);
        }
        loadFilmes();

    }, [])


    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }


    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                return(
                    <article key={filme.id}>
                        <strong>
                            {filme.title}
                        </strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                )
            })}

            </div>
        </div>
    )
}

export default Home;
