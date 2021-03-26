import React, { useEffect, useState } from 'react';
import { getUsers } from '../api';
import '../style/Style.css';

let classname = userMenu;

const renderUserList = (userList) => {
  return userList.map((user) => (
    <div>
      <p>{user.nombre}</p>
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
    <div>
      <input type='text' onChange={searchUser} />
      {renderUserList(userList)}
    </div>
  );
};

export default UserList;
