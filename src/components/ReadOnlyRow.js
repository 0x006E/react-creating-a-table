import React from "react";

const ReadOnlyRow = ({
  columns,
  columnAttributes,
  contact,
  handleEditClick = null,
  handleDeleteClick = null,
  isHeader = false,
  ...rest
}) => {
  return (
    <tr {...rest}>
      {!isHeader ? (
        <td>{contact["loc"]}</td>
      ) : (
        <th>
          <b>{contact["loc"]}</b>
        </th>
      )}
      {columns.map((i) =>
        columnAttributes.map((attr) =>
          !isHeader ? (
            <td key={`${i}.${attr}-read`}>
              {contact[i] &&
                (contact.type === "in" ? 1 : -1) * contact[i][attr]}
            </td>
          ) : (
            <th key={`${i}.${attr}-read`}>
              <b>{contact[i] && contact[i][attr]}</b>
            </th>
          )
        )
      )}
      {handleEditClick && handleDeleteClick && (
        <td>
          <>
            <button
              type="button"
              onClick={(event) => handleEditClick(event, contact)}
            >
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteClick(contact.id)}>
              Delete
            </button>
          </>
        </td>
      )}
    </tr>
  );
};

export default ReadOnlyRow;
