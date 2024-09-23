const Input = ({ field, form, ...props }) => {
  return (
    <div className="mb-6">
      <input
        {...field} // This includes value and onChange from Formik
        {...props} // This includes other props like type, placeholder, etc.
        className="shadow appearance-none border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      
      {form.errors[field.name] && form.touched[field.name] ? (
        <div className="text-red-500 text-xs mt-1">{form.errors[field.name]}</div>
      ) : null}
    </div>
  );
};

export default Input;
