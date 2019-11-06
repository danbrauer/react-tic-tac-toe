import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
    return (
        <button className="square"
                onClick={props.onClick} >
            {props.value}
        </button>
    );
};

/*
from tutorial
To collect data from multiple children, or to have two child components communicate with
each other, you need to declare the shared state in their parent component instead. The
parent component can pass the state back down to the children by using props; this keeps
the child components in sync with each other and with the parent component.
*/
class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />);
    };

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
    };
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextIsX: true,
            stepNumber: 0,
            history: [{ squares: Array(9).fill(null) }],
        }
    }

    jumpTo = (stepNumber) => {
        this.setState({
            ...this.state,
            stepNumber,
            nextIsX: ((stepNumber % 2) === 0)
        })
    };

    // copied from tutorial....
    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    xOrO = () => this.state.nextIsX ? 'X' : 'O';

    handleClick = (i) => {
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || this.calculateWinner(squares)) return; // if already clicked or already won, do nothing
        squares[i] = this.xOrO();
        this.setState({
            history: [ ...history, { squares }],
            nextIsX: !this.state.nextIsX,
            stepNumber: history.length
        })
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner[current.squares];
        const status = winner ?
            `Winner: ${winner}!` :
            `Next player: ${this.xOrO()}`;

        const moves = history.map( (step, move) => {
            const desc = move ?
                `Go to move # ${move}` :
                "Go to game start";
            const moveKey = move ? move : 0;
            return (
                <li key={moveKey} >
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i)=>this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
