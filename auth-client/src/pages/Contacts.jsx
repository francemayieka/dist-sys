import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:8000/api";

const Contacts = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contact, setContact] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState(""); // New state for name
  const [isUpdating, setIsUpdating] = useState(false); // New state to handle update form visibility

  const toggleForm = () => setFormVisible(!formVisible);

  // Add a new contact
  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/contacts/add/`, {
        name,
        registration_number: registrationNumber,
        phone_number: phoneNumber,
        email,
        address,
      });
      toast.success("Contact added successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to add contact.");
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setFormVisible(false);
    setRegistrationNumber("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setName("");
    setIsUpdating(false); // Reset update state
  };

  // Search for a contact by registration number
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts/search/${searchTerm}/`);
      setContact(response.data); // Store the found contact details
      setName(response.data.name); // Populate name for updating
      setRegistrationNumber(response.data.registration_number);
      setPhoneNumber(response.data.phone_number);
      setEmail(response.data.email);
      setAddress(response.data.address);
    } catch (error) {
      toast.error("Contact not found.");
      setContact(null);
    }
  };

  // Delete a contact by registration number
  const handleDelete = async (registrationNumber) => {
    try {
      await axios.delete(`${API_BASE_URL}/contacts/delete/${encodeURIComponent(registrationNumber)}/`);
      toast.success("Contact deleted successfully!");
      setContact(null); // Clear the contact view
      resetForm(); // Reset the form after deletion
    } catch (error) {
      toast.error("Failed to delete contact.");
    }
  };

  // Update a contact
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_BASE_URL}/contacts/update/${registrationNumber}/`, {
        name,
        phone_number: phoneNumber,
        email,
        address,
      });
      toast.success("Contact updated successfully!");

      // Update the contact state with the new details
      setContact({
        name,
        registration_number: registrationNumber,
        phone_number: phoneNumber,
        email,
        address,
      });

      resetForm(); // Reset the form after update
    } catch (error) {
      toast.error("Failed to update contact.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>

      {/* Search Input */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Enter registration number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full border px-4 py-2 mr-2 flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          🔍
        </button>
      </div>

      {/* Render searched contact details if found */}
      {contact && (
        <div className="bg-white shadow-md p-4 rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Contact Details</h2>
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Registration Number:</strong> {contact.registration_number}</p>
          <p><strong>Phone Number:</strong> {contact.phone_number}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Address:</strong> {contact.address}</p>
          <button
            onClick={() => handleDelete(contact.registration_number)}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
          >
            Delete Contact
          </button>
          <button
            onClick={() => setIsUpdating(true)}
            className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-yellow-600 ml-2"
          >
            Update Contact
          </button>
        </div>
      )}

      {/* Add Contact Button */}
      <button
        onClick={toggleForm}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        + Add Contact
      </button>

      {/* Add Contact Form */}
      {(formVisible || isUpdating) && (
        <form onSubmit={isUpdating ? handleUpdateContact : handleAddContact} className="bg-white shadow-md p-4 rounded max-w-md mx-auto">
          <div className="mb-4">
            <label className="block font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Registration Number</label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
              disabled={isUpdating} // Disable this field during update
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isUpdating ? "Update" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Contacts;
