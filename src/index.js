import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quadrado(props) {
    return (    
        <button 
            className="square" 
            onClick={props.onClick}        
        >
            {props.value}
        </button>
    );
}
    
class Tabuleiro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quadrados: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const quadrados = this.state.quadrados.slice();
        
        if (calculateWinner(quadrados) || quadrados[i]) {
            return;
        }

        quadrados[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            quadrados: quadrados,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Quadrado
                value={this.state.quadrados[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
        
    render() {
        const vencedor = calculateWinner(this.state.quadrados);
        let status;
        if (vencedor) {
          status = 'Vencedor: ' + vencedor;
        } else {
          status = 'Próximo jogador: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
            <div className="game-board">
            <Tabuleiro />
                </div>
                    <div className="game-info">
                    <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
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