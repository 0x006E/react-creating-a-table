import React from "react";

const EditableRow = ({
  columns,
  columnAttributes,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required
          placeholder="Enter loc"
          name="loc"
          value={editFormData.loc}
          onChange={handleEditFormChange}
        />
      </td>
      {columns.map((i) =>
        columnAttributes.map((attr) => (
          <td key={`${i}.${attr}-edit`}>
            <input
              type="text"
              name={`${i}.${attr}`}
              onChange={handleEditFormChange}
              value={editFormData[i][attr]}
              size="1"
              disabled={attr === "tot"}
            />
          </td>
        ))
      )}
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
