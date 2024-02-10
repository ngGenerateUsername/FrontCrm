import React, { useState } from 'react';

interface Person {
  name: string;
  age: number;
}

const ModifyData: React.FC = () => {
  const [person, setPerson] = useState<Person>({ name: 'John Doe', age: 25 });

  const modifyName = () => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      name: 'Jane Doe',
    }));
  };

  const modifyAge = () => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      age: prevPerson.age + 1,
    }));
  };

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Age: {person.age}</p>
      <button onClick={modifyName}>Modify Name</button>
      <button onClick={modifyAge}>Modify Age</button>
    </div>
  );
};

export default ModifyData;
