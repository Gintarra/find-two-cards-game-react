import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
  const [getDeck, setDeck] = useState([]);
  const [count, setCount] = useState(0);
  let [openedCard, setOpenedCard] = useState([]);
  let [openedIndexes, setOpenedIndexes] = useState([]);
  let all = [];
  let open = [];

  useEffect(() => {
    getData();
  }, [])

  function getData() {
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
        .then(res => res.json())
        .then(data => {
          const arrayD = data.cards;
          arrayD.map((x, i) => {
            x.reverse = "false";
            x.id = i
          });
          setDeck(arrayD)
        })
  }

  function pickedCard(card, index) {
    let n = count;
    n++;
    setCount(count + 1);

    all = [...getDeck];
    card.reverse = "true";
    all.splice(index, 1, card)
    setDeck(all);
    open = [...openedCard, card];
    setOpenedCard([...openedCard, card])

    if (n === 2) {
      if (open[0].code[0] === open[1].code[0] && (open[0].code[1].includes("H") || open[1].code[1].includes("H")) &&
          (open[0].code[1].includes("D") || open[1].code[1].includes("D"))) {
        console.log("yess, sutampa, raudonos")
        setOpenedIndexes([...openedIndexes, open[0].id, open[1].id])
        n = 0;
        setCount(n);
        setOpenedCard([])
      } else if (open[0].code[0] === open[1].code[0] && (open[0].code[1].includes("S") || open[1].code[1].includes("S")) &&
          (open[0].code[1].includes("C") || open[1].code[1].includes("C"))) {
        console.log("yess, sutampa, juodos")
        setOpenedIndexes([...openedIndexes, open[0].id, open[1].id])
        n = 0;
        setCount(n);
        setOpenedCard([])
      } else {
        n = 0;
        setCount(n);
        setOpenedCard([])
        all = [...getDeck];
        setTimeout(() => {
          all.map((item, i) => openedIndexes.includes(i) ? item.reverse = "true" : item.reverse = "false")
          setDeck(all);
        }, 1000)

        console.log(all, "opened")
      }
    }
  }

  return (
      <div className="backColor ">
        <div className="d-flex wrap justify-center">
          {getDeck.map((card, index) => <div onClick={() => pickedCard(card, index)} key={index}><img
              className="cardFromDeck"
              src={card.reverse === "false" ? 'http://www.meulemans.me/Images/Back1.png' : card.image}
              alt=""/>
          </div>)}
        </div>
      </div>
  );
}

export default App;
