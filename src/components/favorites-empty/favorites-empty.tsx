import FavoriteStatus from '../favorites-status/favorites-status';

function FavoriteLocEmpty ():JSX.Element {

  return (
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <FavoriteStatus/>
        </section>
      </div>
    </main>
  );
}

export default FavoriteLocEmpty;
