import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './filme.css'
import api from '../../services/api';
import { toast } from 'react-toastify';


function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState (true); 

    useEffect(()=> {
        async function loadFilmes(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"21b710399fa79065898a61aec02a3839",
                    language: "pt-br",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);

            })
            .catch(()=>{
                console.log("Filme não encontrado")
                navigate("/", { replace :true})
                return;
            })

        }

        loadFilmes();

      

        return() => {
            console.log("componente desmontado")

        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista)  || [];
        const hasFilmes = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilmes){
            toast.warn("O filme selecionado já está na lista");
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success(`Filme salvo com sucesso:  ${filme.title}`)
    }

        if(loading){
            return(
                <div className="filme-info">
                    <h1>Carregando detalhes...</h1>
                </div>
            )
        }

    

    return(
        <div className="filme-info">
            <h1> {filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average}/10 </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}> salvar </button>
                <button> <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}> Trailer </a></button>

            </div>


        </div>
    )
}

export default Filme;


