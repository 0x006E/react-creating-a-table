import React from "react";

const ReadOnlyRow = ({ columns,columnAttributes, contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      {columns.map(i=>columnAttriubutes.map(attr=><td>{contact[i][attr]}</td>))}
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
