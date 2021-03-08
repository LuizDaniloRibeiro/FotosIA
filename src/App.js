import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Robot } from '../src/images/robotics2.svg'
import Carregando from  '../src/images/Loading.gif'


function App()
{
  //JSX - Extensão de Sintaxe JavaScript
  //Hooks - useState (facilitar para getter/setter)
  const [pessoas, setPessoas] = useState([]) //[]  inicializa com uma matriz 
  const [carregando, setCarregando] = useState(false)
  const [etnia, setEtnia] = useState('')
  const [idade, setIdade] = useState('')

  function ListaPessoas(props) 
  {
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) => 
      <img key={pessoa.id} src={pessoa.urls[4][512]}
          title="Pessoa gerada via IA" alt="pessoa gerada via IA" />
    )
    return (
      <>{listagemPessoas}</>
    )
  }


  async function obtemFoto() //pegar uma função de fora usar o async, await
  {

    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY
    
    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}`: ''
    const filtraIdade = idade.length > 0 ? `&age=${idade}`: ''

    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}&order_by=random`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setPessoas(data.faces)

    })
    .catch(function (error) {
      console.error('Houve um erro na requisição '+error.message)
    })

    setCarregando(false)
  }
  
  

  return(
    <div className="app">
      
      <h1>Gerador de Fotos com IA</h1>
      <Robot/>

      {carregando && 
        <img  src={Carregando} className="gif" title="Aguarde..." alt="Aguarde" width="50" />
      }
      
      <div className="fotos">
        <ListaPessoas pessoas={pessoas} />
      </div>
      
      <div className="linha">
        <label>IDADE:</label>
        <select className="idade" onChange={e => setIdade(e.target.value)}>
          <option value="">Todas</option>
          <option value="infant">Infantil</option>
          <option value="child">Criança</option>
          <option value="young-adult">Jovem</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Idoso</option>
        </select>
        
        <label>ETNIA:</label>
        <select className="etnia" onChange={e => setEtnia(e.target.value)}>
          <option value="">Todas</option>
          <option value="white">Branca</option>
          <option value="latino">Latina</option>
          <option value="asian">Asiática</option>
          <option value="black">Nrega</option>
        </select>
      </div>
      



      <div className="botao">
        <button  onClick={obtemFoto}>Obter Imagens</button>

        {pessoas.length > 0 &&
          <button type="button" onClick={() => setPessoas([])}>Limpar Imagem</button>
        }
      </div>
      
    </div>
  )
}

export default App;













