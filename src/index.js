import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// converting the React.Component to be a "function component", which
// is a simplified component that does not maintain its own state and
// whose function is just a render function
const Square = (props) => {
    return (
        <button className="square"
                onClick={props.onClick} >
            {props.value}
        </button>
    );
};
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square"
//                     onClick={() => this.props.onClick()} >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

/*
from tutorial
To collect data from multiple children, or to have two child components communicate with
each other, you need to declare the shared state in their parent component instead. The
parent component can pass the state back down to the children by using props; this keeps
the child components in sync with each other and with the parent component.
*/

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextIsX: true,
        }
    }

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
        const squares = this.state.squares.slice();
        if (squares[i]) return; // if already clicked, do nothing
        if (this.calculateWinner(squares)) return; // if game was won, do nothing

        squares[i] = this.xOrO();
        this.setState({
            squares,
            nextIsX: !this.state.nextIsX,
        })
    };

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />);
    };

    render() {
        const winner = this.calculateWinner(this.state.squares);
        const status = winner ?
            `Winner: ${winner}!` :
            `Next player: ${this.xOrO()}`;

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
    };
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
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
    <Game />,
    document.getElementById('root')
);
