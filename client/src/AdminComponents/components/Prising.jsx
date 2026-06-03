import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const Pricing = () => {
  const [open, setOpen] = useState(false);
  const [planModal, setPlanModal] = useState(false);

  const [pricing, setPricing] = useState(null);
  const [plans, setPlans] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;


  const [isEditPlan, setIsEditPlan] = useState(false);
  const [editPlanId, setEditPlanId] = useState(null);

  const [sectionData, setSectionData] = useState({
    heading: "",
    subheading: "",
    para: "",
  });

  const [planData, setPlanData] = useState({
    levels: "",
    prize: "",
    PrizePerdays: "",
    Description: "",
  });

  //FETCH
  const fetchPricing = async () => {
    try {
      const res = await axios.get(`${base_url}/pricing/`);
      setPricing(res.data);
      setPlans(res.data.plans || []);

      setSectionData({
        heading: res.data.heading || "",
        subheading: res.data.subheading || "",
        para: res.data.para || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  // SECTION
  const handleSectionSubmit = async (e) => {
    e.preventDefault();

    try {
      if (pricing?.heading) {
        await axios.put(
          `${base_url}/pricing/update-service/1`,
          sectionData,
        );
        toast("Updated Successfully");
      } else {
        await axios.post(`${base_url}/pricing/create`, {
          ...sectionData,
          plans: [],
        });
        toast("Created Successfully");
      }

      setOpen(false);
      fetchPricing();
    } catch (err) {
      console.error(err);
    }
  };

  //  PLAN
  const handlePlanSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditPlan) {
        await axios.put(
          `${base_url}/pricing/update-plan/${editPlanId}`,
          planData,
        );
        toast("Plan Updated");
      } else {
        await axios.post(
          `${base_url}/pricing/add-plan`,
          planData,
        );
        toast("Plan Added");
      }

      setPlanModal(false);
      setIsEditPlan(false);
      setPlanData({
        levels: "",
        prize: "",
        PrizePerdays: "",
        Description: "",
      });

      fetchPricing();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlan = async (id) => {
    await axios.delete(`${base_url}/pricing/delete-plan/${id}`);
    fetchPricing();
  };

  const handleEditPlan = (plan, id) => {
    setPlanModal(true);
    setIsEditPlan(true);
    setEditPlanId(id);

    setPlanData({
      levels: plan.levels,
      prize: plan.prize,
      PrizePerdays: plan.PrizePerdays,
      Description: plan.Description,
    });
  };

  return (
    <div className="min-h-screen ">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Pricing Section</h1>
          <p className="text-gray-500 text-sm">Manage your inventory items</p>
        </div>

        <div>
          <button
            onClick={() => setOpen(true)}
            className="bg-[#C45330] text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Edit Section
          </button>
        </div>
      </div>

      {/* SECTION DATA */}
      {pricing && (
        <div className="mb-6">
          {/* TABLE */}
          <table className="w-full bg-white shadow rounded  text-sm">
            <thead className="text-gray-600">
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Heading</th>
                <th className="p-3 text-left">Sub-heading</th>
                <th className="p-3 text-left">Paragraph</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-3">{pricing.heading}</td>
                <td className="p-3">{pricing.subheading}</td>
                <td className="p-3">{pricing.para}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ADD PLAN */}
      <div className="flex justify-between my-6">
        <div>
          <h1 className="text-2xl font-semibold">Pricing Plan</h1>
          <p className="text-gray-500 text-sm">Manage pricing items</p>
        </div>

        <div>
          <button
            onClick={() => {
              setPlanModal(true);
              setIsEditPlan(false);
            }}
            className="bg-[#C45330] text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Add Plan
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-600 ">
            <th className="p-3 text-left">Level</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{plan.levels}</td>
              <td className="p-3">{plan.prize}</td>
              <td className="p-3">{plan.PrizePerdays}</td>
              <td className="p-3">{plan.Description}</td>

              <td className="flex gap-3 p-3">
                <FiEdit
                  onClick={() => handleEditPlan(plan, plan.id)}
                  className="cursor-pointer"
                />
                <FiTrash2
                  onClick={() => handleDeletePlan(plan.id)}
                  className="cursor-pointer text-red-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SECTION MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-lg">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">Pricing Plan</h1>
              <p className="text-gray-500 text-sm">Manage your FAQ items</p>
            </div>
            <form onSubmit={handleSectionSubmit} className="space-y-3">
              <input
                placeholder="Heading"
                value={sectionData.heading}
                onChange={(e) =>
                  setSectionData({ ...sectionData, heading: e.target.value })
                }
                className="w-full border p-2"
              />

              <input
                placeholder="Subheading"
                value={sectionData.subheading}
                onChange={(e) =>
                  setSectionData({ ...sectionData, subheading: e.target.value })
                }
                className="w-full border p-2"
              />

              <textarea
                placeholder="Para"
                value={sectionData.para}
                onChange={(e) =>
                  setSectionData({ ...sectionData, para: e.target.value })
                }
                className="w-full border p-2"
              />
              <div className="flex gap-2 justify-end items-center">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button className="bg-[#C45330] text-white px-4 py-2 rounded cursor-pointer">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PLAN MODAL */}
      {planModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 w-lg rounded-2xl">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">Pricing Plan</h1>
              <p className="text-gray-500 text-sm">Manage your FAQ items</p>
            </div>
            <form onSubmit={handlePlanSubmit} className="space-y-3">
              <input
                placeholder="Level"
                value={planData.levels}
                onChange={(e) =>
                  setPlanData({ ...planData, levels: e.target.value })
                }
                className="w-full border p-2"
              />

              <input
                placeholder="Price"
                value={planData.prize}
                onChange={(e) =>
                  setPlanData({ ...planData, prize: e.target.value })
                }
                className="w-full border p-2"
              />

              <input
                placeholder="Duration"
                value={planData.PrizePerdays}
                onChange={(e) =>
                  setPlanData({
                    ...planData,
                    PrizePerdays: e.target.value,
                  })
                }
                className="w-full border p-2"
              />

              <textarea
                placeholder="Description"
                value={planData.Description}
                onChange={(e) =>
                  setPlanData({
                    ...planData,
                    Description: e.target.value,
                  })
                }
                className="w-full border p-2"
              />
              <div className="flex gap-2 justify-end items-center">
                <button
                  onClick={() => setPlanModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button className="bg-[#C45330] text-white px-4 py-2 rounded cursor-pointer">
                  {isEditPlan ? "Update Plan" : "Add Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
