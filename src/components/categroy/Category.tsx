import { categories } from "../../utils/categories";
import "./Category.css";

const Category = ({ sc }) => {
  return (
    <section className="category-container">
      {categories.map(({ categoryName, color }) => (
        <div
          key={categoryName}
          onClick={() => sc(categoryName)}
          style={{ backgroundColor: color }}
        >
          <span>{categoryName}</span>
        </div>
      ))}
    </section>
  );
};

export default Category;
