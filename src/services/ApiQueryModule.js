import axios from 'axios';

const apiUrl = "http://localhost:5000/api/";
let token = sessionStorage.getItem("token");
token = JSON.parse(token);


export async function getUserRegistration(data, setError) {
  try {
    const response = await axios.post(
      `${apiUrl}registration`,
      {
        username: data.get("username"),
        password: data.get("password"),
        userRole: data.get("userRole")
      }
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setErrorMessage("Пользователь с таким именем уже существует");
    } else if (error.response && error.response.status === 402) {
      setErrorMessage("Пароль не отвечает требованиям");
    } else {
      setErrorMessage("Ошибка регистрации");
    }
  }
};


export async function getUserLogin(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  try {
  const response = await axios.post(
    `${apiUrl}login`,
    {
      username: data.get("username"),
      password: data.get("password")
    }
    );
    const { token, role, id } = response.data;
    sessionStorage.setItem('token', JSON.stringify(response.data.token));
    
    return { token, role, id };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      setErrorMessage("Пользователь ${username} не найден");
    } else if (error.response && error.response.status === 401) {
      setErrorMessage("Введен неверный пароль");
    } else {
      setErrorMessage("ошибка входа");
    }
  }  
};

export async function getResources(setCurrentPage, rowsPerPage) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  try {
  const response = await axios.get(
    `${apiUrl}resources?page=${setCurrentPage}&rowsPerPage=${rowsPerPage}`,
    { headers: { Authorization: `Bearer ${token}` } }
    );
  return response.data;  
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  } 
};

export async function addParamToResource(id, statementData) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  statementData.preventDefault();
  const data = new FormData(statementData.currentTarget);

  try {
  const response = await axios.patch(
    `${apiUrl}addParamToResource/${id}`,
    { 
      statement: data.get("statement"), 
    },
    { headers: { Authorization: `Bearer ${token}` } }
    );
  return response.data;  
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  } 
};

export async function getUsers(setCurrentPage, rowsPerPage) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  try {
    const response = await axios.get(
      `${apiUrl}users?page=${setCurrentPage}&rowsPerPage=${rowsPerPage}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;  
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  } 
};

export async function getDeleteUser(id) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);  
  
  try {
    const response = await axios.delete(
      `${apiUrl}users/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      alert('Пользователь не найден');
    } else {
      alert('Ошибка при удалении пользователя. Попробуйте позже.');
    }
    return [];
  }
};

export async function putEditUserId(data, id) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token); 
  
  try {
    const response = await axios.patch(
      `${apiUrl}users/${id}`,
      { 
        username: data.get("username"), 
        password: data.get("password"),
        userRole: data.get("userRole"),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  }
};

export async function getProfile(id) {
  try {
    const response = await axios.get(
      `${apiUrl}currentUser/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
    
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  }
};

// export async function createResource(title, description, file) {
//   try {
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('file', file);

//     const response = await axios.post(
//       `${apiUrl}create`, 
//       formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Server Error');
//   }
// }

export async function createResource(formData) {
    try {
        
      const response = await axios.post(
        `${apiUrl}create`, 
        formData).then((res)=> {
          console.log(res)
        })
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Server Error');
    }
  }


export async function getDeleteResources(id) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);  
  
  try {
    const response = await axios.delete(
      `${apiUrl}resources/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      alert('Ресурс не найден');
    } else {
      alert('Ошибка при удалении ресурса. Попробуйте позже.');
    }
    return [];
  }
};

export async function putEditResourceId(resourceData, id) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token); 
  // event.preventDefault();
  // const data = new FormData(document.getElementById('form'));

  try {
    const response = await axios.patch(
      `${apiUrl}resources/${id}`,
      {
        title: resourceData.get("title"), 
        description: resourceData.get("description"),
        body: resourceData.get("body")
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  }
};

export async function getSearchResources(searchQuery) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  
  try {
  const response = await axios.get(
    `${apiUrl}resources/search/${encodeURIComponent(searchQuery)}`,
    
    { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
  return response.data;  
  
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  } 
};

export async function getSearchUser(searchQuery) {
  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  
  try {
  const response = await axios.get(
    `${apiUrl}users/search/${encodeURIComponent(searchQuery)}`,
    
    { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
  return response.data;  
  
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных. Попробуйте позже.');
    return [];
  } 
};




