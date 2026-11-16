// Conexão de rotas no react
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import EmissaoSenha from './pages/EmissaoSenha.jsx';
import PaginaInicial from './pages/PaginaInicial.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmissaoSenha />} />
        <Route path="/inicio" element={<PaginaInicial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;