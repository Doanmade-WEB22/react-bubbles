import React, { useState } from "react";
import { axize } from "../utils/axize";
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("Colors", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axize()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(rez => {
        console.log("Edit Color", rez);
        updateColors(
          colors.map(color => {
            if (color.id === rez.data.id) {
              return rez.data;
            } else {
              return color;
            }
          })
        );
      })
      .catch(errs => console.log(errs.response));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axize()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(rez => {
        console.log("Delete Color", rez);
        updateColors(color.filter(color => color.id !== rez.data));
      })
      .catch(errs => console.log(errs.response));
  };

  const addColor = () => {
    axize()
      .post(`http://localhost:5000/api/colors`, colorToAdd)
      .then(rez => {
        console.log("Add Color", rez);
        updateColors(rez.data);
        setColorToAdd(initialColor);
      })
      .catch(errs => console.log(errs.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button onClick={saveEdit}>save</button>
            {/* <button onClick={addColor}>Add</button> */}
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form>
        <h2>Add Color</h2>

        <label>
          color name:
          <input
            type="text"
            name="color"
            onChange={event =>
              setColorToAdd({ ...colorToAdd, color: event.target.value })
            }
            placeholder="color name"
            value={colorToAdd.color}
          />
        </label>

        <label>
          hex code:
          <input
            type="text"
            name="hex"
            onChange={event =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: event.target.value }
              })
            }
            placeholder="hex code"
            value={colorToAdd.code.hex}
          />
        </label>

        <div className="button-row">
          <button type="button" onClick={() => addColor()}>
            submit
          </button>
        </div>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
