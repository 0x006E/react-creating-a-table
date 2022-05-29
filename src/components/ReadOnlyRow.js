import React from "react";

const ReadOnlyRow = ({
  columns,
  columnAttributes,
  contact,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <tr>
      <td>{contact["loc"]}</td>
      {columns.map((i) =>
        columnAttributes.map((attr) => (
          <td key={`${i}.${attr}-read`}>{contact[i] && contact[i][attr]}</td>
        ))
      )}
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
