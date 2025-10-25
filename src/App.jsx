import { useState } from 'react';
import './App.css';
import abi from "./abi/MensajesConNombre.json";
import { ethers } from "ethers";

const contracAddress = "0x50a528D420DBE37B34Cb00dCe8DB44767a37e224";
function App() {

  const [walletConectada, setWalletConectada] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  async function conectarWallet(){
    if(typeof window.ethereum === "undefined"){
      alert("Porfavor instala metamask");
      return;
    }
 
  try {
    const cuentas = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Cuenta conectada:", cuentas[0]);
    setWalletConectada(cuentas[0]);
  }catch(error){
    console.error("Error al conectar la wallet:",error);
  }
  }

  async function cargarMensajes(){
    if(!window.ethereum){
      alert("Porfavor instala metamask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contrato = new ethers.Contract(contracAddress, abi, provider);
    const lista = await contrato.obtenerMensajes();
    setMensajes(lista);
  }

  async function enviarMensaje(){
    if(!window.ethereum){
      alert("Porfavor instala metamask");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contrato = new ethers.Contract(contracAddress, abi, signer);
    const tx = await contrato.guardarMensaje(nombre, mensaje);
    await tx.wait();
    setNombre("");
    setMensaje("");
    cargarMensajes();
  }
  
  return (
    <div>
      <h1>Mensajes En Blockchain</h1>
      <button onClick={conectarWallet}>
        Conectar wallet
      </button>
      {
        walletConectada && (
          <div>
            <strong>Wallet conectada:</strong>{walletConectada}
          </div>
        )
      }
      <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
      <input type="text" placeholder="Tu mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>
      <button onClick={enviarMensaje}>
        Enviar mensaje
      </button>
      <button  onClick={cargarMensajes}>Cargar mensajes</button>

      <hr/>

      <h3>Mensajer guadados</h3>
      <ul>
        {mensajes.length === 0 ? (
          <li>No hay mensajes guardados</li>
        ) : (
          mensajes.map((msg, index) => (
            <li key={index}>
              <strong>{msg.nombre}:</strong> {msg.texto}<br/>
              <small>Direccion: {msg.remitente}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
