import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddTaskAsync, setTasks } from '../redux/slices/fetchData';
import '../Styles/AddTask.css';




const AddOrUpdateTask = ({ taskToEdit = null }) => {
  const dispatch = useDispatch();
  const subjectRef = useRef(null);
  const completeDateRef = useRef(null);
  const isFavoriteRef = useRef(null);
  const isFinishedRef = useRef(null);
  const isImportantRef = useRef(null);




  useEffect(() => {
    if (taskToEdit) {
      subjectRef.current.value = taskToEdit.Subject;
      completeDateRef.current.value = taskToEdit.CompleteDate;
      isFavoriteRef.current.checked = taskToEdit.isFavorite;
      isFinishedRef.current.checked = taskToEdit.isFinished;
      isImportantRef.current.checked = taskToEdit.isImportant;
    }

  }, [taskToEdit]);






  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      Subject: subjectRef.current.value,
      CompleteDate: completeDateRef.current.value,
      isFavorite: isFavoriteRef.current.checked,
      isFinished: isFinishedRef.current.checked,
      isImportant: isImportantRef.current.checked,
    };

    console.log(newTask)

   
      dispatch(AddTaskAsync(newTask))
        
  

    subjectRef.current.value = '';
    completeDateRef.current.value = '';
    isFavoriteRef.current.checked = false;
    isFinishedRef.current.checked = false;
    isImportantRef.current.checked = false;
  };





  return (
    <div className='AddDiv'>

      
<form className='FORM_ADD' onSubmit={handleSubmit}>
  <div className="subject-container">
<h2>Add New Task</h2><br />

    <label htmlFor="subject">Subject:</label>
    <textarea
      className="Subject"
      name="Subject"
      ref={subjectRef}
      required
    /><br /><br />
  </div>
  
  <div className='checkBoxex' >
    <label htmlFor="completeDate">Complete Date:</label><br />
    <input
      name="CompleteDate"
      type="date"
      ref={completeDateRef}
      required
    /><br /><br />

    <label htmlFor="favorite">Favorite:</label>
    <input
      name="isFavorite"
      type="checkbox"
      ref={isFavoriteRef}
    /><br />

    <label htmlFor="completed">Done:</label>
    <input
      name="isFinished"
      type="checkbox"
      ref={isFinishedRef}
    /><br />

    <label htmlFor="important">Important:</label>
    <input
      name="isImportant"
      type="checkbox"
      ref={isImportantRef}
    /><br /><br />
  <button className='AddB' type="submit">Add</button>
  </div>

</form>

    </div>
  );
};

export default AddOrUpdateTask;
