import React from "react";
import { FaChartGantt } from "react-icons/fa6";

function Reports() {
  const topSelling = [
    { name: "Wireless Earphones", price: 89, units: 1250, percent: 18, color: "bg-red-100 text-red-500",image:"https://images.unsplash.com/photo-1627377948281-6b67fd9eda5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lyZWxlc3MlMjBlYXJwaG9uZXN8ZW58MHx8MHx8fDA%3D" },
    { name: "Gaming Joy Stick", price: 49, units: 5420, percent: 32, color: "bg-red-100 text-red-500",image:"https://images.unsplash.com/photo-1570626450053-adb4c2fcb62e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FtaW5nJTIwSm95JTIwU3RpY2t8ZW58MHx8MHx8fDA%3D" },
    { name: "Smart Watch Pro", price: 98, units: 862, percent: 22, color: "bg-blue-100 text-blue-500",image:"https://images.unsplash.com/photo-1676554565987-524692127b1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U21hcnQlMjBXYXRjaCUyMFByb3xlbnwwfHwwfHx8MA%3D%3D" },
    { name: "USB-C Fast Charger", price: 35, units: 3200, percent: 28, color: "bg-green-100 text-green-500",image:"https://images.unsplash.com/photo-1762117314602-59c22d8f6eb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VVNCLUMlMjBGYXN0JTIwQ2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Portable Bluetooth Speaker", price: 65, units: 2890, percent: 25, color: "bg-yellow-100 text-yellow-500",image:"https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9ydGFibGUlMjBCbHVldG9vdGglMjBTcGVha2VyfGVufDB8fDB8fHww" },
  ];

  const lowStock = [
    { name: "Wireless Headphones", id: "#554433", stock: 6,image:"https://images.unsplash.com/photo-1627377948281-6b67fd9eda5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lyZWxlc3MlMjBlYXJwaG9uZXN8ZW58MHx8MHx8fDA%3D" },
    { name: "USB-C Cable Pack", id: "#887766", stock: 9 ,image:"https://plus.unsplash.com/premium_photo-1761241878747-61772b4e23c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VVNCLUMlMjBDYWJsZSUyMFBhY2t8ZW58MHx8MHx8fDA%3D"},
    { name: "Phone Screen Protector", id: "#332211", stock: 3,image:"https://images.unsplash.com/photo-1619465301166-b8804949980c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGhvbmUlMjBTY3JlZW4lMjBQcm90ZWN0b3J8ZW58MHx8MHx8fDA%3D" },
    { name: "Portable Charger 20000mAh", id: "#998877", stock: 7,image:"https://images.unsplash.com/photo-1564286026507-03875c383229?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9ydGFibGUlMjBDaGFyZ2VyJTIwMjAwMDBtQWh8ZW58MHx8MHx8fDA%3D" },
    { name: "Mechanical Keyboard RGB", id: "#665544", stock: 2,image:"https://images.unsplash.com/photo-1646505262769-db0b272acb7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWVjaGFuaWNhbCUyMEtleWJvYXJkJTIwUkdCfGVufDB8fDB8fHww" },
  ];

  const recentSales = [
    { name: "MacBook Pro 16\"", category: "Computers", price: 2499, status: "Completed", color: "bg-green-100 text-green-600",image:"https://images.unsplash.com/photo-1639087595550-e9770a85f8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFjQm9vayUyMFBybyUyMDE2fGVufDB8fDB8fHww" },
    { name: "AirPods Pro Max", category: "Audio", price: 549, status: "Processing", color: "bg-orange-100 text-orange-500",image:"https://images.unsplash.com/photo-1628116709703-c1c9ad550d36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWlyUG9kcyUyMFBybyUyME1heHxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "iPad Air 11\"", category: "Tablets", price: 799, status: "Completed", color: "bg-green-100 text-green-600",image:"https://images.unsplash.com/photo-1640721952964-d9547dfd6cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aVBhZCUyMEFpciUyMDExfGVufDB8fDB8fHww" },
    { name: "Apple Watch Ultra", category: "Wearables", price: 799, status: "Pending", color: "bg-yellow-100 text-yellow-600",image:"https://images.unsplash.com/photo-1713056878930-c5604da9acfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwbGUlMjBXYXRjaCUyMFVsdHJhfGVufDB8fDB8fHww" },
    { name: "Magic Keyboard", category: "Accessories", price: 299, status: "Cancelled", color: "bg-red-100 text-red-500",image:"https://images.unsplash.com/photo-1654426542353-ba54b8f1752b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWFnaWMlMjBLZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D" },
  ];

  return (
    <>
      {/* heading section */}
      <div className="py-4">
        <h2 className="text-2xl font-semibold">Reports</h2>
        <h4 className="">Your main content goes here…</h4>
      </div>

      {/* total cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-4">
        {/* total sales */}
        <div className="p-4 border border-[#FCEFEB] rounded-lg bg-[#FCEFEB] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#E66239] rounded-lg">
              <FaChartGantt />
            </div>
            <div>
              <h2 className="pb-4">Total Sales</h2>
              <h2 className="font-bold text-2xl">$25,000</h2>
              <p className="text-[#E66239] text-sm">+5% since last month</p>
            </div>
          </div>
        </div>

        {/* Total purchase */}
        <div className="p-4 border border-[#E5F9ED] rounded-lg bg-[#E5F9ED] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#00C951] rounded-lg">
              <FaChartGantt />
            </div>
            <div>
              <h2 className="pb-4">Total Purchase</h2>
              <h2 className="font-bold text-2xl">$18,000</h2>
              <p className="text-[#00C951] text-sm">+22% since last month</p>
            </div>
          </div>
        </div>

        {/* Total expensis */}
        <div className="p-4 border border-[#E5F8FB] rounded-lg bg-[#E5F8FB] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#00B8DB] rounded-lg">
              <FaChartGantt />
            </div>
            <div>
              <h2 className="pb-4">Total Expenses</h2>
              <h2 className="font-bold text-2xl">$9,000</h2>
              <p className="text-[#00B8DB] text-sm">+10% since last month</p>
            </div>
          </div>
        </div>

        {/* Invoice Due */}
        <div className="p-4 border border-[#FDF7E5] rounded-lg bg-[#FDF7E5] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#F0B100] rounded-lg">
              <FaChartGantt />
            </div>
            <div>
              <h2 className="pb-4">Invoice Due</h2>
              <h2 className="font-bold text-2xl">$25,000</h2>
              <p className="text-[#F0B100] text-sm">+35% since last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">

      {/* Top Selling */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Top Selling Products</h2>
          <button className="text-sm border px-3 py-1 rounded">Today</button>
        </div>

        {topSelling.map((item, i) => (
          <div key={i} className="flex justify-between items-center py-3 border-b last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded">
                <img className="w-full h-full object-cover" src={item.image} alt="" />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price} • {item.units} Units</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${item.color}`}>
              {item.percent}%
            </span>
          </div>
        ))}
      </div>

      {/* Low Stock */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Low Stock Products</h2>
          <button className="text-sm text-red-500">View All</button>
        </div>

        {lowStock.map((item, i) => (
          <div key={i} className="flex justify-between items-center py-3 border-b last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded">
                 <img className="w-full h-full object-cover" src={item.image} alt="" />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">ID: {item.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-red-500 font-semibold">{item.stock.toString().padStart(2, "0")}</p>
              <p className="text-xs text-gray-500">In Stock</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Sales */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Recent Sales</h2>
          <button className="text-sm border px-3 py-1 rounded">Weekly</button>
        </div>

        {recentSales.map((item, i) => (
          <div key={i} className="flex justify-between items-center py-3 border-b last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded">
                 <img className="w-full h-full object-cover" src={item.image} alt="" />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category} • ${item.price}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${item.color}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}

export default Reports;
