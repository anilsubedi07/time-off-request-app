"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    employee_id: "",
    department_id: "",
    start_date: "",
    end_date: "",
    request_type: "Paid Time Off",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.end_date < formData.start_date) {
      alert("End date must be on or after the start date.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://engaged-intersection-attachment-hostel.trycloudflare.com/webhook/time-off-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Request failed");
      }
  
      alert("Time-off request submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Could not submit the request.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Time-Off Request
          </h1>
          <p className="text-gray-600 mt-2">
            Complete the form below to submit your time-off request.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              placeholder="Example: 1003"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department ID
            </label>
            <input
              type="text"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              placeholder="Example: D002"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Request Type
            </label>
            <select
              name="request_type"
              value={formData.request_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
            >
              <option>Paid Time Off</option>
              <option>Sick Leave</option>
              <option>Unpaid Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Example: Family Event"
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800"
          >
            Submit Request
          </button>
        </form>
      </div>
    </main>
  );
}