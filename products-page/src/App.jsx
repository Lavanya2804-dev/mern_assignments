import Products from "./components/Products";
import './App.css';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Products
      </h1>

      <Products />
    </div>
  );
}

export default App;