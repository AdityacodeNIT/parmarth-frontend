import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MdVerifiedUser,
  MdPending,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdCheck,
  MdClose,
  MdDelete,
  MdVisibility,
} from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { userAPI } from "@/api/userAPI";
import { toast } from "sonner";

const ManageSellers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, seller: null });

  useEffect(() => {
    fetchSellers();
  }, [statusFilter, pagination.page, search]);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      if (search) {
        params.search = search;
      }

      const response = await userAPI.getAllSellers(params);
      setSellers(response.data.data.sellers);
      setPagination((prev) => ({
        ...prev,
        ...response.data.data.pagination,
      }));
    } catch (error) {
      console.error("Error fetching sellers:", error);
      toast.error("Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalChange = async (sellerId, approved) => {
    try {
      await userAPI.updateSellerApproval(sellerId, { approved });
      toast.success(approved ? "Seller approved successfully" : "Seller suspended");
      fetchSellers();
    } catch (error) {
      console.error("Error updating seller:", error);
      toast.error("Failed to update seller status");
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.seller) return;

    try {
      await userAPI.deleteSeller(deleteDialog.seller._id);
      toast.success("Seller deleted successfully");
      setDeleteDialog({ open: false, seller: null });
      fetchSellers();
    } catch (error) {
      console.error("Error deleting seller:", error);
      toast.error("Failed to delete seller");
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
    if (value !== "all") {
      setSearchParams({ status: value });
    } else {
      setSearchParams({});
    }
  };

  const getStatusBadge = (approved) => {
    return approved ? (
      <Badge className="bg-green-500">
        <MdVerifiedUser className="mr-1" />
        Approved
      </Badge>
    ) : (
      <Badge variant="secondary">
        <MdPending className="mr-1" />
        Pending
      </Badge>
    );
  };

  if (loading && sellers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sellers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {sellers.filter((s) => s.approved).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {sellers.filter((s) => !s.approved).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <MdVerifiedUser className="text-2xl" />
              Seller Management
            </CardTitle>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search sellers..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-full sm:w-40">
                  <MdFilterList className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {sellers.length === 0 ? (
            <div className="text-center py-12">
              <MdVerifiedUser className="text-6xl text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No sellers found</p>
              <p className="text-sm text-muted-foreground">
                {search
                  ? "Try adjusting your search"
                  : "Sellers will appear here once they register"}
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seller Details</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>GST Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sellers.map((seller) => (
                    <TableRow key={seller._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{seller.fullName}</p>
                          <p className="text-sm text-muted-foreground">{seller.email}</p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="font-medium">{seller.businessName || "N/A"}</p>
                      </TableCell>

                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {seller.gstNumber || "N/A"}
                        </code>
                      </TableCell>

                      <TableCell>{getStatusBadge(seller.approved)}</TableCell>

                      <TableCell>
                        <p className="text-sm">
                          {new Date(seller.createdAt).toLocaleDateString()}
                        </p>
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MdMoreVert />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!seller.approved ? (
                              <DropdownMenuItem
                                onClick={() => handleApprovalChange(seller._id, true)}
                                className="text-green-600"
                              >
                                <MdCheck className="mr-2" />
                                Approve Seller
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleApprovalChange(seller._id, false)}
                                className="text-orange-600"
                              >
                                <MdClose className="mr-2" />
                                Suspend Seller
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => setDeleteDialog({ open: true, seller })}
                              className="text-red-600"
                            >
                              <MdDelete className="mr-2" />
                              Delete Seller
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                    {pagination.total} sellers
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                      }
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                      }
                      disabled={pagination.page === pagination.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, seller: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the seller account for{" "}
              <strong>{deleteDialog.seller?.fullName}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageSellers;
