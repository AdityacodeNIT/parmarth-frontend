import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaTrashAlt, FaEye } from "react-icons/fa";
import { userAPI } from "@/api/userAPI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SellerApprovalPanel = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Filters & Pagination
  const [status, setStatus] = useState("pending"); // approved | pending
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const limit = 10;

  /* ───────── Fetch Sellers ───────── */
  const fetchSellers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await userAPI.getAllSellers({
        status,
        search,
        page,
        limit,
      });
      console.log(res.data);

      setSellers(res.data?.data?.sellers || []);
      setPagination(res.data?.data?.pagination || null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [status, search, page]);

  /* ───────── Approve / Revoke ───────── */
  const handleApproval = async (sellerId, approved) => {
    try {
      await userAPI.updateSellerApproval(sellerId, { approved });
      fetchSellers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update seller status");
    }
  };

  /* ───────── Delete Seller ───────── */
  const handleDelete = async (sellerId) => {
    if (!window.confirm("This action is irreversible. Continue?")) return;
    try {
      await userAPI.deleteSeller(sellerId);
      fetchSellers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete seller");
    }
  };

  /* ───────── View Seller ───────── */
  const viewSellerDetails = async (sellerId) => {
    try {
      const res = await userAPI.getSellerById(sellerId);
      setSelectedSeller(res.data.data);
    } catch {
      alert("Failed to load seller details");
    }
  };

  /* ───────── UI ───────── */
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">
        Seller Approval Dashboard
      </h2>

      {/* 🔍 Filters */}
      <div className="mb-4 flex gap-3">
        <Input
          placeholder="Search seller..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && sellers.length === 0 && (
        <p className="text-center text-muted-foreground">No sellers found.</p>
      )}

      {!loading && sellers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Business</th>
                <th className="p-3">GST</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id} className="border-b hover:bg-muted/40">
                  <td className="p-3 font-medium">{seller.fullName}</td>
                  <td className="p-3">{seller.email}</td>
                  <td className="p-3">{seller.businessName}</td>
                  <td className="p-3">{seller.gstNumber}</td>
                  <td className="p-3">
                    <Badge
                      variant={seller.approved ? "success" : "secondary"}
                    >
                      {seller.approved ? "Approved" : "Pending"}
                    </Badge>
                  </td>

                  <td className="p-3 flex justify-center gap-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => viewSellerDetails(seller._id)}
                    >
                      <FaEye />
                    </Button>

                    {seller.approved ? (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleApproval(seller._id, false)
                        }
                      >
                        <FaTimes className="text-yellow-600" />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleApproval(seller._id, true)
                        }
                      >
                        <FaCheck className="text-green-600" />
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(seller._id)}
                    >
                      <FaTrashAlt className="text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📄 Pagination */}
      {pagination && (
        <div className="mt-4 flex justify-between items-center text-sm">
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* ───────── Seller Details Modal ───────── */}
      <AnimatePresence>
        {selectedSeller && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-xl bg-card p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="mb-4 text-xl font-semibold">Seller Details</h3>

              <div className="space-y-2 text-sm">
                <p><b>Name:</b> {selectedSeller.fullName}</p>
                <p><b>Email:</b> {selectedSeller.email}</p>
                <p><b>Business:</b> {selectedSeller.businessName}</p>
                <p><b>GST:</b> {selectedSeller.gstNumber}</p>
                <p><b>Status:</b> {selectedSeller.approved ? "Approved" : "Pending"}</p>
              </div>

              <Button className="mt-5 w-full" onClick={() => setSelectedSeller(null)}>
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerApprovalPanel;
