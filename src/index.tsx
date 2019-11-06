import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareVal = 'X' | 'O' | null;
interface SquaresArray {
    squares: SquareVal[]
}

interface GameState {
    nextIsX: boolean,
    stepNumber: number,
    history: SquaresArray[]
}

interface BoardProps {
    squares: SquareVal[],
    onClick: (i: number) => void
}

interface SquareProps {
    value: SquareVal,
    onClick: (i: number) => void
}

const Square = (props: SquareProps) => {
    return (
        <button className="square"
                // @ts-ignore // not sure how to type this correctly......
                onClick={props.onClick} >
            {props.value}
        </button>
    );
};


class Board extends React.Component<BoardProps> {

    renderSquare(i: number) {
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


// marking the props type as 'any' because I don't know what it's supposed
// to be and we don't actually use it for anything so don't care
class Game extends React.Component<any,GameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            nextIsX: true,
            stepNumber: 0,
            history: [{ squares: Array(9).fill(null) }],
        }
    }

    jumpTo = (stepNumber: number) => {
        this.setState({
            ...this.state,
            stepNumber,
            nextIsX: ((stepNumber % 2) === 0)
        })
    };

    // copied from tutorial....
    calculateWinner = (squares: SquareVal[]) => {
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

    xOrO = (): SquareVal => this.state.nextIsX ? 'X' : 'O';

    handleClick = (i: number) => {
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
        const winner = this.calculateWinner(current.squares);
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
                        onClick={(i: number)=>this.handleClick(i)}
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

export {
    Square
}