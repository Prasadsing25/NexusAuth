const Dashboard = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className="text-center bg-white p-10 rounded shadow-xl">
      <h1 className="text-3xl font-bold text-green-600">Welcome, {user}! 👋</h1>
      <p className="mt-2 text-gray-600">You are successfully logged into the MERN app.</p>
      <button onClick={handleLogout} className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
};

export default Dashboard;