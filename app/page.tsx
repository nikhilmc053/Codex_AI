type FoodItem = {
  name: string;
  category: "Junk" | "No Junk";
  description: string;
};

const foods: FoodItem[] = [
  {
    name: "Apple",
    category: "No Junk",
    description: "Fresh fruit with fiber and natural sweetness.",
  },
  {
    name: "Pizza",
    category: "Junk",
    description: "Often high in refined carbs, saturated fat, and sodium.",
  },
  {
    name: "Carrot Sticks",
    category: "No Junk",
    description: "Crunchy vegetables packed with vitamins.",
  },
  {
    name: "Potato Chips",
    category: "Junk",
    description: "A salty snack that is usually fried and calorie dense.",
  },
  {
    name: "Grilled Chicken Salad",
    category: "No Junk",
    description: "A balanced meal with lean protein and vegetables.",
  },
  {
    name: "Candy Bar",
    category: "Junk",
    description: "A sugary treat with limited nutritional value.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Food choices</p>
        <h1 id="page-title">Junk or No Junk?</h1>
        <p className="intro">
          Explore a simple list of everyday foods and learn whether each item is
          usually considered junk food or a healthier choice.
        </p>
      </section>

      <section className="food-grid" aria-label="Food list">
        {foods.map((food) => {
          const isJunk = food.category === "Junk";

          return (
            <article className="food-card" key={food.name}>
              <div>
                <h2>{food.name}</h2>
                <p>{food.description}</p>
              </div>
              <span className={isJunk ? "badge badge-junk" : "badge badge-healthy"}>
                {food.category}
              </span>
            </article>
          );
        })}
      </section>
    </main>
  );
}
