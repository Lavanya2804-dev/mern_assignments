function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 h-screen p-4">
      <h2 className="text-lg font-bold mb-4">
        Repositories
      </h2>

      <ul className="space-y-2">
        <li>Frontend</li>
        <li>Backend</li>
        <li>Portfolio</li>
      </ul>
    </div>
  );
}

export default Sidebar;