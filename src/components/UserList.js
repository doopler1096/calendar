import React, { useEffect, useState } from 'react';
import { Input, ListGroup } from 'reactstrap';
import './Style.css';

import { getUsers } from '../api';

const renderUserList = (userList) => {
  return userList.map((user) => (
    <div className='userlist'>
      <p>{user.nombre} </p>
      <p>{user.perfil}</p>
      <p>Días planificados {user.dias_plani}</p>
      <p>Cant Tiendas Planificados {user.tiendas_plani}</p>
    </div>
  ));
};

const UserList = () => {
  const [originalUserList, setOriginalUserList] = useState([]);
  const [userList, setUserList] = useState([]);

  const searchUser = ({ target }) => {
    const text = target.value.toLowerCase();

    if (text.length === 0) setUserList(originalUserList);

    setUserList((prevUserList) =>
      prevUserList.filter(
        (user) =>
          user.nombre.toLowerCase().includes(text) ||
          user.perfil.toLowerCase().includes(text)
      )
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();

      setUserList(response.data);
      setOriginalUserList(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <ListGroup>
      <Input type='text' onChange={searchUser} />
      {renderUserList(userList)}
    </ListGroup>
  );
};

export default UserList;
