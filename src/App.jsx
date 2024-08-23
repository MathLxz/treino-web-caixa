import { useState, useEffect } from 'react';
import Input from './componentes/input';
import Select from './componentes/select';
import Button from './componentes/button';
import Table from './componentes/table';

function App() {
  const [saldo, setSaldo] = useState(1000);
  const [valorSaque, setValorSaque] = useState();
  const [valorDeposito, setValorDeposito] = useState();
  const [tipoOperacao, setTipoOperacao] = useState();
  const [historicoOperacao, setHistoricoOperacao] = useState([]);

  
  
  // remover
  // const [dataAtual, setDataAtual] = useState(new Date().toLocaleString()); // remover
  const [mostraSaldo, setMostraSaldo] = useState();
  const [mostraSaldoDiv, setMostraSaldoDiv] = useState(false);
  const [mostraHistorico, setMostraHistorico] = useState(false);

  const TiposOperacao = [
    { label: 'Saque', value: 'Sacar' },
    { label: 'Depósito', value: 'Depositar' },
    { label: 'Consultar Saldo', value: 'Consultar' },
    { label: 'Consultar Histórico', value: 'Historico' },
  ];

  useEffect(() => {
    setHistoricoOperacao([
      {
        tipo: 'Saldo inicial',
        valor: 1000,
        saldo: saldo,
        data: new Date().toLocaleString(), // modifcar
      },
    ]);
  }, []);

  function sacar() {
    if (saldo >= valorSaque) {
      const novoSaldo = saldo - valorSaque;
      setSaldo(novoSaldo);
      

      setHistoricoOperacao([
        ...historicoOperacao,
        {
          tipo: 'Saque',
          valor: valorSaque,
          saldo: novoSaldo,
          data: new Date().toLocaleString(), // modificar
        },
      ]);
      setTipoOperacao('');
    } else {
      alert('Saldo insuficiente');
    }
  }

  function depositar() {
    const novoSaldo = saldo + Number(valorDeposito);
    setSaldo(novoSaldo);
     // remover

    setHistoricoOperacao([
      ...historicoOperacao,
      {
        tipo: 'Depósito',
        valor: valorDeposito,
        saldo: novoSaldo,
        data: new Date().toLocaleString(), // modificar
      },
    ]);

    setTipoOperacao('');
  }


  //remover
  function consutarSaldo() {
    setMostraSaldo(saldo);
    setMostraSaldoDiv(true);
    
  }
  function consultarHistorico() {
    setMostraHistorico(true);
   
  }

  return (
    <>
      <div>
        <div className="row justify-content-center mt-5">
          <div className="col-2">
            <h1>Caixa Eletrônico</h1>

            <Select
              Nome="Selecione uma Operação"
              Id="tipo-operacao"
              Opcoes={TiposOperacao}
              value={tipoOperacao}
              onChange={(e) => setTipoOperacao(e.target.value)}
            />

            {tipoOperacao == 'Sacar' && (
              <>
              <Input
                Nome={`Digite o valor de Saque`}
                onChange={(e) => setValorSaque(e.target.value)}
              />
              <Button Nome={tipoOperacao} onClick={sacar}></Button>
              </>
            )}

          
            {/* Modificar */}
            {tipoOperacao == 'Depositar' && (
              <Input
                Nome={`Digite o valor de Depósito`}
                onChange={(e) => setValorDeposito(e.target.value)}
              />
            )}

            {tipoOperacao == 'Depositar' && (
              <Button Nome={tipoOperacao} onClick={depositar}></Button>
            )}

            {tipoOperacao == 'Consultar' && (
              <Button Nome={tipoOperacao} onClick={consutarSaldo}></Button>
            )}

            {tipoOperacao == 'Historico' && (
              <Button Nome={tipoOperacao} onClick={consultarHistorico}></Button>
            )}

            {mostraSaldoDiv && ( // modificar tipo de op
              <div className="mostraSaldo">
                <h3>Slado atual: {mostraSaldo}</h3>
              </div>
            )}
          </div>
          {mostraHistorico && ( // condicionar pelo tipo op
            <div className="col-4">
              <Table>
                <thead>
                  <tr>
                    <th>SALDO</th>
                    <th>OPERAÇÃO</th>
                    <th>VALOR</th>
                    <th>DATA</th>
                  </tr>
                </thead>

                <tbody>
                  {historicoOperacao.map((operacao, index) => (
                    <tr key={index}>
                      <td>{operacao.saldo}</td>
                      <td>{operacao.tipo}</td>
                      <td>{operacao.valor}</td>
                      <td>{operacao.data}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
