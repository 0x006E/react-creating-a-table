import { cloneDeep } from "lodash";
import React, { createRef, Fragment, useEffect, useState } from "react";
import "./App.css";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";
import getFormData from "./getFormData";
import data from "./mock-data.json";

const columns = [
  "forteenkg",
  "ninteenkg",
  "fivekg",
  "bmcg",
  "thirtyfivekg",
  "fourtysevenkg",
];
const column_attr = ["full", "mt", "def", "tot"];

const empty_data = {
  loc: "",
  forteenkg: {
    full: 0,
    mt: 0,
    def: 0,
    tot: 0,
  },
  ninteenkg: {
    full: 0,
    mt: 0,
    def: 0,
    tot: 0,
  },
  fivekg: {
    full: 0,
    mt: 0,
    def: 0,
    tot: 0,
  },
  bmcg: {
    full: 0,
    mt: 0,
    def: 0,
    tot: 0,
  },
  thirtyfivekg: {
    full: 0,
    mt: 0,
    def: 0,
    tot: 0,
  },
  fourtysevenkg: {
    full: 0,
    mt: 0,
    def: 0,
    tot: 0,
  },
};

const App = () => {
  const addFormRef = createRef();

  const [contacts, setContacts] = useState(data);
  const [total, setTotal] = useState(
    (function () {
      const temp = cloneDeep(empty_data);
      temp.loc = "Total";
      return temp;
    })()
  );

  const [editFormData, setEditFormData] = useState(cloneDeep(empty_data));

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

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    let data = getFormData(addFormRef);
    // columns.forEach((i) =>
    //             column_attr.map((attr, idx) => <th key={idx}>{attr}</th>)

    const newRow = {
      id: contacts[contacts.length - 1].id + 1,
      ...data,
    };

    columns.forEach((column) => {
      let sum = 0;
      column_attr.forEach((attr) => {
        sum += isNaN(parseInt(newRow[column][attr]))
          ? 0
          : parseInt(newRow[column][attr]);
      });
      newRow[column]["tot"] = sum;
    });

    setContacts((prevContacts) => [...prevContacts, newRow]);
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
            <tr>
              <th>PRODUCT</th>
              {columns.map((i, idx) => (
                <th key={idx} colSpan="4">
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
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    key={contact.id}
                    columns={columns}
                    columnAttributes={column_attr}
                    editFormData={editFormData}
                    handleEditFormSubmit={handleEditFormSubmit}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    key={contact.id}
                    columns={columns}
                    columnAttributes={column_attr}
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
            <ReadOnlyRow
              columns={columns}
              columnAttributes={column_attr}
              contact={total}
              isHeader={true}
            />
          </tbody>
        </table>
      </form>
      <div>
        <h2>Add new</h2>
        <form ref={addFormRef} onSubmit={handleAddFormSubmit}>
          <>
            <label htmlFor={`loc`}>LOC</label>
            <input type="text" name={`loc`} placeholder="LOC" />
          </>
          {columns.map((i) => {
            let body = [];
            body.push(
              <>
                <label key={`${i}`}>{i}</label>
              </>
            );
            body.push(
              <div>
                {column_attr
                  .filter((i) => i !== "tot")
                  .map((attr) => (
                    <div key={`${i}.${attr}-add`}>
                      <label htmlFor={`${i}.${attr}`}>{attr}</label>
                      <input
                        type="text"
                        name={`${i}.${attr}`}
                        size="1"
                        defaultValue={0}
                      />
                    </div>
                  ))}
              </div>
            );
            return <div key={i + "1"}>{body}</div>;
          })}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default App;
