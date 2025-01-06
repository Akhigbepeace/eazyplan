import React from "react";
import MobileNav from "../components/layouts/mobile-nav";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back, [User Name]!
        </h1>
        <p className="text-gray-600">Here’s your dashboard overview.</p>
      </header>

      <main className="flex-grow px-6 py-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Goals Achieved
            </h2>
            <p className="text-3xl font-bold text-blue-600">8</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Pending Tasks
            </h2>
            <p className="text-3xl font-bold text-yellow-500">12</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Total Progress
            </h2>
            <p className="text-3xl font-bold text-green-500">76%</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>
          <div className="mt-4 space-y-4">
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Completed Task: "Plan Weekly Budget"
                </h3>
                <p className="text-sm text-gray-600">Yesterday at 3:00 PM</p>
              </div>
              <span className="text-green-500 font-bold">+10 Points</span>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
};

export default Dashboard;
