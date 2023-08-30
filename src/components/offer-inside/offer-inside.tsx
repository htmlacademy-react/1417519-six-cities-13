import OfferInsideList from '../offer-inside-list/offer-inside-list';


type OfferInsideScreenProps = {
  actualGoods: string[];
}

function OfferInside ({actualGoods}: OfferInsideScreenProps):JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&rsquo;s inside</h2>
      <OfferInsideList actualGoods = {actualGoods}/>
    </div>
  );
}

export default OfferInside;
