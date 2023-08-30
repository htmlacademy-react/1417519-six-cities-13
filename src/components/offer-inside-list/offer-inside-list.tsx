type OfferInsideListScreenProps = {
  actualGoods: string[];
}
function OfferInsideList ({actualGoods}: OfferInsideListScreenProps):JSX.Element{
  return (
    <ul className="offer__inside-list">
      {actualGoods.map((good) => (
        <li className="offer__inside-item" key={good}>{good}</li>
      ))}
    </ul>

  );
}


export default OfferInsideList;
