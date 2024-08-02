import { formatedPrice } from "../format";

export default function MealItem({ meal }) {
  return (
    <>
      <li className="meal-item">
        <article>
          <img src={`http://localhost:3000/${meal.image}`} alt="" />
          <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">
              {formatedPrice.format(meal.price)}
            </p>
            <p className="meal-item-description">{meal.description}</p>
          </div>
          <p className="meal-item-actions">
            <button>Add to cart</button>
          </p>
        </article>
      </li>
    </>
  );
}
