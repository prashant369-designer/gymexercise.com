import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";


const Service = () => {
  const [open, setOpen] = useState(false);
  const [planModal, setPlanModal] = useState(false);
  const base_url = import.meta.env.VITE_API_URL;


  const [service, setService] = useState(null);
  const [plans, setPlans] = useState([]);

  const [isEditPlan, setIsEditPlan] = useState(false);
  const [editPlanId, setEditPlanId] = useState(null);

  const [sectionData, setSectionData] = useState({
    heading: "",
    subheading: "",
  });

  const [planData, setPlanData] = useState({
    title: "",
    icon: "",
    description: "",
  });

  // ================= FETCH =================
  const fetchService = async () => {
    try {
      const res = await axios.get(`${base_url}/service/`);
      setService(res.data);
      setPlans(res.data.plans || []);

      setSectionData({
        heading: res.data.heading || "",
        subheading: res.data.subheading || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  // ================= SECTION =================
  const handleSectionSubmit = async (e) => {
    e.preventDefault();

    try {
      if (service?.heading) {
        await axios.put(
          `${base_url}/service/update-service/1`,
          sectionData
        );
        toast("Updated Successfully");
      } else {
        await axios.post(`${base_url}/service/create`, {
          ...sectionData,
          plans: [],
        });
        toast("Created Successfully");
      }

      setOpen(false);
      fetchService();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= PLAN =================
  const handlePlanSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditPlan) {
        await axios.put(
          `${base_url}/service/update-plan/${editPlanId}`,
          planData
        );
        toast("Plan Updated");
      } else {
        await axios.post(
          `${base_url}/service/add-plan`,
          planData
        );
        toast("Plan Added");
      }

      setPlanModal(false);
      setIsEditPlan(false);
      setPlanData({
        title: "",
        icon: "",
        description: "",
      });

      fetchService();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlan = async (id) => {
    await axios.delete(
      `${base_url}/service/delete-plan/${id}`
    );
    fetchService();
  };

  const handleEditPlan = (plan) => {
    setPlanModal(true);
    setIsEditPlan(true);
    setEditPlanId(plan.id);

    setPlanData({
      title: plan.title,
      icon: plan.icon,
      description: plan.description,
    });
  };

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Service Section</h1>
          <p className="text-gray-500 text-sm">Manage your services</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg"
        >
          Edit Section
        </button>
      </div>

      {/* SECTION TABLE */}
      {service && (
        <table className="w-full bg-white shadow rounded mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Heading</th>
              <th className="p-3 text-left">Subheading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">{service.heading}</td>
              <td className="p-3">{service.subheading}</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ADD PLAN */}
      <div className="flex justify-between my-6">
        <div>
          <h2 className="text-xl font-semibold">Service Plans</h2>
        </div>

        <button
          onClick={() => {
            setPlanModal(true);
            setIsEditPlan(false);
          }}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg"
        >
          Add Plan
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Icon</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className="border-t">
              <td className="p-3">{plan.title}</td>
              <td className="p-3">{plan.icon}</td>
              <td className="p-3">{plan.description}</td>

              <td className="flex gap-3 p-3">
                <FiEdit
                  onClick={() => handleEditPlan(plan)}
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
          <div className="bg-white p-6 rounded-2xl w-100 relative">

            <IoMdClose
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 cursor-pointer"
            />

            <h2 className="text-xl mb-4">Edit Service Section</h2>

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

              <button className="bg-[#C45330] text-white px-4 py-2 rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PLAN MODAL */}
      {planModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-100 relative">

            <IoMdClose
              onClick={() => setPlanModal(false)}
              className="absolute right-3 top-3 cursor-pointer"
            />

            <h2 className="text-xl mb-4">
              {isEditPlan ? "Edit Plan" : "Add Plan"}
            </h2>

            <form onSubmit={handlePlanSubmit} className="space-y-3">

              <input
                placeholder="Title"
                value={planData.title}
                onChange={(e) =>
                  setPlanData({ ...planData, title: e.target.value })
                }
                className="w-full border p-2"
              />

              <input
                placeholder="Icon (dumbbell, muscle...)"
                value={planData.icon}
                onChange={(e) =>
                  setPlanData({ ...planData, icon: e.target.value })
                }
                className="w-full border p-2"
              />

              <textarea
                placeholder="Description"
                value={planData.description}
                onChange={(e) =>
                  setPlanData({
                    ...planData,
                    description: e.target.value,
                  })
                }
                className="w-full border p-2"
              />

              <button className="bg-[#C45330] text-white px-4 py-2 rounded">
                {isEditPlan ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Service;