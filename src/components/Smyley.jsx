export function Smyley({ smiley, setVote }) {
        return (
            <li className="smiley__item">
                <img src={smiley.src} alt="Smiley" onClick={() => setVote(smiley.id)} />
                <span>Vote: {smiley.vote}</span>
            </li>
        );

}

