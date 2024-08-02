import { useEffect , useState } from "react"
import MealItem from "./MealItem";

export default function Menu() {

    const [loadMeals , setLoadMeals] = useState([]);
   
    useEffect(() => {
        async function fetchData() {
            const result = await fetch('http://localhost:3000/meals')
            
            if(!result.ok){
                throw new Error('Failed to fetch data');
            }
            
            const data = await result.json();
            setLoadMeals(data);
            
        }
        fetchData();
    }, [])


    return (
        <>
        <ul id="meals">
           {loadMeals.map((meal) => (
              <MealItem key={meal.id} meal={meal} />
           ))}
        </ul>
        </>
    )
}