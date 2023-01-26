import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import api from './api/api'
import './index.css'
import './style.css'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function searchCep(){
    
    if(input === '' || input.length < 8){
      alert('Você precisa digitar algum CEP válido')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch {
      alert('Ops... algo deu errado na sua busca.')
      setInput('')
    }

  }

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>

      <div className='containerInput'>
        <input type="text" placeholder='Digite o seu CEP' value={input} onChange={(e)=> setInput(e.target.value)}/>
        <button className='searchBtn' onClick={searchCep}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  )
}

export default App
