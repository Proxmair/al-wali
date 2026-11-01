"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
}

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrdersTab = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/orders");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    const previousOrders = [...orders];

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, status }
          : order
      )
    );

    try {
      setUpdatingId(orderId);

      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);

      // rollback
      setOrders(previousOrders);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      setDeletingId(id);

      const response = await fetch("/api/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete order.");
      }

      setOrders((currentOrders) =>
        currentOrders.filter((order) => order._id !== id)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">
          Orders
        </h2>

        <p className="text-sm text-muted-foreground">
          Manage customer orders.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Order #
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Customer
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Total
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Payment
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>

                <th className="px-4 py-3 text-center text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading Orders...
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 font-medium">
                      {order.orderNumber}
                    </td>

                    <td className="px-4 py-3">
                      {order.customer.firstName}{" "}
                      {order.customer.lastName}
                    </td>

                    <td className="px-4 py-3">
                      ${order.total.toFixed(2)}
                    </td>

                    <td className="px-4 py-3">
                      {order.paymentMethod}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <select
                        className="rounded-md border px-2 py-1 text-sm"
                        value={order.status}
                        disabled={
                          updatingId === order._id
                        }
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        {ORDER_STATUSES.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600"
                          disabled={deletingId === order._id}
                          onClick={() => handleDeleteOrder(order._id)}
                          aria-label={`Delete order ${order.orderNumber}`}
                        >
                          {deletingId === order._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;
