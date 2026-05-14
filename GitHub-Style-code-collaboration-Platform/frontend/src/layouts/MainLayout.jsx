import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;