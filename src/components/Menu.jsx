import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const reuqestConfig = {
  method: "GET",
};

export default function Menu() {
  const {
    data: loadMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", reuqestConfig, []);


  if(isLoading){
    return <p>Loading meals...</p>
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
