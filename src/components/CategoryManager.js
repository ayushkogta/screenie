import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Plus, X } from 'lucide-react';

const CategoryManager = () => {
  const { categories, addCategory, deleteCategory } = useContext(GlobalContext);
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="category-manager">
      <h3 className="text-xl font-semibold mb-4">Manage Categories</h3>
      
      <form onSubmit={handleSubmit} className="category-input-group">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="category-input"
        />
        <button type="submit" className="add-category-btn">
          <Plus size={16} />
          ADD
        </button>
      </form>

      <div className="category-list">
        {categories.map((category) => (
          <div key={category} className="category-tag">
            {category}
            {category !== "Default" && (
              <button
                onClick={() => deleteCategory(category)}
                className="delete-category-btn"
                aria-label={`Delete ${category} category`}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;