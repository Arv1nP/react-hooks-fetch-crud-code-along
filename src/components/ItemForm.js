import React, { useState } from "react";

function ItemForm({ handleAddedItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleName(e) {
    const nameValue = e.target.value;
    setName(nameValue);
  }

  function handleCategorySelect(e) {
    const categoryValue = e.target.value;
    setCategory(categoryValue);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };

    try {
      const response = await fetch("http://localhost:4000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      const newItem = await response.json();
      handleAddedItem(newItem);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={name} onChange={handleName} />
      </label>

      <label>
        Category:
        <select name="category" value={category} onChange={handleCategorySelect}>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
