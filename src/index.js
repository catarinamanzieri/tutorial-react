import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quadrado(props) {
    return (    
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
    
class Tabuleiro extends React.Component {
    renderSquare(i) {
        return (
            <Quadrado
                value={this.props.quadrados[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
        
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }    
}        
        
class Jogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historico: [{
                quadrados: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const historico = this.state.historico.slice(0, this.state.stepNumber + 1);
        const historicoAtual = historico[historico.length - 1];
        const quadrados = historicoAtual.quadrados.slice();
        if (calculateWinner(quadrados) || quadrados[i]) {
            return;
        }

        quadrados[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            historico: historico.concat([{
                quadrados: quadrados
            }]),
            stepNumber: historico.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    
    render() {
        const historico = this.state.historico;
        const historicoAtual = historico[this.state.stepNumber];
        const vencedor = calculateWinner(historicoAtual.quadrados);

        const jogadas = historico.map((step, jogada) => {
            const desc = jogada ?
                'Vá para a jogada #' + jogada :
                'Início do jogo / Rejogue';
            return (
                <li key={jogada}>
                    <button onClick={() => this.jumpTo(jogada)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (vencedor) {
            status = 'Vencedor: ' + vencedor;
        } else {
            status = 'Próximo jogador: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Tabuleiro 
                        quadrados={historicoAtual.quadrados}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{jogadas}</ol>
                </div>
            </div>
        );
    }    
}    
            
// ========================================
            
ReactDOM.render(
    <Jogo />,
    document.getElementById('root')
);

function calculateWinner(quadrados) {
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
            return quadrados[a];
        }
    }
    return null;
}