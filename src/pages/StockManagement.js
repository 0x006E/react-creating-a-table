import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import EditableRow from "../components/EditableRow";
import ReadOnlyRow from "../components/ReadOnlyRow";
import empty_data from "../empty_data.json";

const columns_map = {
  forteenkg: "14KG",
  ninteenkg: "19KG",
  fivekg: "5KG",
  bmcg: "BMCG",
  thirtyfivekg: "35KG",
  fourtysevenkg: "47.5KG",
};
const columns = Object.keys(columns_map);
const columns_hr = Object.values(columns_map);
const column_attr = ["full", "mt", "def"];

function StockManagement() {
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [total, setTotal] = useState(
    (function () {
      const temp = cloneDeep(empty_data);
      temp.loc = "Total";
      return temp;
    })()
  );

  const handleIn = (e) => {
    const newRow = cloneDeep(empty_data);
    newRow.id = contacts.length;
    newRow.type = "in";
    setEditFormData(newRow);
    setContacts((state) => [...state, newRow]);
    setEditContactId(newRow.id);
  };
  const handleOut = (e) => {
    const newRow = cloneDeep(empty_data);
    newRow.id = contacts.length;
    newRow.type = "out";
    setEditFormData(newRow);
    setContacts((state) => [...state, newRow]);
    setEditContactId(newRow.id);
  };

  const handleEditFormSubmit = (event, formData) => {
    event.preventDefault();
    const editedContact = cloneDeep(formData);
    editedContact["id"] = editContactId;
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
      ...contact,
    };
    delete formValues.id;
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setContacts((state) =>
      state.filter((contact) => contact.id !== editContactId)
    );
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  useEffect(() => {
    let temp = cloneDeep(empty_data);
    temp.loc = "Total";

    setTotal((_) => {
      contacts.forEach((contact) => {
        columns.forEach((column) => {
          column_attr.forEach((attr) => {
            temp[column][attr] += parseInt(contact[column][attr]);
          });
        });
      });
      return temp;
    });
    return () => {
      temp = {};
    };
  }, [contacts]);

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th>PRODUCT</th>
              {columns_hr.map((i, idx) => (
                <th key={idx} colSpan="3">
                  {i}
                </th>
              ))}
            </tr>
            <tr>
              <th>LOC/VEHICLE</th>
              {columns.map((i) =>
                column_attr.map((attr, idx) => <th key={idx}>{attr}</th>)
              )}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <>
                {editContactId === contact.id ? (
                  <EditableRow
                    key={contact.id}
                    columns={columns}
                    columnAttributes={column_attr}
                    editFormData={editFormData}
                    handleEditFormSubmit={handleEditFormSubmit}
                    handleCancelClick={handleCancelClick}
                    multiplier={contact.type === "in" ? 1 : -1}
                    data-type={contact.type}
                  />
                ) : (
                  <ReadOnlyRow
                    key={contact.id}
                    columns={columns}
                    columnAttributes={column_attr}
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    data-type={contact.type}
                  />
                )}
              </>
            ))}
            <tr className="tr-special">
              <td>
                <button type="button" onClick={handleIn}>
                  In
                </button>
                <button type="button" onClick={handleOut}>
                  Out
                </button>
              </td>
            </tr>
            <ReadOnlyRow
              columns={columns}
              columnAttributes={column_attr}
              contact={total}
              isHeader={true}
            />
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default StockManagement;
