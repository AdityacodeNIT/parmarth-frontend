import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Userlist = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/userList`,
          { withCredentials: true }
        );
        console.log(response.data);
        setUserData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const deleteData = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/users/deleteUser/${id}`,
        { withCredentials: true }
      );

      setUserData((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const promoteUser = async (id, newRole) => {
    if (!window.confirm("Are you sure you want to update this user's role?")) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/updateUserPost/${id}`,
        { role: newRole },
        { withCredentials: true }
      );

      setUserData((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role: res.data.role } : u
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {userData.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>

                {/* ROLE */}
                <TableCell>
                  {user.role === "superadmin" ? (
                    <Badge variant="secondary">{user.role}</Badge>
                  ) : (
                    <Select
                      value={user.role}
                      onValueChange={(value) =>
                        promoteUser(user._id, value)
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right">
                  {user.role !== "superadmin" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteData(user._id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Userlist;
