import { nanoid } from "nanoid";
import React, { createRef, Fragment, useState } from "react";
import "./App.css";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";
import getFormData from "./getFormData";
import data from "./mock-data.json";

const App = () => {
  const addFormRef = createRef();
  const columns = [
    "fourteenkg",
    "nineteenkg",
    "fivekg",
    "BMCG",
    "thirtykg",
    "fourtysevenpointfivekg",
  ];
  const column_attr = ["full", "mt", "def", "tot"];
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState([
    {
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
    },
  ]);

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    let data = getFormData(addFormRef);
    // columns.forEach((i) =>
    //             column_attr.map((attr, idx) => <th key={idx}>{attr}</th>)

    const newRow = {
      id: nanoid(),
      ...data,
    };

    setContacts((prevContacts) => [...prevContacts, newRow]);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table style={{ fontSize: "12px" }}>
          <thead>
            <th>PRODUCT</th>
            {columns.map((i, idx) => (
              <th key={idx} colspan="4">
                {i}
              </th>
            ))}

            <tr>
              <th>LOC/VEHICLE</th>
              {columns.map((i) =>
                column_attr.map((attr, idx) => <th key={idx}>{attr}</th>)
              )}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    columns={columns}
                    columnAtrtibutes={column_attr}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    columns={columns}
                    columnAtrtibutes={column_attr}
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <div>
        <h2>Add new</h2>
        <form ref={addFormRef} onSubmit={handleAddFormSubmit}>
          <>
            <label htmlFor={`LOC`}>LOC</label>
            <input type="text" name={`LOC`} placeholder="LOC" />
          </>
          {columns.map((i) => {
            let body = [];
            body.push(
              <>
                <label>{i}</label>
              </>
            );
            body.push(
              <div>
                {column_attr.map((attr) => (
                  <>
                    <label htmlFor={`${i}.${attr}`}>{attr}</label>
                    <input
                      type="text"
                      name={`${i}.${attr}`}
                      size="2"
                      defaultValue={15}
                    />
                  </>
                ))}
              </div>
            );
            return body;
          })}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default App;
