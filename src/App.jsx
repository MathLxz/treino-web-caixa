import { useState, useEffect } from 'react';
import Input from './componentes/input';
import Select from './componentes/select';
import Button from './componentes/button';
import Table from './componentes/table';

function App() {
  // const [saldo, setSaldo] = useState(1000);
  const [valor, setValor] = useState();
  const [tipoOperacao, setTipoOperacao] = useState();
  const [historicoOperacao, setHistoricoOperacao] = useState([]);

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
        saldo: 1000,
        data: new Date().toLocaleString(),
      },
    ]);
  }, []);

  function calcularSaldo() {
    let saldoAtual = 1000;

    historicoOperacao.forEach((op) => {
      if (op.tipo === 'Saque') {
        saldoAtual -= op.valor;
      } else if (op.tipo === 'Deposito') {
        saldoAtual += op.valor;
      }
    });

    return saldoAtual;

  }

  function movimentar() {
    const saldoAtual = calcularSaldo();

    if (tipoOperacao === 'Sacar') {
      if (saldoAtual >= valor) {
        const novoSaldo = saldoAtual - valor;

        setHistoricoOperacao([
          ...historicoOperacao,
          {
            tipo: 'Saque',
            valor: Number(valor),
            saldo: novoSaldo,
            data: new Date().toLocaleString(),
          },
        ]);
        setTipoOperacao('');
      } else {
        alert('Saldo Insuficiente');
      }
    }
    
    if (tipoOperacao === 'Deposito') {
      const novoSaldo = saldoAtual + Number(valor);

      setHistoricoOperacao([
        ...historicoOperacao,
        {
          tipo: 'Deposito',
          valor: Number(valor),
          saldo: novoSaldo,
          data: new Date().toLocaleString(),
        },
      ]);
      setTipoOperacao('');
    }
    
  }
 
  return (
    <>
      <div>
        <div className="row justify-content-center mt-5">
          <div className="col-2">
            <h1>Caixa Eletrônico</h1>

            <h3>Saldo: {calcularSaldo()}</h3>

            <Select
              Nome="Selecione uma Operação"
              Id="tipo-operacao"
              Opcoes={TiposOperacao}
              value={tipoOperacao}
              onChange={(e) => setTipoOperacao(e.target.value)}
            />

            {(tipoOperacao === 'Sacar' || tipoOperacao === 'Deposito') && (
              <>
                <Input
                  Nome={`Digite o valor de ${tipoOperacao === 'Sacar' ? 'Saque' : 'Deposito'}`}
                  onChange={(e) => setValor(e.target.value)}
                />
                <Button Nome={tipoOperacao} onClick={movimentar}></Button>
              </>
            )}

            {tipoOperacao === 'Consultar' && ( //OK
              <div>
                <h3>Saldo atual: {calcularSaldo()}</h3>
              </div>
            )}
          </div>

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
        </div>
      </div>
    </>
  );
}

export default App;
