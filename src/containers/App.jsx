import {useEffect, useState} from "react";
import { Smyley } from "../components/Smyley.jsx";
import { ResultVote } from "../components/ResultVote.jsx";
import smyley1 from '../assets/smyley1.jpg';
import smyley2 from '../assets/smyley2.jpg';
import smyley3 from '../assets/smyley3.jpg';
import smyley4 from '../assets/smyley4.jpg';
import smyley5 from '../assets/smyley5.jpg';

export function App () {
    const [winner, setWinner] = useState([]);
    const [smileys, setSmiley] = useState([
                    { id: 1, src: smyley1, vote: 0 },
                    { id: 2, src: smyley2, vote: 0 },
                    { id: 3, src: smyley3, vote: 0 },
                    { id: 4, src: smyley4, vote: 0 },
                    { id: 5, src: smyley5, vote: 0 },
    ])

    useEffect(() => {
        const currentWinner = localStorage.getItem('winner');
        setWinner(currentWinner === null ? [] : JSON.parse(currentWinner));
    }, []);

    const setVote = (smileyId) => {
        setSmiley(prevState => {
            const updatedSmileys = prevState.map((smiley) => {
                if (smiley.id === smileyId) {
                    return {
                        id: smiley.id,
                        src: smiley.src,
                        vote: smiley.vote + 1,
                    };
                } else {
                    return smiley;
                }
            });
            return updatedSmileys;
        });
    };

    const getWinner = () => {
        const maxVote = Math.max(...smileys.map((smiley) => smiley.vote));
        if (maxVote === 0) {
            alert('None of the smileys received vote');
            return;
        }
        const winner = smileys.filter((smiley) => smiley.vote === maxVote);
        localStorage.setItem('winner', JSON.stringify (winner))
        setWinner(winner);
    };

    const resetVote = () => {
        localStorage.removeItem('winner');
        setWinner([]);
        setSmiley((prevState) => {
            const updatedVote = prevState.map((smiley) => ({...smiley, vote: 0}));
            return updatedVote;
        });
    };

    return (
        <div className="container">
            <h1>Vote for the best smiley face</h1>
            <ul className="smiley__list">
                {smileys.map((smiley) => (
                    <Smyley
                        key={smiley.id}
                        setVote={() => setVote(smiley.id)}
                        smiley={smiley}
                        src={smiley.src}
                    />
                ))}
            </ul>
            <ResultVote
                winner={winner}
                setWinner = {setWinner}
                getWinner={getWinner}
                resetVote={resetVote}
            />
        </div>
    );

}
export default App;
