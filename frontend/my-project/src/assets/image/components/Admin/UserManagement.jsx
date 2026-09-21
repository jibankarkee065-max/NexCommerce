
import React, { useState } from "react";

const users = [
  {
    _id:12345,
    name: "Manish basel",
    email: "manishbasel123@gmail.com",
    role: "admin",
  },
];

function UserManagement() {
  const [formDate, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer", // Default role
  });
  const handleChange = (e) => {
    setFormDate({
        ...formDate,
        [e.target.name]:e.target.value,
    });
  }
  
  const  handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDate);
    //Reset the form after submission
     setFormDate({
        name:"",
        email:"",
        password:"",
        role:"Customer",
     });
  };

  const handleRoleChange = (userId , newRole) => {
    console.log({id: userId, role:newRole})
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are  sure you want  to delete this user?")) {
        console.log("deleting user with ID", userId)
    }
  };

  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        User Management
      </h2>
      {/*Add New User From */}
      <div className="p-6 rounded-lg  mb-6 ">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" name="name" value={formDate.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={formDate.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" name="password" value={formDate.password} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select name="role" value={formDate.role} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="Customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add User</button>
        </form>
      </div>
      {/*User list manahement */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-ts uppercase text-gray-700">
                <tr>
                    <th className="py-3 px-4 ">Name</th>
                    <th className="py-3 px-4 ">Email</th>
                    <th className="py-3 px-4 ">Role</th>
                    <th className="py-3 px-4 ">Actions</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                            {user.name}
                        </td>
                        <td className="p-4 ">{user.email}</td>
                        <td className="p-4 ">
                            <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} className="p-2 border rounded">
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                        <td className="p-4 ">
                            <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500">Delete</button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
      </div>







    </div>
  );
}

export default UserManagement;