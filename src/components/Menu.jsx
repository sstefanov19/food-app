import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";

const reuqestConfig = {
  method: "GET",
};

export default function Menu() {
  const {
    data: loadMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", reuqestConfig, []);

  if(error) {
    return  <Error title="Failed to fetch meals" message={error} />
  }

  if(isLoading){
    return <p className="center">Loading meals...</p>
  }
  

  return (
    <>
      <ul id="meals">
        {loadMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
