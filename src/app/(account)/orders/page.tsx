"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  ChevronRight,
} from "lucide-react";

/* ── Demo data ── */
const orders = [
  {
    id: "#ORD-10245",
    date: "27 Apr 2026",
    status: "Delivered",
    total: "$128.00",
    items: 3,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "#ORD-10212",
    date: "22 Apr 2026",
    status: "Shipped",
    total: "$86.00",
    items: 2,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "#ORD-10198",
    date: "18 Apr 2026",
    status: "Processing",
    total: "$42.00",
    items: 1,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
  },
];

/* ── Status UI ── */
const getStatusUI = (status: string) => {
  switch (status) {
    case "Delivered":
      return {
        icon: <CheckCircle2 size={16} />,
        style: "bg-primary/10 text-primary",
      };
    case "Shipped":
      return {
        icon: <Truck size={16} />,
        style: "bg-secondary/20 text-secondary",
      };
    default:
      return {
        icon: <Clock3 size={16} />,
        style: "bg-accent/10 text-accent",
      };
  }
};

/* ── Progress ── */
const getProgress = (status: string) => {
  switch (status) {
    case "Delivered":
      return 3;
    case "Shipped":
      return 2;
    default:
      return 1;
  }
};

export default function MyOrdersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 sm:px-6 lg:px-8 py-10">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto mb-10">
        <div className="rounded-3xl p-6 sm:p-8 bg-secondary-background
  border border-border
  shadow-[inset_0_1px_0px_rgba(255,255,255,0.6),inset_0_-2px_6px_rgba(0,0,0,0.06)]
  backdrop-blur-md">
        {/* <div className="rounded-3xl p-6 sm:p-8 border border-border bg-secondary-background"> */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-text-muted">
                Dashboard
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                My Orders
              </h1>

              <p className="text-sm mt-2 text-text-muted">
                Track, manage, and review all your recent purchases.
              </p>
            </div>

            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-card border border-border">
              <Package className="text-primary" size={20} />
              <div>
                <p className="text-sm font-semibold">{orders.length} Orders</p>
                <p className="text-xs text-text-muted">
                  Total purchase history
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ORDERS */}
      <section className="max-w-6xl mx-auto space-y-6">

        {orders.map((order) => {
          const statusUI = getStatusUI(order.status);
          const progress = getProgress(order.status);

          return (
            <div
              key={order.id}
              className="group bg-card border border-border rounded-3xl overflow-hidden transition hover:shadow-lg"
            >

              <div className="p-5 flex flex-col md:flex-row gap-5 md:items-center">

                {/* IMAGE */}
                <div className="relative w-full md:w-28 h-40 md:h-28 rounded-2xl overflow-hidden">
                  <Image
                    src={order.image}
                    alt={order.id}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1">

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                    <div>
                      <h2 className="text-lg font-semibold">
                        Order {order.id}
                      </h2>

                      <p className="text-sm text-text-muted mt-1">
                        Placed on {order.date}
                      </p>

                      <div className="flex gap-4 text-sm mt-2">
                        <span>
                          <strong>{order.items}</strong> Items
                        </span>
                        <span>
                          Total: <strong>{order.total}</strong>
                        </span>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusUI.style}`}
                    >
                      {statusUI.icon}
                      {order.status}
                    </div>

                  </div>
                </div>

                {/* CTA */}
                {/* <Link
                  href={`/orders/${order.id.replace("#", "")}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium bg-gradient-primary text-primary-foreground transition hover:opacity-90"
                >
                  View Details
                  <ChevronRight size={18} />
                </Link> */}

              </div>

              {/*  PROFESSIONAL PROGRESS BAR */}
              <div className="px-5 pb-5">

                {/* Base line */}
                <div className="relative">

                  <div className="absolute top-2 left-0 w-full h-[2px] bg-border" />

                  {/* Active line */}
                  <div
                    className="absolute top-2 left-0 h-[2px] bg-primary transition-all duration-500"
                    style={{
                      width:
                        progress === 1
                          ? "0%"
                          : progress === 2
                          ? "50%"
                          : "100%",
                    }}
                  />

                  {/* Steps */}
                  <div className="flex justify-between relative">

                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all
                        ${
                          progress >= 1
                            ? "bg-primary border-primary"
                            : "bg-card border-border"
                        }`}
                      />
                      <p className="text-[10px] mt-2 text-text-muted">
                        Processing
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all
                        ${
                          progress >= 2
                            ? "bg-primary border-primary"
                            : "bg-card border-border"
                        }`}
                      />
                      <p className="text-[10px] mt-2 text-text-muted">
                        Shipped
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all
                        ${
                          progress >= 3
                            ? "bg-primary border-primary"
                            : "bg-card border-border"
                        }`}
                      />
                      <p className="text-[10px] mt-2 text-text-muted">
                        Delivered
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          );
        })}

      </section>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <div className="text-center py-20">
          <Package className="mx-auto mb-4 text-text-muted" size={40} />
          <h2 className="text-xl font-semibold">No Orders Yet</h2>
          <p className="text-text-muted">
            Start shopping to see your orders here.
          </p>
        </div>
      )}

    </main>
  );
}