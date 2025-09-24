import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, search, sortField, page, pageSize]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const mapped = res.data.map((u) => ({
        id: u.id,
        firstName: u.name.split(" ")[0],
        lastName: u.name.split(" ").slice(1).join(" ") || "",
        email: u.email,
        department: u.company?.name || "General",
      }));
      setUsers(mapped);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  const applyFilters = () => {
    let data = [...users];
    if (search) {
      data = data.filter(
        (u) =>
          u.firstName.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.department.toLowerCase().includes(search.toLowerCase())
      );
    }
    data.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
    const start = (page - 1) * pageSize;
    setFilteredUsers(data.slice(start, start + pageSize));
  };

  const handleSave = async (form) => {
    if (!form.firstName || !form.email.includes("@")) {
      alert("Invalid details!");
      return;
    }

    if (editingUser) {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editingUser.id}`,
        form
      );
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...form } : u))
      );
    } else {
      await axios.post("https://jsonplaceholder.typicode.com/users", form);
      setUsers((prev) => [...prev, { id: prev.length + 1, ...form }]);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-5">User Management Dashboard</h1>

      <div className="space-x-5">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-2xl py-2 px-5 mb-5"
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border rounded-2xl py-2 px-5 mb-5"
        >
          <option value="id">ID</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="department">Department</option>
        </select>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded-2xl py-2 px-5 mb-5"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button
          className="border rounded-2xl py-2 px-5 mb-5"
          onClick={() => setShowForm(true)}
        >
          Add User
        </button>
      </div>

      <UserList
        users={filteredUsers}
        onEdit={(user) => {
          setEditingUser(user);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      <div className="mt-5 space-x-5">
        <button
          className="border rounded-2xl py-2 px-5"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span> {page} </span>
        <button
          className="border rounded-2xl py-2 px-5"
          disabled={page === pageSize}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        {showForm && (
          <UserForm
            user={editingUser}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
