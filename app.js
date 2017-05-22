document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("registrar");
  const input = form.querySelector("input");
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById("invitedList");

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckbox = document.createElement('input');

  filterLabel.innerHTML = "Hide those who haven't responded";
  filterCheckbox.type = "Checkbox";
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);
  filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked){
       for (let i = 0; i < lis.length; i++){
         let li = lis[i];
         if(li.className === "responded"){
            li.style.display = '';
          }else {
            li.style.display = 'none';
          }
       }
    } else {
      for (let i = 0; i < lis.length; i++){
         let li = lis[i];
         li.style.display = '';
       }
    }
  });

// This code is to create LI elements
  const createLI = (text) => {
    const createElement = (elementName, property, value) => {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    const appendTOLI = (elementName, property, value) => {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return li;
    }
    const li = document.createElement('li');
    appendTOLI('span', 'innerHTML', text); 
    const label = createElement('label', 'innerHTML', 'Confirmed');  
    const checkbox = createElement('input', 'type', 'checkbox');
    label.appendChild(checkbox);
    li.appendChild(label);
    appendTOLI('button', 'innerHTML', 'Edit');
    appendTOLI('button', 'innerHTML', 'Remove');
    return li;
  }

  // Event handler for submit button
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value === ""){
      alert("Please type a name of a person!!!");
      ul.removeChild(li);
    }
    const text = input.value;
    input.value = " ";
    const li = createLI(text);
    ul.appendChild(li);
    
  });

  //Event handler for checkbox 
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const li = checkbox.parentNode.parentNode;
    if(checked){
       li.className = "responded";
     } else {
       li.className = " ";
     }
  })

  // Event handler for remove, edit and save button. And code for edit state to save state and vice versa
  ul.addEventListener('click', (e) => {
    if(e.target.tagName == "BUTTON"){
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
      },
        edit: () => {
          const span = li.firstChild;
          const input = document.createElement('input');
          input.value = span.innerHTML; 
          li.insertBefore(input, span);
          input.type = 'text';
          li.removeChild(span);
          button.innerHTML = "Save";
      },
        save: () => {
          button.innerHTML = "Edit";
          const input = li.firstChild;
          const span = document.createElement('span');
          span.innerHTML = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
        } 
      };
      
      if (button.innerHTML == "Remove"){
          nameActions.remove();
      } else if (button.innerHTML == "Edit"){
          nameActions.edit();
      } else if (button.innerHTML == "Save"){
          nameActions.save();
      }
    }
  });
});
