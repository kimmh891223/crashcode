// Imports required
import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { ADD_CODE, ADD_CODE_TO_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

// Function to create a post
function CreatePost() {
  const [formState, setFormState] = useState({ 
    title: '', 
    content: '', 
    programmingLanguage: '',
    username: Auth.getUser().data.username
  });

  // Mutation to add code
  const [addCode, { error }] = useMutation(ADD_CODE);
  const [addCodeToUser] = useMutation(ADD_CODE_TO_USER);

  // Function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addCode({
        variables: { ...formState },
      });
      console.log(data);

      const { data: data2 } = await addCodeToUser({
        variables: { _id: Auth.getUser().data._id, _ObjectId: data.addCodes._id},
      });
      console.log(data2);
      
      window.location.assign('/');
    } catch (err) {
      console.error(err);
    }
  }; 
  
  // Function to handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  }  
    // Render the create post form
    return (
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Post Your Code!</h4>
            <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <label>Programming Language:</label>
                  <select className="form-input" 
                          name="programmingLanguage" 
                          id="pro-lang" 
                          value={formState.programmingLanguage}
                          onChange={handleChange}>
                    <option value="null">Choose a Language</option>
                    <option value="Javascript">Javascript</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="C#">C#</option>
                    <option value="PHP">PHP</option>
                    <option value="Go">Go</option>
                    <option value="Other">Other</option>
                  </select>
                  <label>Title: </label>
                  <input
                    className="form-input"
                    placeholder="title"
                    name="title"
                    type="text"
                    rows = "1"
                    value = {formState.title}
                    onChange={handleChange}
                  />
                  <label>Cotent: </label>
                  <textarea
                    className="form-input"
                    placeholder="content"
                    name="content"
                    type="text"
                    rows = "5"
                    value = {formState.content}
                    onChange={handleChange}
                  />
                  <button
                    className=""
                    type="submit"
                  >
                    Submit
                  </button>
                  {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    Something went wrong...
                  </div>
                )}
                </form>
            </div>
          </div>
        </div>
      </main>
    );
  };
  
  export default CreatePost;