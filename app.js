const form = document.querySelector("#food-form");
const result = document.querySelector("#result");

const junkSignals = [
  "fried",
  "deep fried",
  "sugar",
  "sugary",
  "syrup",
  "candy",
  "soda",
  "cream",
  "processed",
  "preservative",
  "chips",
  "fries",
  "burger",
  "pizza",
  "donut",
  "chocolate",
  "fast food",
];

const healthySignals = [
  "fresh",
  "fruit",
  "vegetable",
  "veggie",
  "grilled",
  "baked",
  "steamed",
  "boiled",
  "whole grain",
  "lean",
  "salad",
  "nuts",
  "beans",
  "lentils",
];

function findSignals(text, signals) {
  return signals.filter((signal) => text.includes(signal));
}

function classifyFood({ foodName, foodDescription, foodPreparation }) {
  const combinedText = `${foodName} ${foodDescription} ${foodPreparation}`.toLowerCase();
  const junkMatches = findSignals(combinedText, junkSignals);
  const healthyMatches = findSignals(combinedText, healthySignals);
  const isJunk = junkMatches.length > healthyMatches.length;

  return {
    isJunk,
    reasons: isJunk ? junkMatches : healthyMatches,
  };
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function renderResult(foodName, classification) {
  const safeFoodName = escapeHtml(foodName);
  const heading = classification.isJunk
    ? `${safeFoodName} looks like junk food.`
    : `${safeFoodName} does not look like junk food.`;
  const fallbackReason = classification.isJunk
    ? "It includes common junk-food clues such as heavy processing, frying, or added sugar."
    : "It includes healthier clues such as fresh ingredients or lighter cooking methods.";
  const reasonItems = classification.reasons.length
    ? classification.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")
    : `<li>${fallbackReason}</li>`;

  result.className = `result ${classification.isJunk ? "junk" : "not-junk"}`;
  result.innerHTML = `
    <h2>${heading}</h2>
    <p>This is a simple rule-based estimate, not medical advice.</p>
    <ul class="reason-list">${reasonItems}</ul>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const formData = new FormData(form);
  const food = {
    foodName: formData.get("foodName").trim(),
    foodDescription: formData.get("foodDescription").trim(),
    foodPreparation: formData.get("foodPreparation").trim(),
  };

  renderResult(food.foodName, classifyFood(food));
});
