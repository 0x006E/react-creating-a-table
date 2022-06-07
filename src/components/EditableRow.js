import { cloneDeep } from "lodash";
import React from "react";

const EditableRow = ({
  columns,
  columnAttributes,
  editFormData,
  handleEditFormSubmit,
  handleCancelClick,
}) => {
  const [formData, setFormData] = React.useState(editFormData);
  const handleFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = cloneDeep(formData);

    if (fieldName === "loc") {
      newFormData.loc = fieldValue;
      setFormData(newFormData);
      return;
    }

    let fieldNames = fieldName.split(".");

    newFormData[fieldNames[0]][fieldNames[1]] = isNaN(parseInt(fieldValue))
      ? 0
      : parseInt(fieldValue);
    if (fieldNames[1] !== "tot") {
      let sum = 0;
      columnAttributes
        .filter((i) => i !== "tot")
        .forEach((attr) => {
          sum += isNaN(parseInt(newFormData[fieldNames[0]][attr]))
            ? 0
            : parseInt(newFormData[fieldNames[0]][attr]);
        });
      newFormData[fieldNames[0]]["tot"] = sum;
    }

    setFormData(newFormData);
  };
  return (
    <tr>
      <td>
        <input
          type="text"
          required
          placeholder="Enter loc"
          name="loc"
          value={formData.loc}
          onChange={handleFormChange}
        />
      </td>
      {columns.map((i) =>
        columnAttributes.map((attr) => (
          <td key={`${i}.${attr}-edit`}>
            <input
              type="text"
              name={`${i}.${attr}`}
              onChange={handleFormChange}
              value={formData[i][attr]}
              size="1"
              disabled={attr === "tot"}
            />
          </td>
        ))
      )}
      <td>
        <button
          type="submit"
          onClick={(e) => handleEditFormSubmit(e, cloneDeep(formData))}
        >
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
