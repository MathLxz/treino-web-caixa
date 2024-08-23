import { useState, useEffect } from 'react';
import Input from './componentes/input';
import Select from './componentes/select';
import Button from './componentes/button';
import Table from './componentes/table';

function App() {
  const [saldo, setSaldo] = useState(1000);
  const [valor, setValor] = useState();
  // const [valorDeposito, setValorDeposito] = useState();
  const [tipoOperacao, setTipoOperacao] = useState();
  const [historicoOperacao, setHistoricoOperacao] = useState([]);

  // remover
  // const [dataAtual, setDataAtual] = useState(new Date().toLocaleString());
  // const [mostraSaldo, setMostraSaldo] = useState();
  // const [mostraSaldoDiv, setMostraSaldoDiv] = useState(false);
  // const [mostraHistorico, setMostraHistorico] = useState(false);

  const TiposOperacao = [
    { label: 'Saque', value: 'Sacar' },
    { label: 'Depósito', value: 'Deposito' },
    { label: 'Consultar Saldo', value: 'Consultar' },
    { label: 'Consultar Histórico', value: 'Historico' },
  ];

  useEffect(() => {
    setHistoricoOperacao([
      {
        tipo: 'Saldo inicial',
        valor: 1000,
        saldo: saldo,
        data: new Date().toLocaleString(), // OK
      },
    ]);
  }, []);

  // function sacar() {
  //   if (saldo >= valorSaque) {
  //     const novoSaldo = saldo - valorSaque;
  //     setSaldo(novoSaldo);

  //     setHistoricoOperacao([
  //       ...historicoOperacao,
  //       {
  //         tipo: 'Saque',
  //         valor: valorSaque,
  //         saldo: novoSaldo,
  //         data: new Date().toLocaleString(), // ok
  //       },
  //     ]);
  //     setTipoOperacao('');
  //   } else {
  //     alert('Saldo insuficiente');
  //   }
  // }

  // function depositar() {
  //   const novoSaldo = saldo + Number(valorDeposito);
  //   setSaldo(novoSaldo);

  //   setHistoricoOperacao([
  //     ...historicoOperacao,
  //     {
  //       tipo: 'Depósito',
  //       valor: valorDeposito,
  //       saldo: novoSaldo,
  //       data: new Date().toLocaleString(), // OK
  //     },
  //   ]);

  //   setTipoOperacao('');
  // }

  function movimentar() {
    // Operação SACAR
    if (tipoOperacao == 'Sacar') {
      // FUNC SACAR
      if (saldo >= valor) {
        const novoSaldo = saldo - valor;
        setSaldo(novoSaldo);

        setHistoricoOperacao([
          ...historicoOperacao,
          {
            tipo: 'Saque',
            valor: valor,
            saldo: novoSaldo,
            data: new Date().toLocaleString(), // ok
          },
        ]);
        setTipoOperacao('');
      } else {
        alert('Saldo insuficiente');
      }
    }
    // Operação DEPO
    if (tipoOperacao == 'Deposito') {
      const novoSaldo = saldo + Number(valor);
      setSaldo(novoSaldo);

      setHistoricoOperacao([
        ...historicoOperacao,
        {
          tipo: 'Depósito',
          valor: valor,
          saldo: novoSaldo,
          data: new Date().toLocaleString(), // OK
        },
      ]);

      setTipoOperacao('');
    }
  }

  //remover
  // function consutarSaldo() {
  //   setMostraSaldo(saldo);
  //   setMostraSaldoDiv(true);

  // }
  // function consultarHistorico() {
  //   setMostraHistorico(true);

  // }

  return (
    <>
      <div>
        <div className="row justify-content-center mt-5">
          <div className="col-2">
            <h1>Caixa Eletrônico</h1>

            {<h3>Saldo: {saldo}</h3>}

            <Select
              Nome="Selecione uma Operação"
              Id="tipo-operacao"
              Opcoes={TiposOperacao}
              value={tipoOperacao}
              onChange={(e) => setTipoOperacao(e.target.value)}
            />
            {/* Isso está fazendo os inputs aparecerem ao consultar saldo e histórico */}
            {tipoOperacao && (
              <>
                <Input
                  Nome={`Digite o valor de Saque`}
                  onChange={(e) => setValor(e.target.value)}
                />
                <Button Nome={tipoOperacao} onClick={movimentar}></Button>
              </>
            )}

            {tipoOperacao == 'Consultar' && ( //OK
              <div>
                <h3>Slado atual: {saldo}</h3>
              </div>
            )}
          </div>

          {tipoOperacao == 'Historico' && ( // OK
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
