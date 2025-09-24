import React, { useState, useEffect } from "react";
export default function UserForm({ user, onSave, onCancel }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  return (
    <div className="m-10">
      <h2 className="text-2xl font-bold">{user ? "Edit User" : "Add User"}</h2>
      <div className="mt-5 space-x-5">
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="border rounded-2xl py-2 px-5 mb-5"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="border rounded-2xl py-2 px-5 mb-5"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border rounded-2xl py-2 px-5 mb-5"
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="border rounded-2xl py-2 px-5 mb-5"
        />
      </div>
      <div className="space-x-5">
        <button
          className="border rounded-2xl py-2 px-5 mb-5"
          onClick={() => onSave(form)}
        >
          {user ? "Update" : "Save"}
        </button>
        <button
          className="border rounded-2xl py-2 px-5 mb-5"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
