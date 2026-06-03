function UncontrolledForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      gender: formData.get('gender'),
      terms: formData.get('terms'),
    };

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" name="age" type="number" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="terms">
          <input id="terms" name="terms" type="checkbox" /> Accept terms and
          Conditions
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default UncontrolledForm;
